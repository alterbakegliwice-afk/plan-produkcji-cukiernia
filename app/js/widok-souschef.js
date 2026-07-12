// WIDOK: Sous Chef — czat doradcy + sezon + radar trendów + baza wiedzy
window.WidokSousChef = {
  zakladka: "czat", // czat | sezon | trendy | wiedza
  pisze: false,

  render(el) {
    let html = '<div class="pipeline">' +
      [["czat", "💬 Doradca"], ["sezon", "📅 Sezon"], ["trendy", "📡 Trendy"], ["wiedza", "📚 Wiedza"]].map(z =>
        '<button class="etap ' + (this.zakladka === z[0] ? "aktywny" : "") + '" data-z="' + z[0] + '">' + z[1] + "</button>").join("") +
      "</div>";

    if (this.zakladka === "czat") html += this._czat();
    if (this.zakladka === "sezon") html += this._sezon();
    if (this.zakladka === "trendy") html += this._trendy();
    if (this.zakladka === "wiedza") html += this._wiedza();

    el.innerHTML = html;
    el.addEventListener("click", e => this._klik(e));

    if (this.zakladka === "czat") {
      const pole = el.querySelector("#sc-pytanie");
      if (pole) pole.addEventListener("keydown", e => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); this._wyslij(); }
      });
      const czat = el.querySelector("#sc-czat");
      if (czat) czat.scrollTop = czat.scrollHeight;
    }
  },

  _czat() {
    const online = Store.stan.ustawienia.trybOnline && Store.stan.ustawienia.apiKey;
    let h = '<p class="wyciszony maly" style="margin:4px 2px 10px">Doradca strategiczny ugruntowany w złotych standardach Alterbake i bazie 25 autorytetów. ' +
      (online ? '<span class="chip zielony">tryb online (Claude)</span>' : '<span class="chip szary">tryb lokalny — offline</span>') + "</p>";

    h += '<div class="czat" id="sc-czat" style="min-height:200px">';
    if (!Store.stan.czat.length) {
      h += '<div class="dymek chef">Cześć Oliwia! 👩‍🍳 Jestem Twoim sous chefem od planowania. Zapytaj o plan dnia, mrożenie, delegację, sezon albo trendy — albo dotknij podpowiedzi niżej.</div>';
    }
    for (const w of Store.stan.czat) {
      h += '<div class="dymek ' + (w.rola === "ja" ? "ja" : "chef") + '">' + AB.esc(w.tekst) +
        (w.zrodlo ? '<span class="zrodlo">📖 ' + AB.esc(w.zrodlo) + "</span>" : "") + "</div>";
    }
    if (this.pisze) h += '<div class="dymek chef wyciszony">piszę…</div>';
    h += "</div>";

    h += '<div class="chipy" style="margin:10px 0">' +
      ["Oceń mój plan", "Co mrozić na zapas?", "Jak delegować?", "Co w sezonie?", "Kolejność pieca"].map(p =>
        '<button class="chip szary" data-podp="' + AB.esc(p) + '">' + p + "</button>").join("") +
      (Store.stan.czat.length ? '<button class="chip szary" data-akcja="wyczysc-czat">🗑 wyczyść</button>' : "") + "</div>";

    h += '<div class="czat-pasek"><input id="sc-pytanie" placeholder="Zapytaj sous chefa…" autocomplete="off">' +
      '<button class="btn btn-glowny" data-akcja="wyslij">➤</button></div>';
    return h;
  },

  _sezon() {
    const W = window.AB_WIEDZA || { sezon: [] };
    const teraz = new Date().getMonth() + 1;
    let h = "";
    const kolejnosc = [...W.sezon].sort((a, b) =>
      ((a.miesiac - teraz + 12) % 12) - ((b.miesiac - teraz + 12) % 12));
    for (const m of kolejnosc) {
      const biezacy = m.miesiac === teraz;
      h += '<div class="karta" ' + (biezacy ? 'style="border-color:var(--akcent)"' : "") + ">" +
        '<div class="rzad"><h2 style="margin:0">' + AB.esc(m.nazwa) + "</h2>" +
        (biezacy ? '<span class="chip">teraz</span>' : "") + "</div>" +
        '<p class="maly"><b>Surowce:</b> ' + AB.esc((m.surowce || []).join("; ")) + "</p>" +
        '<p class="maly"><b>Okazje:</b> ' + AB.esc((m.okazje || []).join("; ")) + "</p>" +
        '<p class="maly"><b>Produkcja:</b> ' + AB.esc((m.produkty || []).join("; ")) + "</p>" +
        '<div class="sugestia" style="margin-top:8px">' + AB.esc(m.planowanie || "") + "</div></div>";
    }
    return h;
  },

  _trendy() {
    const W = window.AB_WIEDZA || { trendy: [] };
    const grupy = [["teraz", "🔥 Dzieje się teraz"], ["6mies", "📈 Horyzont 6 miesięcy"], ["12mies", "🔭 Horyzont 12 miesięcy"]];
    let h = '<p class="wyciszony maly" style="margin:4px 2px 10px">Radar trendów cukierni rzemieślniczych 2025/26 — siła oceniona dla rynku polskiego. Pomysł z radaru → wrzuć do Inspiracji i przetestuj na 1 blasze.</p>';
    for (const [klucz, tytul] of grupy) {
      const lista = W.trendy.filter(t => t.horyzont === klucz).sort((a, b) => b.sila - a.sila);
      if (!lista.length) continue;
      h += '<div class="sekcja-tytul"><h2>' + tytul + "</h2></div>";
      for (const t of lista) {
        h += '<div class="karta"><div class="rzad"><b>' + AB.esc(t.nazwa) + '</b><span class="rozdziel">' + Wykresy.sila(t.sila) + "</span></div>" +
          '<p class="maly">' + AB.esc(t.opis) + "</p>" +
          '<p class="maly"><b>U nas:</b> ' + AB.esc(t.dopasowanie_alterbake) + "</p>" +
          (t.przyklad ? '<p class="wyciszony maly">Kto to robi: ' + AB.esc(t.przyklad) + "</p>" : "") +
          '<button class="btn btn-maly" data-inspiruj="' + AB.esc(t.nazwa) + '" style="margin-top:6px">💭 Do inspiracji</button></div>';
      }
    }
    return h;
  },

  _wiedza() {
    const W = window.AB_WIEDZA || { autorytety: [], reguly: [] };
    let h = '<p class="wyciszony maly" style="margin:4px 2px 10px">25 autorytetów planowania produkcji + ' + W.reguly.length +
      ' reguł wydestylowanych ze złotych standardów Alterbake. Pełne tomy: <code>docs/</code> w repozytorium.</p>';
    const kategorie = [["patisserie", "🍰 Patisserie"], ["piekarstwo", "🥖 Piekarstwo"], ["strategia", "♟ Strategia operacyjna"], ["jakosc", "✅ Jakość"]];
    for (const [kat, tytul] of kategorie) {
      const lista = W.autorytety.filter(a => a.kategoria === kat);
      if (!lista.length) continue;
      h += '<div class="sekcja-tytul"><h2>' + tytul + "</h2></div>";
      for (const a of lista) {
        h += '<div class="karta"><div class="rzad"><b>' + AB.esc(a.nazwa) + '</b><span class="wyciszony maly rozdziel">' + AB.esc(a.rola) + "</span></div>" +
          '<p class="maly">' + AB.esc(a.praktyka) + "</p>" +
          '<div class="sugestia">→ ' + AB.esc(a.zastosowanie) + "</div></div>";
      }
    }
    return h;
  },

  _klik(e) {
    const z = e.target.closest("[data-z]");
    if (z) { this.zakladka = z.dataset.z; App.render(); return; }
    const podp = e.target.closest("[data-podp]");
    if (podp) { this._wyslij(podp.dataset.podp); return; }
    const insp = e.target.closest("[data-inspiruj]");
    if (insp) {
      Store.stan.inspiracje.push({
        id: AB.uid(), tekst: "Trend: " + insp.dataset.inspiruj,
        dataDodania: AB.dzisISO(), status: "pomysl", eksperyment: {}
      });
      Store.zapisz(); AB.toast("Dodano do inspiracji 💭");
      return;
    }
    const a = e.target.closest("[data-akcja]");
    if (!a) return;
    if (a.dataset.akcja === "wyslij") this._wyslij();
    if (a.dataset.akcja === "wyczysc-czat") {
      AB.potwierdz("Wyczyścić historię rozmowy?").then(t => {
        if (t) { Store.stan.czat = []; Store.zapisz(); App.render(); }
      });
    }
  },

  async _wyslij(gotowe) {
    const pole = document.querySelector("#sc-pytanie");
    const pytanie = gotowe || (pole && pole.value.trim());
    if (!pytanie || this.pisze) return;
    Store.stan.czat.push({ rola: "ja", tekst: pytanie });
    Store.zapisz();
    this.pisze = true;
    App.render();
    try {
      const odp = await SousChef.zapytaj(pytanie, WidokPlan.data);
      Store.stan.czat.push({ rola: "chef", tekst: odp.tekst, zrodlo: odp.zrodlo });
    } catch (e) {
      Store.stan.czat.push({ rola: "chef", tekst: "Coś poszło nie tak: " + e.message });
    }
    this.pisze = false;
    Store.zapisz();
    App.render();
  }
};
