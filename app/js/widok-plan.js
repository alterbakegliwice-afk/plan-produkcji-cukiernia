// WIDOK: Plan dnia — oś czasu z blokami produkcyjnymi, symulacja, sugestie
window.WidokPlan = {
  data: AB.dzisISO(),
  zaznaczony: null,

  render(el) {
    const dzien = Store.dzien(this.data);
    const ust = Store.stan.ustawienia;

    el.innerHTML = "";
    el.appendChild(AB.el(this._pasekDaty()));

    // podsumowanie dnia
    if (dzien.bloki.length) {
      let sztuk = 0, koszt = 0, aktywne = 0, niepelny = false;
      for (const b of dzien.bloki) {
        const r = AB.receptura(b.nr);
        if (!r) continue;
        sztuk += Czas.sztuki(r, b.partie);
        const k = Czas.koszt(b.nr, b.partie);
        if (k) { koszt += k.surowce; if (k.niepelny) niepelny = true; }
        aktywne += b.segmenty.filter(s => s.typ === "aktywny" || s.osobaAktywna).reduce((a, s) => a + s.do - s.od, 0);
      }
      el.appendChild(AB.el(
        '<div class="karta rzad maly"><span><b>' + dzien.bloki.length + '</b> produktów</span>' +
        '<span>· <b>~' + Math.round(sztuk) + '</b> ' + (window.AB_MODUL || {}).jednostkaWynik + '</span>' +
        '<span>· surowce <b>' + (niepelny ? "≥" : "") + AB.zl(koszt) + '</b>' +
        (niepelny ? ' <span title="brak części cen w cenniku">⚠</span>' : "") + "</span>" +
        '<span class="rozdziel wyciszony">ręce: ' + AB.min(aktywne) + '</span></div>'));
    }

    // oś czasu
    el.appendChild(this._osCzasu(dzien));

    // pasek akcji zaznaczonego bloku
    if (this.zaznaczony) {
      const b = dzien.bloki.find(x => x.id === this.zaznaczony);
      if (b) el.appendChild(this._akcjeBloku(b));
    }

    // przyciski główne — jedno działanie wiodące, reszta pod „Więcej"
    el.appendChild(AB.el(
      '<div class="rzad akcje-glowne" style="margin:12px 0">' +
      '<button class="btn btn-glowny" data-akcja="dodaj">+ Dodaj produkt</button>' +
      (dzien.bloki.length
        ? '<button class="btn" data-akcja="uloz">✨ Ułóż</button>' +
          '<button class="btn btn-ikona rozdziel" data-akcja="wiecej" aria-label="więcej działań">⋯</button>'
        : '<button class="btn" data-akcja="auto-plan">🤖 Auto-plan</button>') +
      "</div>"));

    // ostrzeżenia
    const symul = dzien.bloki.length ? this._sprawdz(dzien) : [];
    if (symul.length) {
      const box = AB.el("<div></div>");
      for (const o of symul) box.appendChild(AB.el('<div class="ostrzezenie">⚠️ ' + AB.esc(o.tekst) + "</div>"));
      el.appendChild(box);
    }

    // sugestie sous chefa
    const rady = Symulacja.sugestie(this.data);
    if (rady.length) {
      el.appendChild(AB.el('<div class="sekcja-tytul"><h2>💡 Podpowiedzi</h2><span class="wyciszony maly">na dziś</span></div>'));
      const box = AB.el("<div></div>");
      for (const rada of rady.slice(0, 6)) {
        box.appendChild(AB.el('<div class="sugestia"><b>' + AB.esc(rada.tytul) + "</b>" + AB.esc(rada.tekst) +
          (rada.detale ? '<div class="maly wyciszony">' + AB.esc(rada.detale) + "</div>" : "") + "</div>"));
      }
      el.appendChild(box);
    }

    if (!dzien.bloki.length) {
      el.appendChild(AB.el('<div class="pusto"><div class="duze">🥐</div><p>Pusty dzień. Dodaj produkty i dotknij „Ułóż dzień" — ' +
        "symulacja rozstawi bloki po piecach i godzinach.</p></div>"));
    }

    el.addEventListener("click", e => this._klik(e), { once: false });
  },

  _pasekDaty() {
    return '<div class="rzad" style="margin-bottom:10px">' +
      '<button class="btn btn-ikona" data-akcja="dzien-wstecz" aria-label="poprzedni dzień">‹</button>' +
      '<div style="text-align:center;flex:1"><b>' + AB.dataPL(this.data) + "</b>" +
      (this.data === AB.dzisISO() ? ' <span class="chip zielony">dziś</span>' : "") +
      '<div class="wyciszony maly">' + this.data + "</div></div>" +
      '<button class="btn btn-ikona" data-akcja="dzien-naprzod" aria-label="następny dzień">›</button></div>';
  },

  _osCzasu(dzien) {
    const ust = Store.stan.ustawienia;
    const od = AB.doMin(ust.dzienOd), do_ = AB.doMin(ust.dzienDo);
    const skala = 1; // 1 min = 1 px
    const szer = (do_ - od) * skala;

    let godziny = "";
    for (let t = od; t <= do_; t += 60) godziny += '<div style="flex-basis:' + 60 * skala + 'px">' + AB.zMin(t) + "</div>";

    const seg = (b, s, i) => {
      const lewo = (b.start + s.od - od) * skala, w = (s.do - s.od) * skala;
      if (lewo + w < 0 || lewo > szer) return "";
      const r = AB.receptura(b.nr);
      const tytul = r.nazwa + " — " + s.nazwa + " " + AB.zMin(b.start + s.od) + "–" + AB.zMin(b.start + s.do) +
        (s.temp ? " · " + s.temp + "°C" : "");
      return '<div class="blok-seg ' + s.typ + (b.id === this.zaznaczony ? " zaznaczony" : "") +
        '" style="left:' + Math.max(0, lewo) + "px;width:" + Math.max(24, w) + 'px" data-blok="' + b.id +
        '" title="' + AB.esc(tytul) + '">' + AB.esc(w > 56 ? s.nazwa : "") + "</div>";
    };

    let tory = "";
    for (const b of dzien.bloki) {
      tory += '<div class="os-tor"><span class="tor-nazwa">' + AB.esc((AB.receptura(b.nr) || {}).nazwa || b.nr).slice(0, 14) + "</span>" +
        b.segmenty.map((s, i) => seg(b, s, i)).join("") + "</div>";
    }

    // tory pieców — tylko używane
    for (const piec of AB_ZASOBY.piece) {
      const segPieca = [];
      for (const b of dzien.bloki)
        for (const s of b.segmenty)
          if (s.typ === "piec" && s.zasob === piec.id) segPieca.push(seg(b, s, -1));
      if (segPieca.length)
        tory += '<div class="os-tor" style="background:color-mix(in srgb, var(--zloto) 6%, transparent)">' +
          '<span class="tor-nazwa">🔥 ' + AB.esc(piec.nazwa.split(" ")[0]) + "</span>" + segPieca.join("") + "</div>";
    }

    // linia "teraz"
    let teraz = "";
    if (this.data === AB.dzisISO()) {
      const t = new Date(); const min = t.getHours() * 60 + t.getMinutes();
      if (min >= od && min <= do_) teraz = '<div class="linia-teraz" style="left:' + (min - od) * skala + 'px"></div>';
    }

    return AB.el('<div class="os-czasu"><div class="os-siatka" style="width:' + szer + 'px">' +
      '<div class="os-godziny">' + godziny + "</div>" + tory + teraz + "</div></div>");
  },

  _akcjeBloku(b) {
    const r = AB.receptura(b.nr);
    const rz = Czas.rozklad(b.nr, b.partie);
    const zespol = Store.stan.ustawienia.zespol;
    return AB.el('<div class="karta" style="margin-top:10px">' +
      '<div class="rzad"><b>' + AB.esc(r.nazwa) + "</b>" +
      '<span class="chip szary">' + b.partie + ((window.AB_MODUL || {}).skalowanie === "maka" ? " kg mąki" : " partii") +
      " · ~" + Czas.sztuki(r, b.partie) + " " + (window.AB_MODUL || {}).jednostkaWynik + "</span>" +
      '<span class="chip szary">' + AB.zMin(b.start) + "–" + AB.zMin(b.start + b.segmenty[b.segmenty.length - 1].do) + "</span></div>" +
      '<div class="rzad" style="margin-top:10px">' +
      '<button class="btn btn-maly" data-akcja="przesun" data-o="-15">−15 min</button>' +
      '<button class="btn btn-maly" data-akcja="przesun" data-o="15">+15 min</button>' +
      '<select data-akcja="zmien-osobe" style="width:auto;min-height:34px;padding:4px 8px">' +
      zespol.map(z => '<option value="' + z.id + '"' + (z.id === b.osoba ? " selected" : "") + ">" + AB.esc(z.nazwa) + "</option>").join("") +
      "</select>" +
      '<button class="btn btn-maly" data-akcja="otworz-recepture">Receptura</button>' +
      '<button class="btn btn-maly btn-cichy rozdziel" data-akcja="usun-blok" style="color:var(--blad)">Usuń</button>' +
      "</div></div>");
  },

  _sprawdz(dzien) {
    // walidacja kolizji istniejącego układu (po ręcznych przesunięciach)
    const ostrz = [];
    const piece = {};
    for (const b of dzien.bloki)
      for (const s of b.segmenty)
        if (s.typ === "piec") (piece[s.zasob] = piece[s.zasob] || []).push({ b, od: b.start + s.od, do: b.start + s.do, temp: s.temp });
    for (const [zasob, list] of Object.entries(piece)) {
      list.sort((a, x) => a.od - x.od);
      const nazwa = (AB_ZASOBY.piece.find(p => p.id === zasob) || {}).nazwa || zasob;
      for (let i = 1; i < list.length; i++) {
        if (list[i].od < list[i - 1].do) {
          ostrz.push({ tekst: nazwa + ": nakładają się wypieki " + AB.receptura(list[i - 1].b.nr).nazwa + " i " +
            AB.receptura(list[i].b.nr).nazwa + " (" + AB.zMin(list[i].od) + "). Przesuń jeden z bloków albo użyj „Ułóż dzień”." });
        }
        const opadajaca = (window.AB_MODUL || {}).skalowanie === "maka";
        if (list[i].temp && list[i - 1].temp) {
          if (opadajaca && list[i].temp > list[i - 1].temp + 20) {
            ostrz.push({ tekst: nazwa + " (pokładowy): temperatura ROŚNIE z " + list[i - 1].temp + "°C na " + list[i].temp +
              "°C — trzon wolno dogrzewa. Piecz profilem opadającym: najgorętsze chleby najpierw." });
          } else if (!opadajaca && list[i].temp < list[i - 1].temp - 20) {
            const rPoprz = AB.receptura(list[i - 1].b.nr);
            const przezFerm = rPoprz && ((rPoprz.proces.ferm_min || 0) + (rPoprz.proces.rozrost_min || 0) > 0);
            ostrz.push({ tekst: nazwa + ": temperatura spada z " + list[i - 1].temp + "°C na " + list[i].temp + "°C. " +
              (przezFerm
                ? "To cena wczesnego startu drożdżowych — dolicz 10–15 min na wystygnięcie pieca (drzwi uchylone)."
                : "Piec stygnie wolno — lepiej piec od najniższej do najwyższej temperatury.") });
          }
        }
      }
      const piecInfo = AB_ZASOBY.piece.find(p => p.id === zasob);
      if (piecInfo) for (const w of list)
        if (w.od < AB.doMin(piecInfo.dostepnyOd))
          ostrz.push({ tekst: nazwa + " dostępny od " + piecInfo.dostepnyOd + " — " + AB.receptura(w.b.nr).nazwa + " zaplanowany wcześniej." });
    }
    // kolizje osób (czynności aktywne + smażenie, które też angażuje ręce)
    const osoby = {};
    for (const b of dzien.bloki)
      for (const s of b.segmenty)
        if (s.typ === "aktywny" || s.osobaAktywna) (osoby[b.osoba] = osoby[b.osoba] || []).push({ b, od: b.start + s.od, do: b.start + s.do });
    for (const [id, list] of Object.entries(osoby)) {
      list.sort((a, x) => a.od - x.od);
      const os = Store.stan.ustawienia.zespol.find(z => z.id === id);
      for (let i = 1; i < list.length; i++)
        if (list[i].od < list[i - 1].do)
          ostrz.push({ tekst: (os ? os.nazwa : id) + " ma dwie czynności naraz o " + AB.zMin(list[i].od) + " (" +
            AB.receptura(list[i - 1].b.nr).nazwa + " + " + AB.receptura(list[i].b.nr).nazwa + ")." });
    }
    return ostrz;
  },

  _klik(e) {
    const cel = e.target.closest("[data-akcja],[data-blok]");
    if (!cel) return;
    const dzien = Store.dzien(this.data);
    const akcja = cel.dataset.akcja;

    if (cel.dataset.blok && !akcja) {
      this.zaznaczony = this.zaznaczony === cel.dataset.blok ? null : cel.dataset.blok;
      App.render(); return;
    }
    if (akcja === "dzien-wstecz") { this.data = AB.przesunDate(this.data, -1); this.zaznaczony = null; App.render(); }
    if (akcja === "dzien-naprzod") { this.data = AB.przesunDate(this.data, 1); this.zaznaczony = null; App.render(); }
    if (akcja === "dodaj") this._modalDodaj();
    if (akcja === "wiecej") this._menuWiecej();
    if (akcja === "uloz") this._ulozDzien();
    if (akcja === "karta-dnia") this._modalKartaDnia();
    if (akcja === "auto-plan") this._autoPlan();
    if (akcja === "odprawa-d1") this._modalOdprawa();
    if (akcja === "zadania-z-planu") {
      const n = Automat.generujZadania(this.data);
      AB.toast(n ? "Utworzono " + n + " zadań z planu ✓" : "Nic nowego do dodania");
      App.render();
    }
    if (akcja === "wyczysc-dzien") {
      AB.potwierdz("Usunąć wszystkie bloki z tego dnia?").then(t => {
        if (t) { dzien.bloki = []; this.zaznaczony = null; Store.zapisz(); App.render(); }
      });
    }

    const b = dzien.bloki.find(x => x.id === this.zaznaczony);
    if (!b) return;
    if (akcja === "przesun") { b.start += Number(cel.dataset.o); Store.zapisz(); App.render(); }
    if (akcja === "usun-blok") { dzien.bloki = dzien.bloki.filter(x => x !== b); this.zaznaczony = null; Store.zapisz(); App.render(); }
    if (akcja === "otworz-recepture") { WidokReceptury.otwarta = b.nr; App.idz("receptury"); }
    if (akcja === "zmien-osobe" && cel.tagName === "SELECT") { /* obsługa w change */ }
  },

  // Menu „Więcej" — rzadsze działania dnia w jednym arkuszu, żeby plan był czysty
  _menuWiecej() {
    const poz = [
      { a: "auto-plan", ikona: "🤖", tytul: "Auto-plan", opis: "Zaproponuj produkty na dziś" },
      { a: "odprawa-d1", ikona: "🌙", tytul: "Odprawa D-1", opis: "Co przygotować dzień wcześniej" },
      { a: "zadania-z-planu", ikona: "✅", tytul: "Zadania z planu", opis: "Utwórz listę zadań brygady" },
      { a: "karta-dnia", ikona: "🖨", tytul: "Karta dnia", opis: "Wydruk dla brygady: harmonogram + naważki" },
      { a: "wyczysc-dzien", ikona: "🗑", tytul: "Wyczyść dzień", opis: "Usuń wszystkie bloki", blad: true }
    ];
    const m = AB.el('<div class="modal-tlo"><div class="modal"><h2>Więcej działań</h2>' +
      '<div class="menu-lista">' + poz.map(p =>
        '<button class="menu-poz' + (p.blad ? " blad" : "") + '" data-akcja="' + p.a + '">' +
        '<span class="menu-ikona">' + p.ikona + "</span>" +
        '<span class="menu-tekst"><b>' + AB.esc(p.tytul) + "</b>" +
        '<span class="wyciszony maly">' + AB.esc(p.opis) + "</span></span></button>").join("") + "</div>" +
      '<div class="modal-akcje"><button class="btn btn-glowny" data-a="x">Zamknij</button></div></div></div>');
    m.addEventListener("click", e => {
      if (e.target.dataset.a === "x" || e.target === m) { m.remove(); return; }
      const poz = e.target.closest("[data-akcja]");
      if (!poz) return;
      m.remove();
      const a = poz.dataset.akcja;
      if (a === "auto-plan") this._autoPlan();
      else if (a === "odprawa-d1") this._modalOdprawa();
      else if (a === "karta-dnia") this._modalKartaDnia();
      else if (a === "zadania-z-planu") {
        const n = Automat.generujZadania(this.data);
        AB.toast(n ? "Utworzono " + n + " zadań z planu ✓" : "Nic nowego do dodania");
        App.render();
      } else if (a === "wyczysc-dzien") {
        AB.potwierdz("Usunąć wszystkie bloki z tego dnia?").then(t => {
          if (t) { const d = Store.dzien(this.data); d.bloki = []; this.zaznaczony = null; Store.zapisz(); App.render(); }
        });
      }
    });
    document.body.appendChild(m);
  },

  // Odprawa D-1 — co przygotować dzień wcześniej (retard, zaczyny, serniki…)
  _modalOdprawa() {
    const punkty = Automat.odprawaD1(this.data);
    const wczoraj = AB.dataPL(AB.przesunDate(this.data, -1));
    const m = AB.el('<div class="modal-tlo"><div class="modal"><h2>🌙 Odprawa D-1 — na plan ' + AB.dataPL(this.data) + "</h2>" +
      '<p class="maly wyciszony">Co zrobić <b>wieczorem dzień wcześniej</b> (' + wczoraj + "), żeby rano ruszyć bez presji. Oś dnia tego nie pokazuje — a tu jest.</p>" +
      (punkty.length ? punkty.map(p => '<div class="sugestia"><b>' + AB.esc(p.tytul) + "</b>" + AB.esc(p.tekst) + "</div>").join("")
        : '<p class="wyciszony">Brak przygotowań z wyprzedzeniem.</p>') +
      '<div class="modal-akcje"><button class="btn" data-a="drukuj">🖨 Drukuj</button>' +
      '<button class="btn btn-glowny" data-a="x">Zamknij</button></div></div></div>');
    m.addEventListener("click", e => {
      if (e.target.dataset.a === "x" || e.target === m) m.remove();
      if (e.target.dataset.a === "drukuj") window.print();
    });
    document.body.appendChild(m);
  },

  // KARTA DNIA — drukowalna kartka dla brygady: harmonogram + zbiorcze naważki.
  // Rozwiązuje "jedno urządzenie": rano piekarz/pomoc czyta kartkę bez apki.
  _modalKartaDnia() {
    const dzien = Store.dzien(this.data);
    const M = window.AB_MODUL || {};
    const bloki = [...dzien.bloki].sort((a, b) => a.start - b.start);
    const zesp = {};
    Store.stan.ustawienia.zespol.forEach(z => zesp[z.id] = z.nazwa);

    // harmonogram
    const wierszePlan = bloki.map(b => {
      const r = AB.receptura(b.nr);
      const piecSeg = b.segmenty.find(s => s.typ === "piec");
      const t = Czas.temperatura(r);
      return "<tr><td>" + AB.zMin(b.start) + '</td><td>' + AB.esc(r ? r.nazwa : b.nr) + "</td>" +
        '<td class="liczba">' + b.partie + (M.skalowanie === "maka" ? " kg" : "×") + "</td>" +
        "<td>" + AB.esc(zesp[b.osoba] || b.osoba) + "</td>" +
        '<td class="liczba">' + (piecSeg ? AB.zMin(b.start + piecSeg.od) + (t ? " · " + t + "°C" : "") : "—") + "</td></tr>";
    }).join("");

    // zbiorcze naważki
    const suma = {};
    for (const b of bloki) {
      const r = AB.receptura(b.nr);
      if (!r || r.tylko_proces) continue;
      for (const n of Czas.nawazki(b.nr, b.partie)) suma[n.nazwa] = (suma[n.nazwa] || 0) + n.ilosc;
    }
    const wierszeNaw = Object.entries(suma).sort((a, b) => b[1] - a[1])
      .map(w => "<tr><td>" + AB.esc(w[0]) + '</td><td class="liczba"><b>' + AB.g(w[1]) + "</b></td></tr>").join("");

    const m = AB.el('<div class="modal-tlo"><div class="modal"><h2>🖨 Karta dnia — ' + AB.dataPL(this.data) + " · " + (M.nazwa || "") + "</h2>" +
      (bloki.length ? '<h3>Harmonogram</h3><div class="przewijalna"><table class="tabela">' +
        "<tr><th>Start</th><th>Produkt</th><th>Ilość</th><th>Kto</th><th>Piec</th></tr>" + wierszePlan + "</table></div>" +
        (wierszeNaw ? '<h3 style="margin-top:12px">Naważki zbiorcze</h3><table class="tabela">' + wierszeNaw + "</table>" : "")
        : '<p class="wyciszony">Pusty plan.</p>') +
      '<div class="modal-akcje"><button class="btn" data-a="drukuj">🖨 Drukuj</button>' +
      '<button class="btn btn-glowny" data-a="x">Zamknij</button></div></div></div>');
    m.addEventListener("click", e => {
      if (e.target.dataset.a === "x" || e.target === m) m.remove();
      if (e.target.dataset.a === "drukuj") window.print();
    });
    document.body.appendChild(m);
  },

  // zbiorcza lista naważek/zakupów z całego dnia — suma składników po wszystkich blokach
  _modalNawazkiDnia() {
    const dzien = Store.dzien(this.data);
    const suma = {}; // nazwa -> gramy
    const bezReceptury = [];
    for (const b of dzien.bloki) {
      const r = AB.receptura(b.nr);
      if (!r) continue;
      if (r.tylko_proces) { bezReceptury.push(r.nazwa); continue; }
      for (const n of Czas.nawazki(b.nr, b.partie)) suma[n.nazwa] = (suma[n.nazwa] || 0) + n.ilosc;
    }
    const wiersze = Object.entries(suma).sort((a, b) => b[1] - a[1]);
    const m = AB.el('<div class="modal-tlo"><div class="modal"><h2>🧾 Naważki dnia — ' + AB.dataPL(this.data) + "</h2>" +
      '<p class="maly wyciszony">Suma składników ze wszystkich bloków. Wydrukuj albo przekaż pomocy jako listę naważek/zakupów.</p>' +
      (wiersze.length ? '<table class="tabela">' + wiersze.map(w =>
        "<tr><td>" + AB.esc(w[0]) + '</td><td class="liczba"><b>' + AB.g(w[1]) + "</b></td></tr>").join("") + "</table>"
        : '<p class="wyciszony">Brak składników w planie.</p>') +
      (bezReceptury.length ? '<p class="maly wyciszony" style="margin-top:8px">Pominięte (brak receptury w XLSX): ' + AB.esc(bezReceptury.join(", ")) + "</p>" : "") +
      '<div class="modal-akcje"><button class="btn" data-a="drukuj">🖨 Drukuj</button>' +
      '<button class="btn btn-glowny" data-a="x">Zamknij</button></div></div></div>');
    m.addEventListener("click", e => {
      if (e.target.dataset.a === "x" || e.target === m) m.remove();
      if (e.target.dataset.a === "drukuj") window.print();
    });
    document.body.appendChild(m);
  },

  _modalDodaj() {
    const opcje = AB_RECEPTURY.map(r =>
      '<option value="' + r.nr + '">' + r.nr + " · " + AB.esc(r.nazwa) +
      (r.tylko_proces ? " (bez receptury)" : "") + "</option>").join("");
    const zespol = Store.stan.ustawienia.zespol;
    const M = window.AB_MODUL;
    const m = AB.el('<div class="modal-tlo"><div class="modal">' +
      "<h2>Dodaj produkt do planu</h2>" +
      '<label class="pole"><span>Produkt</span><select id="md-nr">' + opcje + "</select></label>" +
      '<label class="pole"><span>' + (M.skalowanie === "maka" ? "Ilość (kg mąki)" : "Liczba partii") + '</span><div class="stepper">' +
      '<button type="button" data-s="-1">−</button><span class="wartosc" id="md-partie">' + M.minIlosc + (M.skalowanie === "maka" ? " kg" : "") +
      '</span><button type="button" data-s="1">+</button>' +
      "</div></label>" +
      '<label class="pole"><span>Kto prowadzi</span><select id="md-osoba">' +
      zespol.map(z => '<option value="' + z.id + '">' + AB.esc(z.nazwa) + (z.rola === "szef" ? " (szef)" : " (pomoc)") + "</option>").join("") +
      "</select></label>" +
      '<p class="maly wyciszony" id="md-info"></p>' +
      '<div class="modal-akcje"><button class="btn btn-cichy" data-a="anuluj">Anuluj</button>' +
      '<button class="btn btn-glowny" data-a="dodaj">Dodaj</button></div></div></div>');

    let partie = M.minIlosc;
    const info = () => {
      const nr = m.querySelector("#md-nr").value;
      const rz = Czas.rozklad(nr, partie);
      const r = AB.receptura(nr);
      m.querySelector("#md-info").textContent = rz ?
        "≈ " + Czas.sztuki(r, partie) + " " + M.jednostkaWynik + " · ręce " + AB.min(rz.aktywny) +
        (rz.piec ? " · piec " + AB.min(rz.piec) + " (" + rz.wsady + " wsad.)" : "") +
        " · razem " + AB.min(rz.total) : "";
    };
    info();
    m.addEventListener("click", e => {
      if (e.target.dataset.s) {
        partie = Math.min(M.maxIlosc, Math.max(M.minIlosc, partie + Number(e.target.dataset.s) * M.krokIlosc));
        m.querySelector("#md-partie").textContent = partie + (M.skalowanie === "maka" ? " kg" : ""); info();
      }
      if (e.target.dataset.a === "anuluj" || e.target === m) m.remove();
      if (e.target.dataset.a === "dodaj") {
        const nr = m.querySelector("#md-nr").value;
        const osoba = m.querySelector("#md-osoba").value;
        this._dodajBlok(nr, partie, osoba);
        m.remove();
      }
    });
    m.querySelector("#md-nr").addEventListener("change", info);
    document.body.appendChild(m);
  },

  _dodajBlok(nr, partie, osoba) {
    const dzien = Store.dzien(this.data);
    // dostaw blok na koniec — najwcześniejszy niekonfliktowy start znajdzie "Ułóż dzień";
    // tu wstawiamy po ostatnim bloku tej osoby albo na początek dnia
    const ust = Store.stan.ustawienia;
    const seg = Symulacja.segmenty(nr, partie);
    let start = AB.doMin(ust.dzienOd);
    for (const b of dzien.bloki) if (b.osoba === osoba) start = Math.max(start, b.start + 30);
    dzien.bloki.push({ id: AB.uid(), nr, partie, osoba, start, segmenty: seg });
    Store.zapisz();
    AB.toast("Dodano. Dotknij „Ułóż dzień”, by rozstawić bez kolizji.");
    App.render();
  },

  async _autoPlan() {
    const dzien = Store.dzien(this.data);
    if (dzien.bloki.length && !(await AB.potwierdz("Zastąpić bieżący plan auto-propozycją (z Twoich nawyków i sezonu)?"))) return;
    const wynik = Automat.ulozAutomat(this.data, 4);
    this.zaznaczony = null;
    if (!wynik.produkty.length) { AB.toast("Brak receptur do zaplanowania"); return; }
    AB.toast("Auto-plan: " + wynik.produkty.map(r => r.nazwa.split(" ")[0]).join(", ") + " — skoryguj ilości");
    App.render();
  },

  _ulozDzien() {
    const dzien = Store.dzien(this.data);
    if (!dzien.bloki.length) { AB.toast("Najpierw dodaj produkty"); return; }
    const pozycje = dzien.bloki.map(b => ({ nr: b.nr, partie: b.partie, osoba: b.osoba }));
    const wynik = Symulacja.uloz(pozycje);
    dzien.bloki = wynik.bloki;
    this.zaznaczony = null;
    Store.zapisz();
    AB.toast(wynik.ostrzezenia.length ? "Ułożono — sprawdź ostrzeżenia" : "Dzień ułożony ✓");
    App.render();
  },

  // zmiana osoby bloku (delegowana z change globalnego)
  zmienOsobe(idBloku, osoba) {
    const dzien = Store.dzien(this.data);
    const b = dzien.bloki.find(x => x.id === idBloku);
    if (b) { b.osoba = osoba; Store.zapisz(); App.render(); }
  }
};
