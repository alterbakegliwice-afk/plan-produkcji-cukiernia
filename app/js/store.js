// Stan aplikacji + trwałość + moduły (Cukiernia / Piekarnia) + warstwa uczenia się.
// Każdy moduł ma własny plan, zadania, inspiracje, kalibracje, czat i "naukę".
// stan.ustawienia/plan/zadania/… to ALIASY aktywnego modułu — widoki używają ich bez zmian.
(function () {
  const KLUCZ = "alterbake_planer_v2";
  const KLUCZ_STARY = "alterbake_planer_v1";
  const CZAS_RE = /^([01]?\d|2[0-3]):[0-5]\d$/;

  function zespolModulu(k) {
    const m = window.AB_MODULY && window.AB_MODULY[k];
    return m && m.zasoby && m.zasoby.zespolDomyslny
      ? JSON.parse(JSON.stringify(m.zasoby.zespolDomyslny)) : [];
  }
  function oknoModulu(k, ktore) {
    const m = window.AB_MODULY && window.AB_MODULY[k];
    return (m && m.zasoby && m.zasoby.dzienDomyslny && m.zasoby.dzienDomyslny[ktore]) ||
      (ktore === "od" ? "06:00" : "16:00");
  }

  function modulDomyslny(k) {
    return {
      ustawienia: {
        zespol: zespolModulu(k),
        dzienOd: oknoModulu(k, "od"),
        dzienDo: oknoModulu(k, "do"),
        udzialStaly: 0.3
      },
      kalibracja: {},
      plan: {},
      zadania: [],
      inspiracje: [],
      czat: [],
      nauka: { fakty: [], notatki: [] } // uczenie: fakty z pracowni + wiedza własna Oliwii/piekarza
    };
  }

  function domyslny() {
    return {
      wersja: 2,
      aktywnyModul: "cukiernia",
      globalne: { apiKey: "", trybOnline: false },
      moduly: { cukiernia: modulDomyslny("cukiernia"), piekarnia: modulDomyslny("piekarnia") }
    };
  }

  function znormalizujModul(k, surowy) {
    const wzor = modulDomyslny(k);
    const s = (surowy && typeof surowy === "object") ? surowy : {};
    if (!s.ustawienia || typeof s.ustawienia !== "object") s.ustawienia = wzor.ustawienia;
    for (const key of Object.keys(wzor.ustawienia)) if (s.ustawienia[key] === undefined) s.ustawienia[key] = wzor.ustawienia[key];
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
    for (const key of ["zadania", "inspiracje", "czat"]) if (!Array.isArray(s[key])) s[key] = [];
    if (!s.plan || typeof s.plan !== "object") s.plan = {};
    if (!s.kalibracja || typeof s.kalibracja !== "object") s.kalibracja = {};
    if (!s.nauka || typeof s.nauka !== "object") s.nauka = { fakty: [], notatki: [] };
    if (!Array.isArray(s.nauka.fakty)) s.nauka.fakty = [];
    if (!Array.isArray(s.nauka.notatki)) s.nauka.notatki = [];
    return s;
  }

  function znormalizuj(surowy) {
    const s = (surowy && typeof surowy === "object") ? surowy : {};
    const wynik = domyslny();
    if (s.globalne && typeof s.globalne === "object") {
      wynik.globalne.apiKey = typeof s.globalne.apiKey === "string" ? s.globalne.apiKey : "";
      wynik.globalne.trybOnline = !!s.globalne.trybOnline;
    }
    const zrodloModuly = (s.moduly && typeof s.moduly === "object") ? s.moduly : {};
    wynik.moduly.cukiernia = znormalizujModul("cukiernia", zrodloModuly.cukiernia);
    wynik.moduly.piekarnia = znormalizujModul("piekarnia", zrodloModuly.piekarnia);
    if (s.aktywnyModul === "piekarnia" || s.aktywnyModul === "cukiernia") wynik.aktywnyModul = s.aktywnyModul;
    return wynik;
  }

  // Migracja z v1 (jeden moduł, płaski stan) → v2 (moduły)
  function migrujZv1(v1) {
    const wynik = domyslny();
    if (v1 && v1.ustawienia) {
      wynik.globalne.apiKey = v1.ustawienia.apiKey || "";
      wynik.globalne.trybOnline = !!v1.ustawienia.trybOnline;
    }
    wynik.moduly.cukiernia = znormalizujModul("cukiernia", {
      ustawienia: v1 && v1.ustawienia,
      kalibracja: v1 && v1.kalibracja,
      plan: v1 && v1.plan,
      zadania: v1 && v1.zadania,
      inspiracje: v1 && v1.inspiracje,
      czat: v1 && v1.czat
    });
    return wynik;
  }

  let stan;
  try {
    const zapisany = localStorage.getItem(KLUCZ);
    if (zapisany) {
      stan = znormalizuj(JSON.parse(zapisany));
    } else {
      const stary = localStorage.getItem(KLUCZ_STARY);
      stan = stary ? migrujZv1(JSON.parse(stary)) : domyslny();
    }
  } catch (e) {
    stan = domyslny();
  }

  // aliasy aktywnego modułu na najwyższym poziomie (żeby widoki nie musiały wiedzieć o modułach)
  function aliasuj() {
    const m = stan.moduly[stan.aktywnyModul];
    stan.ustawienia = m.ustawienia;
    stan.kalibracja = m.kalibracja;
    stan.plan = m.plan;
    stan.zadania = m.zadania;
    stan.inspiracje = m.inspiracje;
    stan.czat = m.czat;
    stan.nauka = m.nauka;
  }
  aliasuj();
  if (window.ustawModul) window.ustawModul(stan.aktywnyModul);

  function doZapisu() {
    return { wersja: 2, aktywnyModul: stan.aktywnyModul, globalne: stan.globalne, moduly: stan.moduly };
  }

  const sluchacze = [];

  window.Store = {
    get stan() { return stan; },
    get m() { return stan.moduly[stan.aktywnyModul]; },
    modul() { return stan.aktywnyModul; },

    zapisz() {
      try {
        localStorage.setItem(KLUCZ, JSON.stringify(doZapisu()));
      } catch (e) {
        AB.toast("Nie udało się zapisać danych (pamięć pełna?)", "blad");
      }
      sluchacze.forEach(f => f(stan));
    },

    nasluchuj(f) { sluchacze.push(f); },

    przelaczModul(k) {
      if (!stan.moduly[k] || k === stan.aktywnyModul) return;
      stan.aktywnyModul = k;
      if (window.ustawModul) window.ustawModul(k);
      aliasuj();
      this.zapisz();
    },

    dzien(data) {
      if (!stan.plan[data]) stan.plan[data] = { bloki: [] };
      return stan.plan[data];
    },

    czasPracy(nr) {
      const kal = stan.kalibracja[nr];
      if (kal && kal.czas_pracy_min > 0) return kal.czas_pracy_min;
      const r = AB.receptura(nr);
      return (r && r.czas_pracy_min) || 30;
    },

    eksportuj() {
      const kopia = JSON.parse(JSON.stringify(doZapisu()));
      kopia.globalne.apiKey = ""; // klucz nie wychodzi z urządzenia
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
        if (!dane || typeof dane !== "object") throw new Error("zły format");
        const klucz = stan.globalne.apiKey; // klucz z tego urządzenia zostaje
        stan = dane.moduly ? znormalizuj(dane) : migrujZv1(dane);
        stan.globalne.apiKey = klucz;
        aliasuj();
        if (window.ustawModul) window.ustawModul(stan.aktywnyModul);
        this.zapisz();
      });
    },

    async wyczysc() {
      if (await AB.potwierdz("Usunąć WSZYSTKIE dane aplikacji (oba moduły: plany, zadania, inspiracje, naukę)? Zrób najpierw kopię zapasową.")) {
        stan = domyslny();
        aliasuj();
        this.zapisz();
        location.reload();
      }
    }
  };
})();
