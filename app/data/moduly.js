// REJESTR MODUŁÓW — Cukiernia (Oliwia) i Piekarnia (piekarz).
// Składa dane wczytane z pozostałych plików w dwa moduły i przełącza aktywny,
// podmieniając globalne AB_RECEPTURY / AB_ZASOBY / AB_WIEDZA / AB_KORPUS.
(function () {
  const pustaWiedza = { reguly: [], autorytety: [], sezon: [], trendy: [] };

  window.AB_MODULY = {
    cukiernia: {
      meta: {
        nazwa: "Cukiernia", ikona: "🍰", skalowanie: "partie",
        jednostka: "partia", jednostkaDop: "partii", jednostkaWynik: "porcji",
        minIlosc: 1, maxIlosc: 12, krokIlosc: 1, osoba: "Oliwia"
      },
      receptury: window.AB_RECEPTURY || [],
      cennik: window.AB_CENNIK || {},
      zasoby: window.AB_ZASOBY,
      wiedza: window.AB_WIEDZA || pustaWiedza,
      korpus: window.AB_KORPUS_CUKIERNIA || []
    },
    piekarnia: {
      meta: {
        nazwa: "Piekarnia", ikona: "🥖", skalowanie: "maka",
        jednostka: "kg mąki", jednostkaDop: "kg mąki", jednostkaWynik: "szt.",
        minIlosc: 5, maxIlosc: 60, krokIlosc: 5, osoba: "Piekarz"
      },
      receptury: window.AB_PIEKARNIA_RECEPTURY || [],
      cennik: window.AB_CENNIK || {},
      zasoby: window.AB_ZASOBY_PIEKARNIA || window.AB_ZASOBY,
      wiedza: window.AB_WIEDZA_PIEKARNIA || pustaWiedza,
      korpus: window.AB_KORPUS_PIEKARNIA || [],
      prefermenty: window.AB_PREFERMENTY || {}
    }
  };

  // opisz receptury znacznikiem modułu (żeby silnik wiedział jak skalować)
  for (const [k, m] of Object.entries(window.AB_MODULY)) {
    for (const r of m.receptury) r._skalowanie = m.meta.skalowanie;
  }

  window.AB_MODUL = null;

  window.ustawModul = function (k) {
    const m = window.AB_MODULY[k];
    if (!m) return;
    window.AB_MODUL = Object.assign({ klucz: k }, m.meta);
    window.AB_RECEPTURY = m.receptury;
    window.AB_CENNIK = m.cennik;
    window.AB_ZASOBY = m.zasoby;
    window.AB_WIEDZA = m.wiedza;
    window.AB_KORPUS = m.korpus;
    window.AB_PREFERMENTY = m.prefermenty || {};
    if (window.Wiedza) window.Wiedza.przebuduj();
  };
})();
