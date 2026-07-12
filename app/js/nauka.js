// WARSTWA UCZENIA SIĘ — aplikacja mądrzeje z Twojej pracowni.
// "Sam się uczy" uczciwie: nie trenuje sieci neuronowej, tylko gromadzi FAKTY z Twojej
// pracy (zmierzone czasy, wyniki eksperymentów) i Twoją WIEDZĘ WŁASNĄ (notatki),
// a wszystko to wchodzi do darmowej bazy wyszukiwania doradcy i wpływa na podpowiedzi.
// Dane per moduł (Store.stan.nauka to alias aktywnego modułu).
window.Nauka = {
  _n() {
    const n = Store.stan.nauka || (Store.stan.nauka = { fakty: [], notatki: [] });
    if (!Array.isArray(n.fakty)) n.fakty = [];
    if (!Array.isArray(n.notatki)) n.notatki = [];
    return n;
  },

  // ── fakty nauczone automatycznie ───────────────────────────────────────
  dodajFakt(kat, tytul, tekst, klucz) {
    const n = this._n();
    // dedup po kluczu (np. kalibracja danej receptury nadpisuje poprzednią)
    if (klucz) n.fakty = n.fakty.filter(f => f.klucz !== klucz);
    n.fakty.unshift({ id: AB.uid(), kat, tytul, tekst, klucz: klucz || null, data: AB.dzisISO() });
    if (n.fakty.length > 200) n.fakty.length = 200;
    Store.zapisz();
    if (window.Wiedza) Wiedza.przebuduj();
  },

  usunFakt(id) {
    const n = this._n();
    n.fakty = n.fakty.filter(f => f.id !== id);
    Store.zapisz();
    if (window.Wiedza) Wiedza.przebuduj();
  },

  // zmierzony czas pracy → fakt (razem z zapisem kalibracji)
  zapamietajKalibracje(r, minuty, jednostka) {
    this.dodajFakt("skalowanie",
      "Zmierzony czas: " + r.nazwa,
      "„" + r.nazwa + "” (" + r.nr + ") zajmuje realnie " + minuty + " min pracy rąk na " + jednostka +
      " — Twój pomiar, ma pierwszeństwo przed szacunkiem z arkusza.",
      "kal-" + r.nr);
  },

  // wynik eksperymentu → fakt (przy wdrożeniu lub odrzuceniu)
  zapamietajEksperyment(insp, decyzja) {
    const e = insp.eksperyment || {};
    const nazwa = insp.tekst.slice(0, 60);
    this.dodajFakt("jakosc",
      (decyzja === "wdrozone" ? "✅ Wdrożone: " : "✕ Odrzucone: ") + nazwa,
      "Pomysł: " + insp.tekst + (e.hipoteza ? " Hipoteza: " + e.hipoteza : "") +
      (e.wynik ? " Wynik testu: " + e.wynik : "") +
      (decyzja === "wdrozone" ? " → WESZŁO do oferty." : " → nie weszło, nie powtarzaj bez zmiany."),
      "eksp-" + insp.id);
  },

  // ── wiedza własna (notatki użytkownika) ────────────────────────────────
  dodajNotatke(tytul, tekst, tagi) {
    const n = this._n();
    n.notatki.unshift({ id: AB.uid(), tytul: tytul || "", tekst: tekst || "", tagi: tagi || "", data: AB.dzisISO() });
    Store.zapisz();
    if (window.Wiedza) Wiedza.przebuduj();
  },

  usunNotatke(id) {
    const n = this._n();
    n.notatki = n.notatki.filter(x => x.id !== id);
    Store.zapisz();
    if (window.Wiedza) Wiedza.przebuduj();
  },

  statystyki() {
    const n = this._n();
    const W = window.AB_WIEDZA || {};
    return {
      fakty: n.fakty.length,
      notatki: n.notatki.length,
      reguly: (W.reguly || []).length,
      fragmenty: (window.AB_KORPUS || []).length,
      razem: n.fakty.length + n.notatki.length + (W.reguly || []).length +
        (W.autorytety || []).length + (window.AB_KORPUS || []).length
    };
  }
};
