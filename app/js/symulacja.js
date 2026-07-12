// SYMULACJA DNIA — układanie bloków produkcyjnych na osi czasu.
//
// Zasady silnika (ugruntowane w złotych standardach Alterbake):
// • Piec konwekcyjny ma jedną temperaturę naraz → wypieki grupujemy od najniższej
//   do najwyższej temperatury (piec szybciej dogrzewa niż stygnie).
// • Osoba wykonuje jedną czynność aktywną naraz; czasy pasywne (rozrost, studzenie)
//   nie angażują rąk, ale blokują produkt.
// • Smażenie (pączki, donuty) idzie na osobnym zasobie — może biec równolegle z piecem.
// • Serniki wymagają nocy w chłodni → planuj dzień przed sprzedażą (ostrzeżenie).

window.Symulacja = {

  // ── budowa łańcucha segmentów jednego bloku produkcyjnego ──────────────
  segmenty(nr, partie) {
    const r = AB.receptura(nr);
    if (!r) return [];
    const rz = Czas.rozklad(nr, partie);
    const seg = [];
    let t = 0;

    // przygotowanie + mieszanie + formowanie (czas aktywny dzielimy: 70% przygotowanie, 30% wykończenie)
    const przygotowanie = Math.max(10, Math.round(rz.aktywny * 0.7));
    const wykonczenie = Math.max(5, rz.aktywny - przygotowanie);

    seg.push({ typ: "aktywny", nazwa: "Przygotowanie + mieszanie", od: t, do: t += przygotowanie });

    if (rz.chlodzenieCiasta) seg.push({ typ: "pasywny", nazwa: "Chłodzenie ciasta (2 h)", od: t, do: t += rz.chlodzenieCiasta });
    if (rz.pasywnePrzed) seg.push({ typ: "pasywny", nazwa: "Fermentacja / rozrost", od: t, do: t += rz.pasywnePrzed });

    if (rz.piec) {
      const smazenie = rz.zasob === "smazalnik";
      // smażenie angażuje ręce (partie wkłada się i wyjmuje na bieżąco) — wypiek w piecu nie
      seg.push({ typ: "piec", nazwa: (smazenie ? "Smażenie" : "Wypiek") + " (" + rz.wsady + " wsad" + (rz.wsady > 1 ? "y" : "") + ")",
                 od: t, do: t += rz.piec, zasob: rz.zasob, temp: Czas.temperatura(r), osobaAktywna: smazenie });
      seg.push({ typ: "pasywny", nazwa: "Studzenie", od: t, do: t += rz.studzenie });
    }

    seg.push({ typ: "aktywny", nazwa: "Wykończenie / pakowanie", od: t, do: t += wykonczenie });
    return seg;
  },

  // ── wolne okno w zajętych przedziałach ─────────────────────────────────
  _wolneOkno(zajete, od, dlugosc) {
    // zajete: posortowana lista [od, do]
    let start = od;
    for (const [a, b] of zajete) {
      if (start + dlugosc <= a) break;
      if (b > start) start = b;
    }
    return start;
  },

  _wstawZajete(zajete, od, do_) {
    zajete.push([od, do_]);
    zajete.sort((x, y) => x[0] - y[0]);
  },

  // ── automatyczne ułożenie dnia ─────────────────────────────────────────
  // pozycje: [{nr, partie, osoba}] → zwraca { bloki, ostrzezenia }
  uloz(pozycje, opcje) {
    opcje = opcje || {};
    const ust = Store.stan.ustawienia;
    const dzienOd = AB.doMin(opcje.od || ust.dzienOd);
    const dzienDo = AB.doMin(opcje.do || ust.dzienDo);
    const ostrzezenia = [];

    // sortowanie: najpierw produkty z długim czasem pasywnym (drożdżowe — trzeba zacząć wcześnie),
    // potem piecowe rosnąco po temperaturze, smażone na końcu (osobny zasób)
    const posort = [...pozycje].sort((a, b) => {
      const ra = AB.receptura(a.nr), rb = AB.receptura(b.nr);
      const pasA = (ra.proces.ferm_min || 0) + (ra.proces.rozrost_min || 0);
      const pasB = (rb.proces.ferm_min || 0) + (rb.proces.rozrost_min || 0);
      if (pasA !== pasB) return pasB - pasA; // dłuższa fermentacja = wcześniej start
      const tA = Czas.temperatura(ra) || 0, tB = Czas.temperatura(rb) || 0;
      return tA - tB; // piec: od najniższej temperatury
    });

    const zajetePiece = { bongard: [], ibis: [], smazalnik: [] };
    // pilnujemy drabinki temperatur: skoro produkty idą rosnąco po temperaturze,
    // każdy kolejny wypiek w danym piecu musi zacząć się PO poprzednim (bez wskakiwania w luki)
    const koniecPieca = { bongard: 0, ibis: 0, smazalnik: 0 };
    const zajeteOsoby = {};
    for (const os of ust.zespol) zajeteOsoby[os.id] = [];

    const bloki = [];

    for (const poz of posort) {
      const r = AB.receptura(poz.nr);
      if (!r) continue;
      let osoba = poz.osoba || "oliwia";
      if (!zajeteOsoby[osoba]) osoba = ust.zespol[0].id; // osoba spoza zespołu (np. po edycji składu) → szef
      const seg = this.segmenty(poz.nr, poz.partie);
      if (!seg.length) continue;

      const os = ust.zespol.find(z => z.id === osoba) || ust.zespol[0];
      const osobaOd = Math.max(dzienOd, AB.doMin(os.od));
      const piecInfo = AB_ZASOBY.piece.find(p => p.id === (seg.find(s => s.typ === "piec") || {}).zasob);

      // szukamy najwcześniejszego startu bloku, przy którym wszystkie segmenty się mieszczą
      let start = osobaOd;
      let proby = 0;
      let ok = false;
      while (proby < 200 && !ok) {
        ok = true;
        for (const s of seg) {
          const od = start + s.od, do_ = start + s.do;
          if (s.typ === "aktywny") {
            const wolne = this._wolneOkno(zajeteOsoby[osoba], od, s.do - s.od);
            if (wolne > od) { start += wolne - od; ok = false; break; }
          } else if (s.typ === "piec") {
            const dostepnyOd = Math.max(piecInfo ? AB.doMin(piecInfo.dostepnyOd) : dzienOd, koniecPieca[s.zasob]);
            if (od < dostepnyOd) { start += dostepnyOd - od; ok = false; break; }
            const wolne = this._wolneOkno(zajetePiece[s.zasob], od, s.do - s.od);
            if (wolne > od) { start += wolne - od; ok = false; break; }
            if (s.osobaAktywna) { // smażenie: ta sama osoba musi być wolna
              const wolnaOsoba = this._wolneOkno(zajeteOsoby[osoba], od, s.do - s.od);
              if (wolnaOsoba > od) { start += wolnaOsoba - od; ok = false; break; }
            }
          }
        }
        proby++;
      }
      if (!ok) {
        ostrzezenia.push({ typ: "kolizja", tekst: r.nazwa + ": nie udało się znaleźć okna bez kolizji — blok wstawiony z nakładaniem. " +
          "Zmniejsz liczbę produktów albo rozłóż na dwa dni." });
      }

      // rezerwacja zasobów
      for (const s of seg) {
        const od = start + s.od, do_ = start + s.do;
        if (s.typ === "aktywny") this._wstawZajete(zajeteOsoby[osoba], od, do_);
        else if (s.typ === "piec") {
          this._wstawZajete(zajetePiece[s.zasob], od, do_);
          koniecPieca[s.zasob] = Math.max(koniecPieca[s.zasob], do_);
          if (s.osobaAktywna) this._wstawZajete(zajeteOsoby[osoba], od, do_);
        }
      }

      const koniec = start + seg[seg.length - 1].do;
      if (koniec > dzienDo) {
        ostrzezenia.push({ typ: "przekroczenie", tekst: r.nazwa + ": kończy się o " + AB.zMin(koniec) +
          " — po końcu dnia (" + AB.zMin(dzienDo) + "). Rozważ mniejszą ilość, delegację albo przesunięcie na jutro." });
      }
      const osDo = AB.doMin(os.do);
      const ostatniAktywny = seg.filter(s => s.typ === "aktywny").pop();
      if (ostatniAktywny && start + ostatniAktywny.do > osDo) {
        ostrzezenia.push({ typ: "zmiana", tekst: r.nazwa + ": wykończenie wypada po końcu zmiany " + os.nazwa +
          " (" + os.do + "). Przekaż wykończenie innej osobie albo zacznij dzień wcześniej." });
      }

      bloki.push({ id: AB.uid(), nr: poz.nr, partie: poz.partie, osoba, start, segmenty: seg });
    }

    // analiza sekwencji temperatur pieca
    const piecowe = bloki
      .map(b => ({ b, s: b.segmenty.find(s => s.typ === "piec" && s.zasob === "bongard") }))
      .filter(x => x.s)
      .sort((x, y) => (x.b.start + x.s.od) - (y.b.start + y.s.od));
    for (let i = 1; i < piecowe.length; i++) {
      const t0 = piecowe[i - 1].s.temp, t1 = piecowe[i].s.temp;
      if (t1 < t0 - 20) {
        const rPoprz = AB.receptura(piecowe[i - 1].b.nr);
        const przezFermentacje = (rPoprz.proces.ferm_min || 0) + (rPoprz.proces.rozrost_min || 0) > 0;
        ostrzezenia.push({ typ: "piec", tekst: "Piec: po " + t0 + "°C (" + rPoprz.nazwa +
          ") wraca w dół do " + t1 + "°C (" + AB.receptura(piecowe[i].b.nr).nazwa + "). " +
          (przezFermentacje
            ? "To cena wczesnego startu drożdżowych/laminowanych — dolicz 10–15 min na wystygnięcie pieca (drzwi uchylone) albo przenieś " + rPoprz.nazwa.toLowerCase() + " na koniec, jeśli godzina witryny pozwala."
            : "Piec stygnie wolno — zamień kolejność wypieków, jeśli się da.") });
      }
    }

    return { bloki, ostrzezenia };
  },

  // ── inteligentne podpowiedzi dla planu dnia ────────────────────────────
  sugestie(data) {
    const dzien = Store.dzien(data);
    const rady = [];
    const nrList = dzien.bloki.map(b => b.nr);

    // 1. półprodukty — batching i mrożenie
    for (const pp of AB_ZASOBY.polprodukty) {
      const trafienia = pp.uzycie.filter(nr => nrList.includes(nr));
      if (trafienia.length) {
        rady.push({ typ: "mrozenie", tytul: pp.nazwa, tekst: pp.rada,
          detale: "Chłodzenie: " + pp.chlodzenie + " · Mrożenie: " + pp.mrozenie });
      }
    }

    // 2. serniki → dzień wcześniej
    const serniki = nrList.map(AB.receptura).filter(r => r && r.kategoria === "Serniki");
    if (serniki.length) {
      rady.push({ typ: "kolejnosc", tytul: "Serniki tężeją przez noc",
        tekst: "W planie: " + serniki.map(r => r.nazwa).join(", ") + ". Sernik pieczony dziś jest gotowy do sprzedaży JUTRO — " +
          "potrzebuje nocy w lodówce (karta produktu). Upewnij się, że pieczesz na jutrzejszą witrynę." });
    }

    // 3. wspólne okno smażenia
    const smazone = nrList.map(AB.receptura).filter(r => r && r.proces.piec === "smażone");
    if (smazone.length >= 2) {
      rady.push({ typ: "kolejnosc", tytul: "Jedno okno smażenia",
        tekst: smazone.map(r => r.nazwa).join(" i ") + " smażysz na tym samym tłuszczu 180–190°C — " +
          "zaplanuj jedno wspólne okno smażalnika zamiast dwóch nagrzewań (oszczędność ~20 min i frytury)." });
    }

    // 4. grupowanie temperatur pieca
    const tempy = {};
    for (const nr of nrList) {
      const r = AB.receptura(nr);
      const t = Czas.temperatura(r);
      if (t && r.proces.piec !== "smażone") (tempy[t] = tempy[t] || []).push(r.nazwa);
    }
    const zakresy = Object.keys(tempy).map(Number).sort((a, b) => a - b);
    if (zakresy.length >= 2 && zakresy[zakresy.length - 1] - zakresy[0] <= 15) {
      rady.push({ typ: "piec", tytul: "Prawie jedna temperatura",
        tekst: "Wypieki w zakresie " + zakresy[0] + "–" + zakresy[zakresy.length - 1] + "°C. " +
          "Rozważ wspólną temperaturę środkową i jeden ciąg wsadów — mniej czekania na zmianę temperatury." });
    }

    // 5. obciążenie zespołu / delegacja
    const zespol = Store.stan.ustawienia.zespol;
    const minAktywne = {};
    for (const b of dzien.bloki) {
      const akt = b.segmenty.filter(s => s.typ === "aktywny" || s.osobaAktywna).reduce((a, s) => a + (s.do - s.od), 0);
      minAktywne[b.osoba] = (minAktywne[b.osoba] || 0) + akt;
    }
    const szef = zespol.find(z => z.rola === "szef");
    if (szef) {
      const zmiana = AB.doMin(szef.do) - AB.doMin(szef.od);
      const obciazenie = minAktywne[szef.id] || 0;
      if (obciazenie > zmiana * 0.75) {
        rady.push({ typ: "delegacja", tytul: "Dzień Oliwii przeładowany",
          tekst: "Czynności aktywne: " + AB.min(obciazenie) + " przy zmianie " + AB.min(zmiana) +
            ". Oddaj pomocy naważki (10 min/recepturę), pudełka i owoce — z zakładki Zadania jednym dotknięciem." });
      }
    }

    // 6. reguły z bazy wiedzy dopasowane do produktów w planie
    const reguly = (window.AB_WIEDZA && AB_WIEDZA.reguly) || [];
    const kategorie = new Set(nrList.map(nr => (AB.receptura(nr) || {}).kategoria));
    for (const reg of reguly) {
      if (reg.kategoria === "mrozenie" || reg.kategoria === "chlodzenie") continue; // już pokryte wyżej
      const w = (reg.warunek || "").toLowerCase();
      const pasuje = [...kategorie].some(k => k && w.includes(k.toLowerCase().slice(0, 5))) ||
        nrList.some(nr => { const r = AB.receptura(nr); return r && w.includes(r.nazwa.toLowerCase().slice(0, 6)); });
      if (pasuje && rady.length < 10) {
        rady.push({ typ: reg.kategoria, tytul: "Ze złotych standardów", tekst: reg.rada, detale: "Źródło: " + reg.zrodlo });
      }
    }

    return rady;
  }
};
