// AUTOMATYZACJA — mniej klikania, więcej gotowego.
// 1) Auto-plan: proponuje zestaw produktów na dzień z Twoich NAWYKÓW (historia planów)
//    i SEZONU, po czym układa go symulacją bez kolizji.
// 2) Zadania z planu: z gotowego planu generuje naważki (do pomocy) + sprzątanie.
window.Automat = {

  // częstość produktów w historii planów tego modułu (nawyki)
  _nawyki() {
    const licznik = {};
    for (const dzien of Object.values(Store.stan.plan)) {
      for (const b of (dzien.bloki || [])) licznik[b.nr] = (licznik[b.nr] || 0) + 1;
    }
    return licznik;
  },

  _sezonoweSlowa() {
    const s = ((window.AB_WIEDZA || {}).sezon || []).find(x => x.miesiac === new Date().getMonth() + 1);
    if (!s) return [];
    return this._tok((s.produkty || []).join(" ") + " " + (s.surowce || []).join(" "));
  },
  _tok(str) {
    return String(str).toLowerCase().split(/[^a-ząćęłńóśżź0-9]+/).filter(w => w.length > 3);
  },

  // wybór produktów na dzień: nawyki + dopasowanie sezonowe + pokrycie kategorii
  proponujProdukty(ile) {
    const receptury = (window.AB_RECEPTURY || []).filter(r => !r.tylko_proces && (r.skladniki || []).length);
    if (!receptury.length) return [];
    const nawyki = this._nawyki();
    const sezon = this._sezonoweSlowa();
    const maxNaw = Math.max(1, ...Object.values(nawyki));

    const ocena = receptury.map(r => {
      const nz = (r.nazwa + " " + (r.kategoria || "")).toLowerCase();
      let s = 0;
      s += (nawyki[r.nr] || 0) / maxNaw * 3;                       // nawyk
      s += sezon.some(w => nz.includes(w)) ? 2 : 0;                 // sezon
      s += 0.3;                                                     // baza
      return { r, s };
    }).sort((a, b) => b.s - a.s);

    // pokrycie kategorii: nie bierz 5× tej samej kategorii
    const wynik = [], zliczoneKat = {};
    for (const { r } of ocena) {
      const k = r.kategoria || "?";
      if ((zliczoneKat[k] || 0) >= 2) continue;
      zliczoneKat[k] = (zliczoneKat[k] || 0) + 1;
      wynik.push(r);
      if (wynik.length >= ile) break;
    }
    return wynik;
  },

  // pełny auto-plan: proponuje, skaluje rozsądnie, układa symulacją
  ulozAutomat(data, ile) {
    const M = window.AB_MODUL;
    const szef = Store.stan.ustawienia.zespol.find(z => z.rola === "szef") || Store.stan.ustawienia.zespol[0];
    const produkty = this.proponujProdukty(ile || 4);
    if (!produkty.length) return { bloki: [], ostrzezenia: [], produkty: [] };
    const pozycje = produkty.map(r => ({
      nr: r.nr,
      partie: M.minIlosc,        // domyślnie 1 partia / minimalny wsad — do korekty ręcznej
      osoba: szef.id
    }));
    const wynik = Symulacja.uloz(pozycje);
    Store.dzien(data).bloki = wynik.bloki;
    Store.zapisz();
    return { ...wynik, produkty };
  },

  // ODPRAWA D-1 — czego oś dnia nie pokazuje: co przygotować WIECZÓR wcześniej.
  // Piekarnia: dokarmienie zaczynów (wg czasu prowadzenia), retard kęsów, zaparki.
  // Cukiernia: serniki dzień przed, ciasto chłodzone, kremy/mrożenie z wyprzedzeniem.
  odprawaD1(data) {
    const dzien = Store.dzien(data);
    const punkty = [];
    if (!dzien.bloki.length) return punkty;
    const nrList = dzien.bloki.map(b => b.nr);
    const receptury = nrList.map(AB.receptura).filter(Boolean);
    const M = window.AB_MODUL || {};

    if (M.klucz === "piekarnia") {
      // 1. zaczyny użyte w planie → dokarmić D-1 wg czasu prowadzenia
      const zaczyny = new Set();
      for (const r of receptury) (r.prefermenty || []).forEach(p => zaczyny.add(p));
      const P = window.AB_PREFERMENTY || {};
      for (const nazwa of zaczyny) {
        // receptura: "Pszenny levain płynny (100%)" · tabela: "Pszenny levain płynny"
        const czysta = nazwa.replace(/\s*\(.*?\)\s*/g, " ").trim().toLowerCase();
        let p = P[nazwa];
        if (!p) {
          const wpis = Object.entries(P).find(([k]) => {
            const kl = k.toLowerCase();
            return kl === czysta || czysta.startsWith(kl) || kl.startsWith(czysta);
          });
          p = wpis && wpis[1];
        }
        const czas = p && p.czas_h != null ? p.czas_h + " h przed mieszaniem" : "wg tabeli prowadzenia";
        const sygnal = p && p.sygnal ? " · sygnał: " + p.sygnal : "";
        punkty.push({ tytul: "🫧 Dokarm: " + nazwa, tekst: "Odśwież ~" + czas + sygnal + ". Zaczyn ma być na szczycie w chwili mieszania." });
      }
      // 2. zaparki / kęsy laminowane / retard — z tabeli półproduktów
      for (const pp of (window.AB_ZASOBY.polprodukty || [])) {
        if (pp.uzycie && pp.uzycie.some(nr => nrList.includes(nr))) {
          punkty.push({ tytul: "🌙 " + pp.nazwa, tekst: pp.rada + " (mrożenie: " + pp.mrozenie + ")" });
        } else if (/zaparki|retard|levain/i.test(pp.nazwa)) {
          punkty.push({ tytul: "🌙 " + pp.nazwa, tekst: pp.rada });
        }
      }
      // 3. ogólna zasada modelu wieczornego
      punkty.push({ tytul: "🌙 Domknięcie zmiany", tekst: "Uformuj i wstaw do retardu nocnego (Asber −2…8°C) to, co idzie rano prosto z chłodu. Rano tylko gar + odpiek — bez presji." });
    } else {
      // cukiernia: co zrobić dzień wcześniej
      const serniki = receptury.filter(r => r.kategoria === "Serniki");
      if (serniki.length) punkty.push({ tytul: "🌙 Serniki — piecz dziś na jutro", tekst: serniki.map(r => r.nazwa).join(", ") + ": tężeją noc w lodówce, na witrynę są gotowe dopiero jutro." });
      if (nrList.includes("C-018")) punkty.push({ tytul: "🌙 Ciasto maślane — schłodź", tekst: "Ciasto na ciastka maślane chłodź min. 2 h (najlepiej noc) przed wałkowaniem." });
      for (const pp of (window.AB_ZASOBY.polprodukty || [])) {
        if (pp.uzycie && pp.uzycie.some(nr => nrList.includes(nr)) && /mroż|retard|noc/i.test(pp.rada)) {
          punkty.push({ tytul: "🌙 " + pp.nazwa, tekst: pp.rada });
        }
      }
      if (!punkty.length) punkty.push({ tytul: "🌙 Brak zadań z wyprzedzeniem", tekst: "Dzisiejszy plan nie wymaga przygotowań dzień wcześniej — wszystko robisz na bieżąco." });
    }
    return punkty;
  },

  // zadania z planu: naważki (pomoc) + sprzątanie końcowe
  generujZadania(data) {
    const dzien = Store.dzien(data);
    if (!dzien.bloki.length) return 0;
    const pomoc = Store.stan.ustawienia.zespol.find(z => z.rola === "pomoc") || Store.stan.ustawienia.zespol[0];
    const M = window.AB_MODUL;
    let dodano = 0;
    const istnieje = new Set(Store.stan.zadania.filter(z => z.data === data).map(z => z.typ + ":" + (z.zrodlo || "")));

    for (const b of dzien.bloki) {
      const r = AB.receptura(b.nr);
      if (!r || r.tylko_proces) continue;
      const klucz = "nawazki:" + b.nr;
      if (istnieje.has(klucz)) continue;
      istnieje.add(klucz);
      Store.stan.zadania.push({
        id: AB.uid(), tytul: "Naważki: " + r.nazwa + " — " + b.partie + (M.skalowanie === "maka" ? " kg mąki" : " partii"),
        osoba: pomoc.id, data, czas_min: 12, status: "otwarte", typ: "nawazki", zrodlo: b.nr
      });
      dodano++;
    }
    // sprzątanie końcowe raz dziennie
    if (!istnieje.has("sprzatanie:")) {
      const szablon = (window.AB_ZASOBY.szablonyZadan || []).find(s => /sprz|mycie|zmyw/.test(s.id)) || { tytul: "Sprzątanie końcowe", czas_min: 30 };
      Store.stan.zadania.push({
        id: AB.uid(), tytul: szablon.tytul, osoba: pomoc.id, data,
        czas_min: szablon.czas_min || 30, status: "otwarte", typ: "sprzatanie", zrodlo: ""
      });
      dodano++;
    }
    Store.zapisz();
    return dodano;
  }
};
