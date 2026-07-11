// WIDOK: Zadania — delegowanie (Oliwia / Julia / Natalia), szablony, obciążenie
window.WidokZadania = {
  data: AB.dzisISO(),

  render(el) {
    const zespol = Store.stan.ustawienia.zespol;
    const zadania = Store.stan.zadania.filter(z => z.data === this.data);

    let html = '<div class="rzad" style="margin-bottom:10px">' +
      '<button class="btn btn-ikona" data-akcja="wstecz">‹</button>' +
      '<div style="text-align:center;flex:1"><b>' + AB.dataPL(this.data) + "</b>" +
      '<div class="wyciszony maly">zadania zespołu</div></div>' +
      '<button class="btn btn-ikona" data-akcja="naprzod">›</button></div>';

    html += '<div class="rzad" style="margin-bottom:12px">' +
      '<button class="btn btn-glowny" data-akcja="szablon">+ Z szablonu</button>' +
      '<button class="btn" data-akcja="wlasne">+ Własne</button></div>';

    for (const os of zespol) {
      const moje = zadania.filter(z => z.osoba === os.id);
      const otwarteMin = moje.filter(z => z.status !== "zrobione").reduce((a, z) => a + (z.czas_min || 0), 0);
      const zmiana = AB.doMin(os.do) - AB.doMin(os.od);
      html += '<div class="karta osoba-kol ' + (os.rola === "pomoc" ? "pomoc" : "") + '">' +
        '<div class="rzad"><b>' + AB.esc(os.nazwa) + "</b>" +
        '<span class="chip ' + (os.rola === "szef" ? "" : "zloty") + '">' + (os.rola === "szef" ? "szef" : "pomoc") + "</span>" +
        '<span class="rozdziel wyciszony maly">' + os.od + "–" + os.do +
        (otwarteMin ? " · do zrobienia " + AB.min(otwarteMin) : "") + "</span></div>";
      if (otwarteMin > zmiana * 0.8)
        html += '<div class="ostrzezenie">⚠️ Przeciążenie: ' + AB.min(otwarteMin) + " zadań przy zmianie " + AB.min(zmiana) + ".</div>";
      if (!moje.length) html += '<p class="wyciszony maly" style="margin:8px 0 0">Brak zadań.</p>';
      for (const z of moje) {
        html += '<div class="zadanie ' + (z.status === "zrobione" ? "zrobione" : "") + '">' +
          '<input type="checkbox" data-zadanie="' + z.id + '" ' + (z.status === "zrobione" ? "checked" : "") + ">" +
          '<div class="tresc" style="flex:1"><div>' + AB.esc(z.tytul) + "</div>" +
          '<div class="wyciszony maly">' + (z.czas_min ? "~" + AB.min(z.czas_min) : "") +
          (z.zrodlo ? " · " + AB.esc(z.zrodlo) : "") + "</div></div>" +
          '<button class="btn btn-maly btn-cichy" data-przenies="' + z.id + '" title="przenieś do innej osoby">⇄</button>' +
          '<button class="btn btn-maly btn-cichy" data-usun="' + z.id + '" style="color:var(--blad)">✕</button></div>';
      }
      html += "</div>";
    }

    html += '<p class="wyciszony maly" style="margin-top:4px">Zasada delegacji ze złotych standardów: osąd zmysłowy (ciasta, kremy, piec) ' +
      "zostaje przy szefie; czynności powtarzalne wg checklisty (naważki, pudełka, mycie, owoce) oddaje się pomocy od pierwszego dnia.</p>";

    el.innerHTML = html;
    el.addEventListener("click", e => this._klik(e));
    el.addEventListener("change", e => {
      const id = e.target.dataset.zadanie;
      if (id) {
        const z = Store.stan.zadania.find(x => x.id === id);
        if (z) { z.status = e.target.checked ? "zrobione" : "otwarte"; Store.zapisz(); App.render(); }
      }
    });
  },

  _klik(e) {
    const cel = e.target.closest("[data-akcja],[data-usun],[data-przenies]");
    if (!cel) return;
    if (cel.dataset.usun) {
      Store.stan.zadania = Store.stan.zadania.filter(z => z.id !== cel.dataset.usun);
      Store.zapisz(); App.render(); return;
    }
    if (cel.dataset.przenies) return this._modalPrzenies(cel.dataset.przenies);
    const a = cel.dataset.akcja;
    if (a === "wstecz") { this.data = AB.przesunDate(this.data, -1); App.render(); }
    if (a === "naprzod") { this.data = AB.przesunDate(this.data, 1); App.render(); }
    if (a === "szablon") this._modalSzablon();
    if (a === "wlasne") this._modalWlasne();
  },

  _modalPrzenies(id) {
    const z = Store.stan.zadania.find(x => x.id === id);
    if (!z) return;
    const zespol = Store.stan.ustawienia.zespol;
    const m = AB.el('<div class="modal-tlo"><div class="modal"><h2>Przenieś zadanie</h2>' +
      "<p class=\"maly\">" + AB.esc(z.tytul) + "</p>" +
      zespol.map(os => '<button class="btn" style="width:100%;margin:4px 0" data-os="' + os.id + '">' +
        AB.esc(os.nazwa) + (os.id === z.osoba ? " (obecnie)" : "") + "</button>").join("") +
      '<div class="modal-akcje"><button class="btn btn-cichy" data-a="x">Anuluj</button></div></div></div>');
    m.addEventListener("click", e => {
      if (e.target.dataset.os) { z.osoba = e.target.dataset.os; Store.zapisz(); m.remove(); App.render(); }
      if (e.target.dataset.a === "x" || e.target === m) m.remove();
    });
    document.body.appendChild(m);
  },

  _modalSzablon() {
    const pomoc = Store.stan.ustawienia.zespol.filter(z => z.rola === "pomoc");
    const domyslna = pomoc[0] ? pomoc[0].id : "oliwia";
    const m = AB.el('<div class="modal-tlo"><div class="modal"><h2>Szybkie zadania</h2>' +
      '<label class="pole"><span>Dla kogo</span><select id="sz-osoba">' +
      Store.stan.ustawienia.zespol.map(os => '<option value="' + os.id + '"' + (os.id === domyslna ? " selected" : "") + ">" +
        AB.esc(os.nazwa) + "</option>").join("") + "</select></label>" +
      AB_ZASOBY.szablonyZadan.map(s =>
        '<button class="btn" style="width:100%;margin:3px 0;text-align:left" data-sz="' + s.id + '">' +
        "<b>" + AB.esc(s.tytul) + "</b><br><span class=\"wyciszony maly\">~" + s.czas_min + " min " + AB.esc(s.jednostka) + " · " +
        AB.esc(s.opis) + "</span></button>").join("") +
      '<div class="modal-akcje"><button class="btn btn-cichy" data-a="x">Zamknij</button></div></div></div>');
    m.addEventListener("click", e => {
      const sz = e.target.closest("[data-sz]");
      if (sz) {
        const s = AB_ZASOBY.szablonyZadan.find(x => x.id === sz.dataset.sz);
        Store.stan.zadania.push({
          id: AB.uid(), tytul: s.tytul, osoba: m.querySelector("#sz-osoba").value,
          data: this.data, czas_min: s.czas_min, status: "otwarte", typ: s.id
        });
        Store.zapisz(); AB.toast("Dodano: " + s.tytul);
      }
      if (e.target.dataset.a === "x" || e.target === m) { m.remove(); App.render(); }
    });
    document.body.appendChild(m);
  },

  _modalWlasne() {
    const m = AB.el('<div class="modal-tlo"><div class="modal"><h2>Nowe zadanie</h2>' +
      '<label class="pole"><span>Co zrobić</span><input id="wl-tytul" placeholder="np. Odebrać dostawę pistacji"></label>' +
      '<label class="pole"><span>Dla kogo</span><select id="wl-osoba">' +
      Store.stan.ustawienia.zespol.map(os => '<option value="' + os.id + '">' + AB.esc(os.nazwa) + "</option>").join("") +
      "</select></label>" +
      '<label class="pole"><span>Szacowany czas (min)</span><input type="number" id="wl-czas" value="15" min="1"></label>' +
      '<div class="modal-akcje"><button class="btn btn-cichy" data-a="x">Anuluj</button>' +
      '<button class="btn btn-glowny" data-a="ok">Dodaj</button></div></div></div>');
    m.addEventListener("click", e => {
      if (e.target.dataset.a === "x" || e.target === m) m.remove();
      if (e.target.dataset.a === "ok") {
        const tytul = m.querySelector("#wl-tytul").value.trim();
        if (!tytul) { AB.toast("Wpisz treść zadania", "blad"); return; }
        Store.stan.zadania.push({
          id: AB.uid(), tytul, osoba: m.querySelector("#wl-osoba").value,
          data: this.data, czas_min: Number(m.querySelector("#wl-czas").value) || 0, status: "otwarte", typ: "wlasne"
        });
        Store.zapisz(); m.remove(); App.render();
      }
    });
    document.body.appendChild(m);
  }
};
