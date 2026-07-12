// SILNIK WIEDZY — darmowe, offline wyszukiwanie odpowiedzi z bazy wiedzy.
// Buduje indeks BM25 nad wszystkimi fragmentami (dokumenty + reguły + autorytety
// + półprodukty + wiedza własna użytkownika) i zwraca najtrafniejsze z cytowaniem.
// Zero tokenów, zero sieci. Przebudowuje się przy zmianie modułu i po dopisaniu wiedzy.
window.Wiedza = {
  _indeks: null,
  _sygnatura: null,

  // ── normalizacja polskiego tekstu ──────────────────────────────────────
  _bezOgonkow(s) {
    return s.replace(/[ąàáâ]/g, "a").replace(/ć/g, "c").replace(/[ęèéê]/g, "e")
      .replace(/ł/g, "l").replace(/ń/g, "n").replace(/[óòô]/g, "o").replace(/ś/g, "s")
      .replace(/[żź]/g, "z");
  },
  STOP: new Set("i oraz albo lub a w we z ze na do od po za o u nad pod przy dla czy to jest są być co jak kiedy gdzie ile tym tego ten ta te ktory która które przed bez ma mają nie tak też oraz gdy jego jej ich się nasz naszej".split(" ")),
  SYNONIMY: {
    // rozszerzenie zapytania o formy pokrewne (klucz → dodatkowe rdzenie)
    mrozic: ["mroz", "zamroz", "mrozni"], zamrozic: ["mroz"], mrozenie: ["mroz", "zamroz"],
    chlodzic: ["chlodz", "lodowk", "retard"], schlodzic: ["chlodz"], chlodzenie: ["chlodz"],
    piec: ["wypiek", "bongard", "ibis", "poklad"], wypiek: ["piec"], temperatura: ["temp", "stopni"],
    delegowac: ["deleg", "pomoc", "osad", "julia", "natalia", "zuza"], delegacja: ["deleg", "pomoc"],
    zaczyn: ["levain", "zakwas", "poolish", "biga", "preferment"], levain: ["zakwas", "zaczyn"],
    ferment: ["pointage", "rozrost", "gar", "dojrzal"], retard: ["retardacj", "chlodz", "odroczon"],
    nawazka: ["nawaz", "odwaz", "gramy"], skalowac: ["skalow", "partia", "wsad", "baker"],
    sernik: ["serow"], krem: ["patissiere", "creme"], sezon: ["miesiac", "swiat"]
  },

  _tokeny(s) {
    const czyste = this._bezOgonkow(String(s).toLowerCase());
    const surowe = czyste.split(/[^a-z0-9]+/).filter(w => w.length > 2 && !this.STOP.has(w));
    // lekki stemming: obcinamy typowe polskie końcówki
    return surowe.map(w => w.replace(/(ami|ach|owi|iem|em|ie|ie|ow|om|ac|yc|ic|a|e|y|i|u|o)$/,
      m => w.length - m.length >= 4 ? "" : m));
  },

  _rozszerzZapytanie(tokeny) {
    const wyn = new Set(tokeny);
    for (const t of tokeny) {
      for (const [klucz, formy] of Object.entries(this.SYNONIMY)) {
        const kt = this._tokeny(klucz)[0];
        if (t === kt || klucz.startsWith(t) || t.startsWith(kt)) formy.forEach(f => wyn.add(f));
      }
    }
    return [...wyn];
  },

  // ── zebranie wszystkich fragmentów aktywnego modułu ────────────────────
  _fragmenty() {
    const frag = [];
    const push = (id, tytul, tekst, zrodlo, kat) =>
      frag.push({ id, tytul, tekst, zrodlo, kat: kat || "" });

    (window.AB_KORPUS || []).forEach(c => push(c.id, c.tytul, c.tekst, c.zrodlo, (c.tagi || []).join(" ")));

    const W = window.AB_WIEDZA || {};
    (W.reguly || []).forEach(r => push(r.id, "Reguła: " + r.warunek, r.rada, r.zrodlo, r.kategoria));
    (W.autorytety || []).forEach(a => push(a.id, a.nazwa + " — " + a.rola,
      a.slynie_z + ". " + a.praktyka + " Zastosowanie u nas: " + a.zastosowanie, "Baza autorytetów", a.kategoria));
    (W.sezon || []).forEach(s => push("sez-" + s.miesiac, "Sezon: " + s.nazwa,
      "Surowce: " + (s.surowce || []).join(", ") + ". Okazje: " + (s.okazje || []).join(", ") +
      ". Produkcja: " + (s.produkty || []).join(", ") + ". " + (s.planowanie || ""), "Kalendarz sezonowy", "sezon"));
    (W.trendy || []).forEach(t => push(t.id, "Trend: " + t.nazwa,
      t.opis + " Wykorzystanie: " + t.dopasowanie_alterbake, "Radar trendów", "trend"));

    ((window.AB_ZASOBY || {}).polprodukty || []).forEach(p => push("pp-" + p.id,
      "Półprodukt: " + p.nazwa, p.rada + " Chłodzenie: " + p.chlodzenie + ". Mrożenie: " + p.mrozenie,
      "Tabela półproduktów", "mrozenie chlodzenie"));

    // WIEDZA WŁASNA + fakty nauczone z pracowni — pełnoprawne źródło
    const nauka = (Store && Store.stan && Store.stan.nauka) || { fakty: [], notatki: [] };
    (nauka.notatki || []).forEach(n => push(n.id, "Twoja notatka: " + (n.tytul || ""),
      n.tekst, "Wiedza własna", (n.tagi || "")));
    (nauka.fakty || []).forEach(f => push(f.id, f.tytul, f.tekst, "Nauczone z pracowni", f.kat || ""));

    return frag;
  },

  _sygnaturaDanych() {
    const nauka = (Store && Store.stan && Store.stan.nauka) || { fakty: [], notatki: [] };
    return (Store ? Store.modul() : "?") + ":" +
      ((window.AB_KORPUS || []).length) + ":" +
      (((window.AB_WIEDZA || {}).reguly || []).length) + ":" +
      (nauka.notatki.length) + ":" + (nauka.fakty.length);
  },

  _zbuduj() {
    const frag = this._fragmenty();
    const df = {}, dlugosci = [];
    const dokTokeny = frag.map(f => {
      const tk = this._tokeny(f.tytul + " " + f.tekst + " " + f.kat);
      dlugosci.push(tk.length || 1);
      const zbior = new Set(tk);
      zbior.forEach(t => df[t] = (df[t] || 0) + 1);
      const tf = {};
      tk.forEach(t => tf[t] = (tf[t] || 0) + 1);
      return tf;
    });
    const N = frag.length; // 0 gdy pusto — szukaj() to zabezpiecza i zwraca []
    const avg = N ? dlugosci.reduce((a, b) => a + b, 0) / N : 1;
    this._indeks = { frag, dokTokeny, df, dlugosci, N, avg };
    this._sygnatura = this._sygnaturaDanych();
  },

  _zapewnijIndeks() {
    if (!this._indeks || this._sygnatura !== this._sygnaturaDanych()) this._zbuduj();
  },

  przebuduj() { this._indeks = null; },

  // ── wyszukiwanie: BM25 ─────────────────────────────────────────────────
  szukaj(zapytanie, limit) {
    this._zapewnijIndeks();
    const ix = this._indeks;
    if (!ix.N) return [];
    const k1 = 1.5, b = 0.75;
    const qt = this._rozszerzZapytanie(this._tokeny(zapytanie));
    if (!qt.length) return [];
    const wyniki = [];
    for (let i = 0; i < ix.N; i++) {
      const tf = ix.dokTokeny[i];
      let score = 0;
      for (const t of qt) {
        const f = tf[t]; if (!f) continue;
        const idf = Math.log(1 + (ix.N - ix.df[t] + 0.5) / (ix.df[t] + 0.5));
        score += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * ix.dlugosci[i] / ix.avg));
      }
      if (score > 0) wyniki.push({ frag: ix.frag[i], score });
    }
    wyniki.sort((a, b) => b.score - a.score);
    return wyniki.slice(0, limit || 5);
  },

  // ── złożenie odpowiedzi z najtrafniejszych fragmentów ──────────────────
  odpowiedz(zapytanie) {
    const traf = this.szukaj(zapytanie, 4);
    if (!traf.length) return null;
    const czolowy = traf[0];
    // odcinamy ogon o wyraźnie niższym dopasowaniu
    const prog = czolowy.score * 0.4;
    const wybrane = traf.filter(t => t.score >= prog).slice(0, 3);
    const tekst = wybrane.map(t => "• " + t.frag.tekst.replace(/\s+/g, " ").trim()).join("\n\n");
    const zrodla = [...new Set(wybrane.map(t => t.frag.zrodlo))].join(" · ");
    return { tekst, zrodlo: zrodla, pewnosc: czolowy.score };
  }
};
