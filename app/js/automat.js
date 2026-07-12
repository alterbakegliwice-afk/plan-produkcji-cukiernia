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
