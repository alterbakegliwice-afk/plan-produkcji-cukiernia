// WIDOK: Doradca (Sous Chef) — czat + sezon + trendy/zaczyny + wiedza + moja wiedza
window.WidokSousChef = {
  zakladka: "czat",
  pisze: false,

  _zakladki() {
    const W = window.AB_WIEDZA || {};
    const piekarnia = (window.AB_MODUL || {}).klucz === "piekarnia";
    const z = [["czat", "💬 Doradca"], ["sezon", "📅 Sezon"]];
    if (piekarnia && Object.keys(window.AB_PREFERMENTY || {}).length) z.push(["zaczyny", "🫧 Zaczyny"]);
    if ((W.trendy || []).length) z.push(["trendy", "📡 Trendy"]);
    z.push(["wiedza", "📚 Wiedza"]);
    z.push(["moja", "🧠 Moja wiedza"]);
    return z;
  },

  render(el) {
    const zak = this._zakladki();
    if (!zak.some(z => z[0] === this.zakladka)) this.zakladka = "czat";
    let html = '<div class="pipeline">' + zak.map(z =>
      '<button class="etap ' + (this.zakladka === z[0] ? "aktywny" : "") + '" data-z="' + z[0] + '">' + z[1] + "</button>").join("") + "</div>";

    if (this.zakladka === "czat") html += this._czat();
    if (this.zakladka === "sezon") html += this._sezon();
    if (this.zakladka === "zaczyny") html += this._zaczyny();
    if (this.zakladka === "trendy") html += this._trendy();
    if (this.zakladka === "wiedza") html += this._wiedza();
    if (this.zakladka === "moja") html += this._moja();

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
    const online = Store.stan.globalne.trybOnline && Store.stan.globalne.apiKey;
    const M = window.AB_MODUL || {};
    const stat = window.Nauka ? Nauka.statystyki() : { razem: 0 };
    let h = '<p class="wyciszony maly" style="margin:4px 2px 10px">Doradca odpowiada offline z bazy <b>' + stat.razem +
      "</b> fragmentów wiedzy (złote standardy + " + (M.klucz === "piekarnia" ? "praktyki mistrzów piekarstwa" : "25 autorytetów") +
      " + Twoja wiedza własna). " +
      (online ? '<span class="chip zielony">tryb online (Claude)</span>' : '<span class="chip szary">offline · darmowy</span>') + "</p>";

    h += '<div class="czat" id="sc-czat" style="min-height:200px">';
    if (!Store.stan.czat.length) {
      h += '<div class="dymek chef">Cześć ' + AB.esc(M.osoba || "") + "! " + (M.ikona || "👨‍🍳") +
        " Jestem Twoim doradcą od planowania produkcji. Zapytaj o cokolwiek — plan dnia, " +
        (M.klucz === "piekarnia" ? "prowadzenie zaczynów, retard, kolejność pokładów" : "mrożenie, delegację, sezon") +
        ". Odpowiadam z Twojej bazy wiedzy, za darmo i bez internetu.</div>";
    }
    for (const w of Store.stan.czat) {
      h += '<div class="dymek ' + (w.rola === "ja" ? "ja" : "chef") + '">' + AB.esc(w.tekst) +
        (w.zrodlo ? '<span class="zrodlo">📖 ' + AB.esc(w.zrodlo) + "</span>" : "") + "</div>";
    }
    if (this.pisze) h += '<div class="dymek chef wyciszony">szukam w wiedzy…</div>';
    h += "</div>";

    const podp = M.klucz === "piekarnia"
      ? ["Oceń mój plan", "Kiedy dokarmić zakwas?", "Jak ustawić retard?", "Kolejność pokładów IBIS", "Co w sezonie?"]
      : ["Oceń mój plan", "Co mrozić na zapas?", "Jak delegować?", "Co w sezonie?", "Kolejność pieca"];
    h += '<div class="chipy" style="margin:10px 0">' +
      podp.map(p => '<button class="chip szary" data-podp="' + AB.esc(p) + '">' + p + "</button>").join("") +
      (Store.stan.czat.length ? '<button class="chip szary" data-akcja="wyczysc-czat">🗑 wyczyść</button>' : "") + "</div>";

    h += '<div class="czat-pasek"><input id="sc-pytanie" placeholder="Zapytaj o cokolwiek…" autocomplete="off">' +
      '<button class="btn btn-glowny" data-akcja="wyslij" aria-label="wyślij">➤</button></div>';
    return h;
  },

  _sezon() {
    const W = window.AB_WIEDZA || { sezon: [] };
    const teraz = new Date().getMonth() + 1;
    if (!(W.sezon || []).length) return '<div class="pusto">Brak kalendarza sezonowego dla tego modułu.</div>';
    let h = "";
    const kolejnosc = [...W.sezon].sort((a, b) => ((a.miesiac - teraz + 12) % 12) - ((b.miesiac - teraz + 12) % 12));
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

  // widok prefermentów (piekarnia) — zaczyny jako zegary, z czasami prowadzenia
  _zaczyny() {
    const P = window.AB_PREFERMENTY || {};
    let h = '<p class="wyciszony maly" style="margin:4px 2px 10px">Prefermenty to zegary — planuj je D-1. Dokarm o czasie, żeby były na szczycie rano.</p>';
    for (const [nazwa, p] of Object.entries(P)) {
      h += '<div class="karta"><div class="rzad"><b>' + AB.esc(nazwa) + '</b><span class="chip szary rozdziel">' + AB.esc(p.typ || "") + "</span></div>" +
        '<table class="tabela" style="margin-top:6px">' +
        (p.hydracja != null ? "<tr><td>Hydracja</td><td class=\"liczba\">" + AB.esc(p.hydracja) + "%</td></tr>" : "") +
        (p.proporcja ? "<tr><td>Mąka:Woda</td><td class=\"liczba\">" + AB.esc(p.proporcja) + "</td></tr>" : "") +
        (p.starter ? "<tr><td>Starter</td><td class=\"liczba\">" + AB.esc(p.starter) + "</td></tr>" : "") +
        (p.temp != null ? "<tr><td>Temperatura</td><td class=\"liczba\">" + AB.esc(p.temp) + "°C</td></tr>" : "") +
        (p.czas_h != null ? "<tr><td>Czas</td><td class=\"liczba\"><b>" + AB.esc(p.czas_h) + " h</b></td></tr>" : "") +
        (p.lodowka ? "<tr><td>Lodówka</td><td class=\"liczba\">" + AB.esc(p.lodowka) + "</td></tr>" : "") +
        (p.uzycie_pct ? "<tr><td>Użycie</td><td class=\"liczba\">" + AB.esc(p.uzycie_pct) + "%</td></tr>" : "") +
        "</table>" +
        (p.sygnal ? '<div class="sugestia" style="margin-top:6px">Sygnał gotowości: ' + AB.esc(p.sygnal) + (p.uwagi ? " · " + AB.esc(p.uwagi) : "") + "</div>" : "") +
        "</div>";
    }
    return h;
  },

  _trendy() {
    const W = window.AB_WIEDZA || { trendy: [] };
    const grupy = [["teraz", "🔥 Dzieje się teraz"], ["6mies", "📈 Horyzont 6 miesięcy"], ["12mies", "🔭 Horyzont 12 miesięcy"]];
    let h = '<p class="wyciszony maly" style="margin:4px 2px 10px">Radar trendów rzemieślniczych 2025/26 — siła oceniona dla rynku polskiego. Pomysł z radaru → wrzuć do Pomysłów i przetestuj na 1 blasze.</p>';
    for (const [klucz, tytul] of grupy) {
      const lista = (W.trendy || []).filter(t => t.horyzont === klucz).sort((a, b) => b.sila - a.sila);
      if (!lista.length) continue;
      h += '<div class="sekcja-tytul"><h2>' + tytul + "</h2></div>";
      for (const t of lista) {
        h += '<div class="karta"><div class="rzad"><b>' + AB.esc(t.nazwa) + '</b><span class="rozdziel">' + Wykresy.sila(t.sila) + "</span></div>" +
          '<p class="maly">' + AB.esc(t.opis) + "</p>" +
          '<p class="maly"><b>U nas:</b> ' + AB.esc(t.dopasowanie_alterbake) + "</p>" +
          (t.przyklad ? '<p class="wyciszony maly">Kto to robi: ' + AB.esc(t.przyklad) + "</p>" : "") +
          '<button class="btn btn-maly" data-inspiruj="' + AB.esc(t.nazwa) + '" style="margin-top:6px">💭 Do pomysłów</button></div>';
      }
    }
    return h;
  },

  _wiedza() {
    const W = window.AB_WIEDZA || { autorytety: [], reguly: [] };
    let h = '<p class="wyciszony maly" style="margin:4px 2px 10px">' + (W.reguly || []).length +
      ' reguł ze złotych standardów Alterbake. Pełne tomy: <code>docs/</code> w repozytorium.</p>';
    const kategorie = [["patisserie", "🍰 Patisserie"], ["piekarstwo", "🥖 Piekarstwo"], ["strategia", "♟ Strategia operacyjna"], ["jakosc", "✅ Jakość"]];
    let maAutorytety = false;
    for (const [kat, tytul] of kategorie) {
      const lista = (W.autorytety || []).filter(a => a.kategoria === kat);
      if (!lista.length) continue;
      maAutorytety = true;
      h += '<div class="sekcja-tytul"><h2>' + tytul + "</h2></div>";
      for (const a of lista) {
        h += '<div class="karta"><div class="rzad"><b>' + AB.esc(a.nazwa) + '</b><span class="wyciszony maly rozdziel">' + AB.esc(a.rola) + "</span></div>" +
          '<p class="maly">' + AB.esc(a.praktyka) + "</p>" +
          '<div class="sugestia">→ ' + AB.esc(a.zastosowanie) + "</div></div>";
      }
    }
    // gdy brak osobnych autorytetów (piekarnia) — pokaż reguły pogrupowane
    if (!maAutorytety) {
      const wgKat = {};
      for (const r of (W.reguly || [])) (wgKat[r.kategoria] = wgKat[r.kategoria] || []).push(r);
      for (const [kat, lista] of Object.entries(wgKat)) {
        h += '<div class="sekcja-tytul"><h2 style="text-transform:capitalize">' + AB.esc(kat) + "</h2></div>";
        for (const r of lista.slice(0, 8)) {
          h += '<div class="karta"><p class="maly"><b>Gdy:</b> ' + AB.esc(r.warunek) + "</p>" +
            '<div class="sugestia">' + AB.esc(r.rada) + '</div><p class="wyciszony maly" style="margin-top:4px">' + AB.esc(r.zrodlo) + "</p></div>";
        }
      }
    }
    return h;
  },

  // "Moja wiedza" — czego apka się nauczyła + dopisywanie własnej wiedzy
  _moja() {
    const n = (Store.stan.nauka) || { fakty: [], notatki: [] };
    const stat = Nauka.statystyki();
    let h = '<div class="karta"><h2>🧠 Apka uczy się z Twojej pracowni</h2>' +
      '<p class="maly wyciszony">Kalibracje czasów i wyniki eksperymentów zapisują się automatycznie. Możesz też dopisać własną wiedzę — doradca zacznie z niej korzystać w odpowiedziach.</p>' +
      '<div class="rzad maly" style="margin-top:6px"><span class="chip zielony">' + stat.fakty + " nauczonych faktów</span>" +
      '<span class="chip szary">' + stat.notatki + " notatek</span>" +
      '<span class="chip szary">' + stat.reguly + " reguł</span></div></div>";

    h += '<div class="karta"><h3>Dopisz własną wiedzę</h3>' +
      '<label class="pole"><span>Krótki tytuł</span><input id="mw-tytul" placeholder="np. Nasz piec grzeje +10°C"></label>' +
      '<label class="pole"><span>Treść (co warto pamiętać)</span><textarea id="mw-tekst" placeholder="np. Realnie ustawiam Bongard o 10°C niżej niż w recepturze — inaczej spody za ciemne."></textarea></label>' +
      '<button class="btn btn-glowny" data-akcja="dodaj-notatke">Zapisz do wiedzy</button></div>';

    if (n.notatki.length) {
      h += '<div class="sekcja-tytul"><h2>Twoje notatki</h2></div>';
      for (const x of n.notatki) {
        h += '<div class="karta"><div class="rzad"><b>' + AB.esc(x.tytul || "(bez tytułu)") + '</b>' +
          '<button class="btn btn-maly btn-cichy rozdziel" data-usun-notatke="' + x.id + '" style="color:var(--blad)">✕</button></div>' +
          '<p class="maly">' + AB.esc(x.tekst) + '</p><p class="wyciszony maly">' + AB.esc(x.data) + "</p></div>";
      }
    }
    if (n.fakty.length) {
      h += '<div class="sekcja-tytul"><h2>Nauczone automatycznie</h2></div>';
      for (const f of n.fakty.slice(0, 30)) {
        h += '<div class="karta"><div class="rzad"><b>' + AB.esc(f.tytul) + '</b>' +
          '<button class="btn btn-maly btn-cichy rozdziel" data-usun-fakt="' + f.id + '" style="color:var(--blad)">✕</button></div>' +
          '<p class="maly">' + AB.esc(f.tekst) + "</p></div>";
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
      Store.zapisz(); AB.toast("Dodano do pomysłów 💭");
      return;
    }
    const un = e.target.closest("[data-usun-notatke]");
    if (un) { Nauka.usunNotatke(un.dataset.usunNotatke); App.render(); return; }
    const uf = e.target.closest("[data-usun-fakt]");
    if (uf) { Nauka.usunFakt(uf.dataset.usunFakt); App.render(); return; }

    const a = e.target.closest("[data-akcja]");
    if (!a) return;
    if (a.dataset.akcja === "wyslij") this._wyslij();
    if (a.dataset.akcja === "dodaj-notatke") {
      const tytul = document.querySelector("#mw-tytul").value.trim();
      const tekst = document.querySelector("#mw-tekst").value.trim();
      if (!tekst) { AB.toast("Wpisz treść notatki", "blad"); return; }
      Nauka.dodajNotatke(tytul, tekst, "");
      AB.toast("Zapisano do wiedzy 🧠 — doradca już to zna");
      App.render();
    }
    if (a.dataset.akcja === "wyczysc-czat") {
      AB.potwierdz("Wyczyścić historię rozmowy?").then(t => {
        if (t) { Store.stan.czat.length = 0; Store.zapisz(); App.render(); }
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
