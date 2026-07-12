// MODEL CZASU — skalowanie czynności względem ilości produkcji.
// Świadomy modułu: cukiernia skaluje PARTIAMI, piekarnia KILOGRAMAMI MĄKI (baker's %).
//
// Założenia (jawne, kalibrowalne):
// 1. Czas 1 jednostki bazowej z FOODCOST lub kalibracji Oliwii/piekarza.
// 2. Część czasu STAŁA (stanowisko, sprzęt, mycie) — domyślnie 30%; reszta skaluje się z ilością.
// 3. Czas pieca liczony WSADAMI (ile mieści piec naraz), nie liniowo z ilością.
// 4. Czasy pasywne (fermentacja, rozrost, retard, studzenie) nie angażują rąk, ale blokują produkt.

window.Czas = {
  _skal() { return (window.AB_MODUL && window.AB_MODUL.skalowanie) || "partie"; },
  _wsadBazowy() { return ((window.AB_ZASOBY.modelCzasu || {}).wsadBazowyKg) || 10; },

  // masa ciasta całkowita dla receptury przy `ilosc` (partie lub kg mąki)
  masaCiasta(r, ilosc) {
    if (this._skal() === "maka") {
      const sumaPct = (r.skladniki || []).reduce((a, s) => a + (s.pct || 0), 0);
      return sumaPct / 100 * ilosc * 1000; // g
    }
    return (r.masa_partii_g || 0) * ilosc;
  },

  // liczba sztuk na wyjściu
  sztuki(r, ilosc) {
    if (this._skal() === "maka") {
      const masaSzt = (r.proces && r.proces.masa_szt_g) || 0;
      return masaSzt ? Math.round(this.masaCiasta(r, ilosc) / masaSzt) : 0;
    }
    return Math.round((r.porcje_partia || 1) * ilosc);
  },

  // współczynnik skali czasu rąk względem jednostki bazowej
  _skalaCzasu(ilosc) {
    return this._skal() === "maka" ? ilosc / this._wsadBazowy() : ilosc;
  },

  rozklad(nr, ilosc) {
    const r = AB.receptura(nr);
    if (!r) return null;
    const p = r.proces || {};
    const s = Store.stan.ustawienia.udzialStaly;
    const t1 = Store.czasPracy(nr);
    const skala = this._skalaCzasu(ilosc);

    const aktywny = Math.max(1, Math.round(t1 * (s + (1 - s) * skala)));

    const czasWsadu = this.czasWsadu(r);
    const zasob = this.zasobPieca(r);
    const piecInfo = (window.AB_ZASOBY.piece || []).find(x => x.id === zasob);
    const pojemnosc = zasob === "smazalnik" ? 1 : (piecInfo && piecInfo.poziomy) || 3;

    // ile wsadów pieca: cukiernia liczy partiami, piekarnia liczy blachami sztuk
    let wsady = 0;
    if (czasWsadu) {
      if (this._skal() === "maka") {
        const sztNaBlache = (p.szt_blacha) || 20;
        const blach = Math.max(1, Math.ceil(this.sztuki(r, ilosc) / sztNaBlache));
        wsady = Math.ceil(blach / pojemnosc);
      } else {
        wsady = Math.ceil(ilosc / pojemnosc);
      }
    }
    const piec = czasWsadu * wsady;

    const pasywnePrzed = (p.ferm_min || 0) + (p.rozrost_min || 0);
    const chlodzenieCiasta = nr === "C-018" ? 120 : 0;
    const studzenie = czasWsadu ? ((window.AB_ZASOBY.modelCzasu || {}).studzenieMin || 30) : 0;

    return {
      aktywny, piec, wsady, czasWsadu, pojemnosc, zasob,
      pasywnePrzed, chlodzenieCiasta, studzenie,
      mieszanie: p.miesz_min || 0,
      total: aktywny + pasywnePrzed + chlodzenieCiasta + piec + studzenie
    };
  },

  czasWsadu(r) {
    const p = r.proces || {};
    if (p.piec === "smażone") return 12;
    return p.bong_min || p.ibis_min || 0;
  },

  zasobPieca(r) {
    const p = r.proces || {};
    if (p.piec === "smażone") return "smazalnik";
    // piekarnia domyślnie piecze na IBIS-ie; jawny wpis wygrywa
    if (p.piec && p.piec.toLowerCase().indexOf("ibis") >= 0) return "ibis";
    if (p.piec && p.piec.toLowerCase().indexOf("bongard") >= 0) return "bongard";
    // gdy tylko parametry IBIS a piec konwekcyjny nieokreślony (typowe dla piekarni)
    if (this._skal() === "maka" && p.ibis_min && !p.bong_min) return "ibis";
    return "bongard";
  },

  temperatura(r) {
    const p = r.proces || {};
    if (p.piec === "smażone") return 185;
    return (this.zasobPieca(r) === "ibis" ? p.ibis_t : p.bong_t) || p.bong_t || p.ibis_t || null;
  },

  seriaSkalowania(nr, max) {
    const krok = (window.AB_MODUL && window.AB_MODUL.krokIlosc) || 1;
    const start = (window.AB_MODUL && window.AB_MODUL.minIlosc) || 1;
    const wynik = [];
    for (let n = start; n <= max; n += krok) {
      const rz = this.rozklad(nr, n);
      wynik.push({ n, aktywny: rz.aktywny, piec: rz.piec, total: rz.total });
    }
    return wynik;
  },

  nawazki(nr, ilosc) {
    const r = AB.receptura(nr);
    if (!r) return [];
    if (this._skal() === "maka") {
      // baker's %: g = pct/100 × (kg mąki × 1000)
      return (r.skladniki || []).map(sk => ({
        nazwa: sk.nazwa, typ: sk.typ, faza: sk.faza, kolejnosc: sk.kolejnosc, uwagi: sk.uwagi,
        ilosc: Math.round(sk.pct / 100 * ilosc * 1000 * 10) / 10, pct: sk.pct
      }));
    }
    return (r.skladniki || []).map(sk => ({
      ...sk, ilosc: Math.round(sk.ilosc_g * ilosc * 10) / 10
    }));
  },

  koszt(nr, ilosc) {
    const r = AB.receptura(nr);
    if (!r) return null;
    const zal = window.AB_FOODCOST_ZALOZENIA || window.AB_PIEKARNIA_FOODCOST_ZALOZENIA || { stawka_h: 40 };
    const rz = this.rozklad(nr, ilosc);
    const surowce = this._skal() === "maka"
      ? (r.koszt_na_kg_maki || 0) * ilosc
      : (r.koszt_surowcow_partia || 0) * ilosc;
    const robocizna = rz.aktywny / 60 * (zal.stawka_h || 40);
    const sztuk = this.sztuki(r, ilosc);
    return {
      surowce, robocizna, razem: surowce + robocizna,
      sztuk, naSztuke: sztuk ? (surowce + robocizna) / sztuk : 0,
      niepelny: this._skal() === "maka" && r.brak_cen && r.brak_cen.length > 0
    };
  }
};
