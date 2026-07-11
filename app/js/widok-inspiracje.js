// WIDOK: Inspiracje — skrzynka pomysłów i pipeline eksperymentów
// Ścieżka: pomysł → eksperyment (plan) → test (1 blacha) → ocena → wdrożone / odrzucone
window.WidokInspiracje = {
  ETAPY: [
    { id: "pomysl", nazwa: "Pomysły" },
    { id: "eksperyment", nazwa: "Zaplanowane" },
    { id: "test", nazwa: "W teście" },
    { id: "ocena", nazwa: "Ocena" },
    { id: "wdrozone", nazwa: "Wdrożone" },
    { id: "odrzucone", nazwa: "Odrzucone" }
  ],
  etap: "pomysl",

  render(el) {
    const insp = Store.stan.inspiracje;

    let html = '<div class="karta"><h2>💭 Wrzuć inspirację</h2>' +
      '<textarea id="in-tekst" placeholder="Np. widziałam u @cedricgrolet tartę pistacja-malina… / klientka pytała o wegańskie brownie…"></textarea>' +
      '<div class="rzad" style="margin-top:8px"><button class="btn btn-glowny" data-akcja="dodaj">Zapisz pomysł</button>' +
      '<span class="wyciszony maly rozdziel">' + insp.length + " w bazie</span></div></div>";

    // pasek etapów
    html += '<div class="pipeline">' + this.ETAPY.map(e => {
      const n = insp.filter(i => i.status === e.id).length;
      return '<button class="etap ' + (this.etap === e.id ? "aktywny" : "") + '" data-etap="' + e.id + '">' +
        e.nazwa + (n ? " · " + n : "") + "</button>";
    }).join("") + "</div>";

    const lista = insp.filter(i => i.status === this.etap).sort((a, b) => (b.dataDodania || "").localeCompare(a.dataDodania || ""));
    if (!lista.length) html += '<div class="pusto"><div class="duze">✨</div><p>Nic tu jeszcze nie ma.</p></div>';

    for (const i of lista) {
      const e = i.eksperyment || {};
      html += '<div class="karta"><p style="margin:0"><b>' + AB.esc(i.tekst) + "</b></p>" +
        '<div class="wyciszony maly">' + AB.esc(i.dataDodania || "") + "</div>";
      if (i.status !== "pomysl") {
        html += '<table class="tabela" style="margin-top:8px">' +
          (e.hipoteza ? "<tr><td>Hipoteza</td><td>" + AB.esc(e.hipoteza) + "</td></tr>" : "") +
          (e.test ? "<tr><td>Test</td><td>" + AB.esc(e.test) + "</td></tr>" : "") +
          (e.kryteria ? "<tr><td>Kryteria</td><td>" + AB.esc(e.kryteria) + "</td></tr>" : "") +
          (e.wynik ? "<tr><td>Wynik</td><td>" + AB.esc(e.wynik) + "</td></tr>" : "") + "</table>";
      }
      html += '<div class="rzad" style="margin-top:10px">';
      if (i.status === "pomysl")
        html += '<button class="btn btn-maly btn-glowny" data-plan="' + i.id + '">📋 Zaplanuj eksperyment</button>';
      if (i.status === "eksperyment")
        html += '<button class="btn btn-maly btn-glowny" data-start="' + i.id + '">▶ Start testu</button>' +
          '<button class="btn btn-maly" data-plan="' + i.id + '">✎ Edytuj plan</button>';
      if (i.status === "test")
        html += '<button class="btn btn-maly btn-glowny" data-ocen="' + i.id + '">✓ Wpisz wynik</button>';
      if (i.status === "ocena")
        html += '<button class="btn btn-maly btn-glowny" data-status="wdrozone" data-id="' + i.id + '">🏆 Wdrażamy</button>' +
          '<button class="btn btn-maly" data-status="odrzucone" data-id="' + i.id + '">✕ Odrzucamy</button>';
      if (i.status === "wdrozone")
        html += '<span class="chip zielony">w karcie produktów — pamiętaj o recepturze w XLSX</span>';
      html += '<button class="btn btn-maly btn-cichy rozdziel" data-usun="' + i.id + '" style="color:var(--blad)">✕</button></div></div>';
    }

    // podpowiedź sezonowa przy planowaniu eksperymentów
    const sezon = (window.AB_WIEDZA && AB_WIEDZA.sezon || []).find(s => s.miesiac === new Date().getMonth() + 1);
    if (sezon) {
      html += '<div class="sugestia"><b>Sezon podpowiada (' + AB.esc(sezon.nazwa) + ")</b>" +
        "Surowce: " + AB.esc((sezon.surowce || []).join(", ")) + ". " + AB.esc(sezon.planowanie || "") + "</div>";
    }

    el.innerHTML = html;
    el.addEventListener("click", e => this._klik(e));
  },

  _klik(e) {
    const insp = Store.stan.inspiracje;
    const cel = e.target.closest("[data-akcja],[data-etap],[data-plan],[data-start],[data-ocen],[data-status],[data-usun]");
    if (!cel) return;

    if (cel.dataset.etap) { this.etap = cel.dataset.etap; App.render(); return; }
    if (cel.dataset.akcja === "dodaj") {
      const t = document.querySelector("#in-tekst").value.trim();
      if (!t) { AB.toast("Wpisz pomysł", "blad"); return; }
      insp.push({ id: AB.uid(), tekst: t, dataDodania: AB.dzisISO(), status: "pomysl", eksperyment: {} });
      Store.zapisz(); AB.toast("Pomysł zapisany ✓"); App.render(); return;
    }
    if (cel.dataset.usun) {
      AB.potwierdz("Usunąć ten wpis?").then(tak => {
        if (tak) { Store.stan.inspiracje = insp.filter(i => i.id !== cel.dataset.usun); Store.zapisz(); App.render(); }
      });
      return;
    }
    if (cel.dataset.plan) return this._modalPlan(insp.find(i => i.id === cel.dataset.plan));
    if (cel.dataset.start) {
      const i = insp.find(x => x.id === cel.dataset.start);
      i.status = "test"; Store.zapisz();
      AB.toast("Test wystartował — dodaj blok testowy do planu dnia");
      App.render(); return;
    }
    if (cel.dataset.ocen) return this._modalWynik(insp.find(i => i.id === cel.dataset.ocen));
    if (cel.dataset.status) {
      const i = insp.find(x => x.id === cel.dataset.id);
      i.status = cel.dataset.status; Store.zapisz(); App.render(); return;
    }
  },

  _modalPlan(i) {
    if (!i) return;
    const e = i.eksperyment || {};
    const m = AB.el('<div class="modal-tlo"><div class="modal"><h2>Plan eksperymentu</h2>' +
      "<p class=\"maly wyciszony\">Zasada złotych standardów: testuj liść, nie buduj nowego drzewa — " +
      "nowy produkt najpierw jako wariant istniejącej bazy, 1 blacha, jasne kryteria.</p>" +
      '<label class="pole"><span>Hipoteza (co i dlaczego zadziała)</span><textarea id="pl-hipoteza">' + AB.esc(e.hipoteza || "") + "</textarea></label>" +
      '<label class="pole"><span>Test (co dokładnie robimy — skala 1 blachy)</span><textarea id="pl-test">' +
      AB.esc(e.test || "1 blacha próbna na bazie istniejącej receptury; degustacja zespołu + 10 szt. na witrynę z ceną testową") + "</textarea></label>" +
      '<label class="pole"><span>Kryteria sukcesu (liczbowe!)</span><textarea id="pl-kryteria">' +
      AB.esc(e.kryteria || "sprzedaż ≥ 80% w 1 dzień; foodcost ≤ 30%; czas rąk ≤ 30 min/partia; ocena zespołu ≥ 4/5") + "</textarea></label>" +
      '<div class="modal-akcje"><button class="btn btn-cichy" data-a="x">Anuluj</button>' +
      '<button class="btn btn-glowny" data-a="ok">Zapisz plan</button></div></div></div>');
    m.addEventListener("click", ev => {
      if (ev.target.dataset.a === "x" || ev.target === m) m.remove();
      if (ev.target.dataset.a === "ok") {
        i.eksperyment = {
          hipoteza: m.querySelector("#pl-hipoteza").value.trim(),
          test: m.querySelector("#pl-test").value.trim(),
          kryteria: m.querySelector("#pl-kryteria").value.trim(),
          wynik: e.wynik || ""
        };
        if (i.status === "pomysl") i.status = "eksperyment";
        Store.zapisz(); m.remove(); this.etap = "eksperyment"; App.render();
      }
    });
    document.body.appendChild(m);
  },

  _modalWynik(i) {
    if (!i) return;
    const m = AB.el('<div class="modal-tlo"><div class="modal"><h2>Wynik testu</h2>' +
      "<p class=\"maly\">Kryteria: " + AB.esc((i.eksperyment || {}).kryteria || "—") + "</p>" +
      '<label class="pole"><span>Co wyszło (liczby + wnioski)</span><textarea id="wy-wynik">' +
      AB.esc((i.eksperyment || {}).wynik || "") + "</textarea></label>" +
      '<div class="modal-akcje"><button class="btn btn-cichy" data-a="x">Anuluj</button>' +
      '<button class="btn btn-glowny" data-a="ok">Do oceny</button></div></div></div>');
    m.addEventListener("click", ev => {
      if (ev.target.dataset.a === "x" || ev.target === m) m.remove();
      if (ev.target.dataset.a === "ok") {
        i.eksperyment.wynik = m.querySelector("#wy-wynik").value.trim();
        i.status = "ocena"; Store.zapisz(); m.remove(); this.etap = "ocena"; App.render();
      }
    });
    document.body.appendChild(m);
  }
};
