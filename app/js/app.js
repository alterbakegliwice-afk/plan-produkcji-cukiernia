// APLIKACJA — nawigacja, nagłówek, ustawienia
window.App = {
  widok: "plan",

  WIDOKI: [
    ["plan", "📋", "Plan", () => WidokPlan],
    ["receptury", "📖", "Receptury", () => WidokReceptury],
    ["zadania", "✅", "Zadania", () => WidokZadania],
    ["inspiracje", "💭", "Inspiracje", () => WidokInspiracje],
    ["souschef", "👨‍🍳", "Sous Chef", () => WidokSousChef]
  ],

  start() {
    document.querySelector("#nawigacja").addEventListener("click", e => {
      const b = e.target.closest("[data-widok]");
      if (b) this.idz(b.dataset.widok);
    });
    document.querySelector("#btn-ustawienia").addEventListener("click", () => this.ustawienia());
    document.querySelector("#btn-modul").addEventListener("click", () => this.przelaczModul());
    // delegowana zmiana osoby na pasku bloku (select w widoku planu)
    document.querySelector("#widok").addEventListener("change", e => {
      if (e.target.dataset.akcja === "zmien-osobe" && WidokPlan.zaznaczony) {
        WidokPlan.zmienOsobe(WidokPlan.zaznaczony, e.target.value);
      }
    });
    this.render();
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
    // poproś przeglądarkę o trwały magazyn (żeby nie kasowała danych przy sprzątaniu)
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  },

  idz(widok) {
    this.widok = widok;
    window.scrollTo(0, 0);
    this.render();
  },

  przelaczModul() {
    const inny = Store.modul() === "cukiernia" ? "piekarnia" : "cukiernia";
    Store.przelaczModul(inny);
    // reset stanów widoków zależnych od modułu
    WidokReceptury.otwarta = null;
    WidokReceptury.filtr = ""; WidokReceptury.kategoria = "";
    WidokPlan.zaznaczony = null;
    if (window.Wiedza) Wiedza.przebuduj();
    const M = window.AB_MODUL;
    AB.toast(M.ikona + " Moduł: " + M.nazwa);
    this.idz("plan");
  },

  _naglowek() {
    const M = window.AB_MODUL || { nazwa: "Planer", ikona: "🍰" };
    const marka = document.querySelector("#marka-modul");
    if (marka) marka.textContent = M.nazwa;
    const btn = document.querySelector("#btn-modul");
    // ikona pokazuje moduł, DO którego przełączysz
    if (btn) btn.textContent = Store.modul() === "cukiernia" ? "🥖" : "🍰";
  },

  render() {
    this._naglowek();
    // nawigacja
    document.querySelectorAll("#nawigacja button").forEach(b =>
      b.classList.toggle("aktywna", b.dataset.widok === this.widok));
    // widok — świeży kontener, żeby nie dublować listenerów
    const stary = document.querySelector("#widok");
    const nowy = stary.cloneNode(false);
    stary.replaceWith(nowy);
    nowy.addEventListener("change", e => {
      if (e.target.dataset.akcja === "zmien-osobe" && WidokPlan.zaznaczony) {
        WidokPlan.zmienOsobe(WidokPlan.zaznaczony, e.target.value);
      }
    });
    const wpis = this.WIDOKI.find(w => w[0] === this.widok);
    if (wpis) wpis[3]().render(nowy);
  },

  ustawienia() {
    const u = Store.stan.ustawienia;
    const m = AB.el('<div class="modal-tlo"><div class="modal"><h2>⚙️ Ustawienia</h2>' +
      '<h3>Dzień pracy</h3><div class="rzad">' +
      '<label class="pole" style="flex:1"><span>Start</span><input type="time" id="u-od" value="' + AB.esc(u.dzienOd) + '"></label>' +
      '<label class="pole" style="flex:1"><span>Koniec</span><input type="time" id="u-do" value="' + AB.esc(u.dzienDo) + '"></label></div>' +
      "<h3>Zespół</h3>" +
      u.zespol.map((os, i) =>
        '<div class="rzad" style="margin-bottom:6px"><b style="width:70px">' + AB.esc(os.nazwa) + "</b>" +
        '<input type="time" data-zm="od" data-i="' + i + '" value="' + AB.esc(os.od) + '" style="width:auto">–' +
        '<input type="time" data-zm="do" data-i="' + i + '" value="' + AB.esc(os.do) + '" style="width:auto"></div>').join("") +
      '<h3 style="margin-top:14px">Sous Chef online (opcjonalnie)</h3>' +
      '<p class="maly wyciszony">Tryb lokalny działa bez internetu. Tryb online łączy się z Claude API — potrzebny własny klucz z console.anthropic.com. Klucz zostaje tylko w tym telefonie (localStorage). Uwaga: klucz w przeglądarce jest widoczny dla każdego z dostępem do urządzenia — używaj klucza z niskim limitem wydatków.</p>' +
      '<label class="pole"><span>Klucz API</span><input type="password" id="u-klucz" value="' + AB.esc(u.apiKey || "") + '" placeholder="sk-ant-…"></label>' +
      '<label class="rzad" style="margin:8px 0"><input type="checkbox" id="u-online" style="width:24px;min-height:24px" ' + (u.trybOnline ? "checked" : "") + "> Włącz tryb online</label>" +
      '<h3 style="margin-top:14px">Dane</h3>' +
      '<div class="rzad"><button class="btn btn-maly" data-a="eksport">⬇ Kopia zapasowa</button>' +
      '<label class="btn btn-maly" style="display:inline-flex;align-items:center">⬆ Wczytaj<input type="file" id="u-import" accept=".json" hidden></label>' +
      '<button class="btn btn-maly btn-cichy" data-a="wyczysc" style="color:var(--blad)">Wyczyść wszystko</button></div>' +
      '<p class="wyciszony maly" style="margin-top:10px">Dane żyją w tej przeglądarce. Rób kopię raz w tygodniu — plik JSON można wczytać na innym urządzeniu.</p>' +
      '<div class="modal-akcje"><button class="btn btn-cichy" data-a="x">Zamknij</button>' +
      '<button class="btn btn-glowny" data-a="zapisz">Zapisz</button></div></div></div>');

    m.addEventListener("click", e => {
      const a = e.target.dataset.a;
      if (a === "x" || e.target === m) m.remove();
      if (a === "eksport") Store.eksportuj();
      if (a === "wyczysc") { m.remove(); Store.wyczysc(); }
      if (a === "zapisz") {
        u.dzienOd = m.querySelector("#u-od").value || u.dzienOd;
        u.dzienDo = m.querySelector("#u-do").value || u.dzienDo;
        m.querySelectorAll("[data-zm]").forEach(inp => {
          const os = u.zespol[Number(inp.dataset.i)];
          if (os && inp.value) os[inp.dataset.zm] = inp.value;
        });
        u.apiKey = m.querySelector("#u-klucz").value.trim();
        u.trybOnline = m.querySelector("#u-online").checked;
        Store.zapisz(); m.remove(); AB.toast("Zapisano ✓"); this.render();
      }
    });
    m.querySelector("#u-import").addEventListener("change", e => {
      const plik = e.target.files[0];
      if (plik) Store.importuj(plik)
        .then(() => { AB.toast("Wczytano kopię ✓"); m.remove(); this.render(); })
        .catch(() => AB.toast("Nieprawidłowy plik kopii", "blad"));
    });
    document.body.appendChild(m);
  }
};

document.addEventListener("DOMContentLoaded", () => App.start());
