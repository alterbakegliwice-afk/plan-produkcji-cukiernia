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

  const CZAS_RE = /^([01]?\d|2[0-3]):[0-5]\d$/;

  // migracja + walidacja — używana przy starcie ORAZ przy imporcie kopii
  // (stara/spreparowana kopia nie może wywalić aplikacji ani wstrzyknąć treści do atrybutów)
  function znormalizuj(surowy) {
    const wzor = domyslny();
    const s = (surowy && typeof surowy === "object") ? surowy : {};
    for (const k of Object.keys(wzor)) if (s[k] === undefined) s[k] = wzor[k];
    if (!s.ustawienia || typeof s.ustawienia !== "object") s.ustawienia = wzor.ustawienia;
    for (const k of Object.keys(wzor.ustawienia)) if (s.ustawienia[k] === undefined) s.ustawienia[k] = wzor.ustawienia[k];
    // godziny tylko w formacie HH:MM
    if (!CZAS_RE.test(s.ustawienia.dzienOd)) s.ustawienia.dzienOd = wzor.ustawienia.dzienOd;
    if (!CZAS_RE.test(s.ustawienia.dzienDo)) s.ustawienia.dzienDo = wzor.ustawienia.dzienDo;
    if (!Array.isArray(s.ustawienia.zespol) || !s.ustawienia.zespol.length) s.ustawienia.zespol = wzor.ustawienia.zespol;
    s.ustawienia.zespol = s.ustawienia.zespol.map((os, i) => ({
      id: String((os && os.id) || "osoba" + i),
      nazwa: String((os && os.nazwa) || "Osoba " + (i + 1)).slice(0, 40),
      rola: (os && os.rola) === "szef" ? "szef" : "pomoc",
      od: CZAS_RE.test(os && os.od) ? os.od : "07:00",
      do: CZAS_RE.test(os && os.do) ? os.do : "14:00"
    }));
    for (const k of ["zadania", "inspiracje", "czat"]) if (!Array.isArray(s[k])) s[k] = [];
    if (!s.plan || typeof s.plan !== "object") s.plan = {};
    if (!s.kalibracja || typeof s.kalibracja !== "object") s.kalibracja = {};
    return s;
  }

  let stan;
  try {
    stan = znormalizuj(JSON.parse(localStorage.getItem(KLUCZ)));
  } catch (e) {
    stan = domyslny();
  }

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
      // klucz API nigdy nie wychodzi z urządzenia w pliku kopii
      const kopia = JSON.parse(JSON.stringify(stan));
      kopia.ustawienia.apiKey = "";
      const blob = new Blob([JSON.stringify(kopia, null, 1)], { type: "application/json" });
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
        const klucz = stan.ustawienia.apiKey; // klucz z tego urządzenia zostaje
        stan = znormalizuj(dane);
        stan.ustawienia.apiKey = klucz;
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
