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
      let porcje = 0, koszt = 0, aktywne = 0;
      for (const b of dzien.bloki) {
        const r = AB.receptura(b.nr);
        if (!r) continue;
        porcje += (r.porcje_partia || 1) * b.partie;
        const k = Czas.koszt(b.nr, b.partie);
        if (k) koszt += k.surowce;
        aktywne += b.segmenty.filter(s => s.typ === "aktywny").reduce((a, s) => a + s.do - s.od, 0);
      }
      el.appendChild(AB.el(
        '<div class="karta rzad maly"><span><b>' + dzien.bloki.length + '</b> produktów</span>' +
        '<span>· <b>~' + Math.round(porcje) + '</b> porcji</span>' +
        '<span>· surowce <b>' + AB.zl(koszt) + '</b></span>' +
        '<span class="rozdziel wyciszony">ręce: ' + AB.min(aktywne) + '</span></div>'));
    }

    // oś czasu
    el.appendChild(this._osCzasu(dzien));

    // pasek akcji zaznaczonego bloku
    if (this.zaznaczony) {
      const b = dzien.bloki.find(x => x.id === this.zaznaczony);
      if (b) el.appendChild(this._akcjeBloku(b));
    }

    // przyciski główne
    el.appendChild(AB.el(
      '<div class="rzad" style="margin:10px 0">' +
      '<button class="btn btn-glowny" data-akcja="dodaj">+ Dodaj produkt</button>' +
      '<button class="btn" data-akcja="uloz">✨ Ułóż dzień</button>' +
      (dzien.bloki.length ? '<button class="btn btn-cichy rozdziel" data-akcja="wyczysc-dzien">Wyczyść</button>' : "") +
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
        '" style="left:' + Math.max(0, lewo) + "px;width:" + Math.max(14, w) + 'px" data-blok="' + b.id +
        '" title="' + AB.esc(tytul) + '">' + (i === 0 ? AB.esc(r.nazwa.slice(0, 18)) + " " : "") + AB.esc(w > 70 ? s.nazwa : "") + "</div>";
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
      '<span class="chip szary">' + b.partie + " partii · ~" + Math.round((r.porcje_partia || 1) * b.partie) + " porcji</span>" +
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
        if (list[i].temp && list[i - 1].temp && list[i].temp < list[i - 1].temp - 20) {
          ostrz.push({ tekst: nazwa + ": temperatura spada z " + list[i - 1].temp + "°C na " + list[i].temp +
            "°C — piec stygnie wolno. Lepiej piec od najniższej do najwyższej temperatury." });
        }
      }
      const piecInfo = AB_ZASOBY.piece.find(p => p.id === zasob);
      if (piecInfo) for (const w of list)
        if (w.od < AB.doMin(piecInfo.dostepnyOd))
          ostrz.push({ tekst: nazwa + " dostępny od " + piecInfo.dostepnyOd + " — " + AB.receptura(w.b.nr).nazwa + " zaplanowany wcześniej." });
    }
    // kolizje osób
    const osoby = {};
    for (const b of dzien.bloki)
      for (const s of b.segmenty)
        if (s.typ === "aktywny") (osoby[b.osoba] = osoby[b.osoba] || []).push({ b, od: b.start + s.od, do: b.start + s.do });
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
    if (akcja === "uloz") this._ulozDzien();
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

  _modalDodaj() {
    const opcje = AB_RECEPTURY.map(r =>
      '<option value="' + r.nr + '">' + r.nr + " · " + AB.esc(r.nazwa) +
      (r.tylko_proces ? " (bez receptury)" : "") + "</option>").join("");
    const zespol = Store.stan.ustawienia.zespol;
    const m = AB.el('<div class="modal-tlo"><div class="modal">' +
      "<h2>Dodaj produkt do planu</h2>" +
      '<label class="pole"><span>Produkt</span><select id="md-nr">' + opcje + "</select></label>" +
      '<label class="pole"><span>Liczba partii</span><div class="stepper">' +
      '<button type="button" data-s="-1">−</button><span class="wartosc" id="md-partie">1</span><button type="button" data-s="1">+</button>' +
      "</div></label>" +
      '<label class="pole"><span>Kto prowadzi</span><select id="md-osoba">' +
      zespol.map(z => '<option value="' + z.id + '">' + AB.esc(z.nazwa) + (z.rola === "szef" ? " (szef)" : " (pomoc)") + "</option>").join("") +
      "</select></label>" +
      '<p class="maly wyciszony" id="md-info"></p>' +
      '<div class="modal-akcje"><button class="btn btn-cichy" data-a="anuluj">Anuluj</button>' +
      '<button class="btn btn-glowny" data-a="dodaj">Dodaj</button></div></div></div>');

    let partie = 1;
    const info = () => {
      const nr = m.querySelector("#md-nr").value;
      const rz = Czas.rozklad(nr, partie);
      const r = AB.receptura(nr);
      m.querySelector("#md-info").textContent = rz ?
        "≈ " + Math.round((r.porcje_partia || 1) * partie) + " porcji · ręce " + AB.min(rz.aktywny) +
        (rz.piec ? " · piec " + AB.min(rz.piec) + " (" + rz.wsady + " wsad.)" : "") +
        " · razem " + AB.min(rz.total) : "";
    };
    info();
    m.addEventListener("click", e => {
      if (e.target.dataset.s) {
        partie = Math.min(12, Math.max(1, partie + Number(e.target.dataset.s)));
        m.querySelector("#md-partie").textContent = partie; info();
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
