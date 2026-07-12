// MODEL CZASU — skalowanie czasu czynności względem ilości produkcji.
//
// Założenia (jawne, kalibrowalne):
// 1. Czas aktywny 1 partii pochodzi z FOODCOST ("Czas pracy min") lub kalibracji Oliwii.
// 2. Część czasu jest STAŁA (rozłożenie stanowiska, sprzęt, karta, mycie po) — domyślnie 30%.
//    Reszta skaluje się liniowo z liczbą partii: T(n) = T1 × (s + (1−s)·n).
// 3. Czas pieca NIE skaluje się z partiami tak jak ręce: liczy się liczbę WSADÓW
//    (ile form mieści piec naraz) × czas wypieku jednego wsadu.
// 4. Czasy pasywne (rozrost, chłodzenie ciasta, studzenie) nie angażują rąk,
//    ale blokują kalendarz — symulacja traktuje je jako bloki pasywne.

window.Czas = {

  // pełny rozkład czasu dla receptury przy n partiach
  rozklad(nr, nPartii) {
    const r = AB.receptura(nr);
    if (!r) return null;
    const p = r.proces || {};
    const s = Store.stan.ustawienia.udzialStaly;
    const t1 = Store.czasPracy(nr);

    const aktywny = Math.round(t1 * (s + (1 - s) * nPartii));

    // czas pieca / smażalnika
    const czasWsadu = this.czasWsadu(r);
    const zasob = this.zasobPieca(r);
    const pojemnosc = zasob === "smazalnik" ? 1 : (AB_ZASOBY.piece.find(x => x.id === zasob) || {}).poziomy || 3;
    const wsady = czasWsadu ? Math.ceil(nPartii / pojemnosc) : 0;
    const piec = czasWsadu * wsady;

    // czasy pasywne z parametrów procesu
    const pasywnePrzed = (p.ferm_min || 0) + (p.rozrost_min || 0); // fermentacja + rozrost przed wypiekiem
    const chlodzenieCiasta = r.nr === "C-018" ? 120 : 0;            // ciasto maślane: 2 h chłodzenia przed wałkowaniem
    const studzenie = czasWsadu ? AB_ZASOBY.modelCzasu.studzenieMin : 0;

    return {
      aktywny, piec, wsady, czasWsadu, pojemnosc, zasob,
      pasywnePrzed, chlodzenieCiasta, studzenie,
      mieszanie: p.miesz_min || 0,
      total: aktywny + pasywnePrzed + chlodzenieCiasta + piec + studzenie
    };
  },

  czasWsadu(r) {
    const p = r.proces || {};
    if (p.piec === "smażone") return 12; // partia smażenia pączków/donutów ~12 min (do kalibracji)
    return p.bong_min || p.ibis_min || 0;
  },

  zasobPieca(r) {
    const p = r.proces || {};
    if (p.piec === "smażone") return "smazalnik";
    if (p.piec && p.piec.indexOf("IBIS") >= 0) return "ibis";
    return "bongard";
  },

  temperatura(r) {
    const p = r.proces || {};
    if (p.piec === "smażone") return 185;
    return p.bong_t || p.ibis_t || null;
  },

  // dane do wykresu: czas vs liczba partii (1..max)
  seriaSkalowania(nr, max) {
    const wynik = [];
    for (let n = 1; n <= max; n++) {
      const rz = this.rozklad(nr, n);
      wynik.push({ n, aktywny: rz.aktywny, piec: rz.piec, total: rz.total });
    }
    return wynik;
  },

  // skalowanie naważek: składniki receptury × mnożnik partii
  nawazki(nr, nPartii) {
    const r = AB.receptura(nr);
    if (!r) return [];
    return r.skladniki.map(sk => ({
      ...sk,
      ilosc: Math.round(sk.ilosc_g * nPartii * 10) / 10
    }));
  },

  // koszt surowców przy n partiach + sugerowana cena
  koszt(nr, nPartii) {
    const r = AB.receptura(nr);
    if (!r) return null;
    const zal = window.AB_FOODCOST_ZALOZENIA || { stawka_h: 40 };
    const rz = this.rozklad(nr, nPartii);
    const surowce = (r.koszt_surowcow_partia || 0) * nPartii;
    const robocizna = rz.aktywny / 60 * (zal.stawka_h || 40);
    const porcje = (r.porcje_partia || 1) * nPartii;
    return {
      surowce, robocizna, razem: surowce + robocizna,
      porcje, naPorcje: porcje ? (surowce + robocizna) / porcje : 0
    };
  }
};
