// Stan aplikacji + trwałość (localStorage) + eksport/import kopii zapasowej
(function () {
  const KLUCZ = "alterbake_planer_v1";

  const domyslny = () => ({
    wersja: 1,
    ustawienia: {
      zespol: JSON.parse(JSON.stringify(AB_ZASOBY.zespolDomyslny)),
      dzienOd: "06:00",
      dzienDo: "16:00",
      udzialStaly: AB_ZASOBY.modelCzasu.udzialStaly,
      apiKey: "",       // opcjonalny klucz Claude API (tryb online Sous Chefa)
      trybOnline: false
    },
    kalibracja: {},      // nr receptury -> { czas_pracy_min }
    plan: {},            // "YYYY-MM-DD" -> { bloki: [] }
    zadania: [],         // { id, tytul, osoba, data, czas_min, status, zrodlo }
    inspiracje: [],      // { id, tekst, dataDodania, status, eksperyment:{...} }
    czat: []             // historia rozmowy z Sous Chefem
  });

  let stan;
  try {
    stan = JSON.parse(localStorage.getItem(KLUCZ)) || domyslny();
  } catch (e) {
    stan = domyslny();
  }
  // migracja brakujących kluczy po aktualizacji aplikacji
  const wzor = domyslny();
  for (const k of Object.keys(wzor)) if (stan[k] === undefined) stan[k] = wzor[k];
  for (const k of Object.keys(wzor.ustawienia)) if (stan.ustawienia[k] === undefined) stan.ustawienia[k] = wzor.ustawienia[k];

  const sluchacze = [];

  window.Store = {
    get stan() { return stan; },

    zapisz() {
      try {
        localStorage.setItem(KLUCZ, JSON.stringify(stan));
      } catch (e) {
        AB.toast("Nie udało się zapisać danych (pamięć pełna?)", "blad");
      }
      sluchacze.forEach(f => f(stan));
    },

    nasluchuj(f) { sluchacze.push(f); },

    dzien(data) {
      if (!stan.plan[data]) stan.plan[data] = { bloki: [] };
      return stan.plan[data];
    },

    // czas pracy 1 partii — kalibracja Oliwii ma pierwszeństwo przed XLSX
    czasPracy(nr) {
      const kal = stan.kalibracja[nr];
      if (kal && kal.czas_pracy_min > 0) return kal.czas_pracy_min;
      const r = AB.receptura(nr);
      return (r && r.czas_pracy_min) || 30;
    },

    eksportuj() {
      const blob = new Blob([JSON.stringify(stan, null, 1)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "alterbake-planer-kopia-" + AB.dzisISO() + ".json";
      a.click();
      URL.revokeObjectURL(a.href);
    },

    importuj(plik) {
      return plik.text().then(txt => {
        const dane = JSON.parse(txt);
        if (!dane || typeof dane !== "object" || !dane.ustawienia) throw new Error("zły format");
        stan = dane;
        this.zapisz();
      });
    },

    async wyczysc() {
      if (await AB.potwierdz("Usunąć WSZYSTKIE dane aplikacji (plany, zadania, inspiracje)? Zrób najpierw kopię zapasową.")) {
        stan = domyslny();
        this.zapisz();
        location.reload();
      }
    }
  };
})();
