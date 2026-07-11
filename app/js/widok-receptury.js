// WIDOK: Receptury — lista, skalowanie, naważki, wykres czasu, delegacja naważek
window.WidokReceptury = {
  otwarta: null,     // nr otwartej receptury
  partie: 1,
  filtr: "",
  kategoria: "",

  render(el) {
    if (this.otwarta) return this._karta(el, AB.receptura(this.otwarta));

    const kategorie = [...new Set(AB_RECEPTURY.map(r => r.kategoria).filter(Boolean))].sort();
    el.innerHTML =
      '<div class="rzad" style="margin-bottom:10px">' +
      '<input type="search" placeholder="Szukaj receptury…" value="' + AB.esc(this.filtr) + '" id="rec-szukaj" style="flex:1">' +
      "</div>" +
      '<div class="chipy" style="margin-bottom:12px"><button class="chip ' + (this.kategoria ? "szary" : "") + '" data-kat="">Wszystkie</button>' +
      kategorie.map(k => '<button class="chip ' + (this.kategoria === k ? "" : "szary") + '" data-kat="' + AB.esc(k) + '">' + AB.esc(k) + "</button>").join("") +
      "</div><div id=\"rec-lista\"></div>";

    this._renderLista(el.querySelector("#rec-lista"));

    // odświeżamy tylko listę — pełny render zabierałby fokus (i klawiaturę) po każdej literze
    el.querySelector("#rec-szukaj").addEventListener("input", e => {
      this.filtr = e.target.value;
      this._renderLista(el.querySelector("#rec-lista"));
    });
    el.addEventListener("click", e => {
      const kat = e.target.closest("[data-kat]");
      if (kat) { this.kategoria = kat.dataset.kat; App.render(); return; }
      const karta = e.target.closest("[data-nr]");
      if (karta) { this.otwarta = karta.dataset.nr; this.partie = 1; App.render(); }
    });
  },

  _renderLista(lista) {
    const q = this.filtr.toLowerCase();
    const pasujace = AB_RECEPTURY.filter(r =>
      (!this.kategoria || r.kategoria === this.kategoria) &&
      (!q || r.nazwa.toLowerCase().includes(q) || r.nr.toLowerCase().includes(q)));

    lista.innerHTML = "";
    for (const r of pasujace) {
      const rz = Czas.rozklad(r.nr, 1);
      const czasNiepewny = !Store.stan.kalibracja[r.nr] && (r.czas_pracy_min || 0) <= 2;
      lista.appendChild(AB.el('<div class="karta dotykowa" data-nr="' + r.nr + '">' +
        '<div class="rzad"><b>' + AB.esc(r.nazwa) + '</b><span class="chip szary">' + AB.esc(r.kategoria || "") + "</span>" +
        '<span class="rozdziel wyciszony maly">' + r.nr + "</span></div>" +
        '<div class="wyciszony maly" style="margin-top:4px">' +
        (r.tylko_proces ? "⚠ tylko parametry procesu — brak składników w XLSX" :
          "partia: ~" + Math.round(r.porcje_partia || 1) + " porcji · surowce " +
          (r.brak_cen && r.brak_cen.length ? "niepełne (brak cen)" : AB.zl(r.koszt_surowcow_partia))) +
        " · ręce " + (czasNiepewny ? "⚠ do kalibracji" : AB.min(Store.czasPracy(r.nr))) +
        (rz.piec ? " · piec " + AB.min(rz.czasWsadu) + "/wsad" : "") + "</div>" +
        (r.alergeny.length ? '<div class="chipy" style="margin-top:6px">' + r.alergeny.map(a => '<span class="chip zloty">' + AB.esc(a) + "</span>").join("") + "</div>" : "") +
        "</div>"));
    }
    if (!pasujace.length) lista.innerHTML = '<div class="pusto">Brak receptur dla tego filtra.</div>';
  },

  _karta(el, r) {
    if (!r) { this.otwarta = null; return this.render(el); }
    const p = r.proces || {};
    const rz = Czas.rozklad(r.nr, this.partie);
    const koszt = Czas.koszt(r.nr, this.partie);
    const nawazki = Czas.nawazki(r.nr, this.partie);
    const fazy = [...new Set(nawazki.map(n => n.faza))];

    let html =
      '<button class="btn btn-cichy btn-maly" data-akcja="wroc">‹ Receptury</button>' +
      '<div class="karta" style="margin-top:8px"><div class="rzad"><h1 style="margin:0">' + AB.esc(r.nazwa) + "</h1>" +
      '<span class="rozdziel chip szary">' + r.nr + "</span></div>" +
      '<div class="chipy" style="margin:8px 0">' +
      '<span class="chip szary">' + AB.esc(r.kategoria || "") + "</span>" +
      r.alergeny.map(a => '<span class="chip zloty">' + AB.esc(a) + "</span>").join("") + "</div>" +
      (p.uwagi ? '<p class="maly">📌 ' + AB.esc(p.uwagi) + "</p>" : "") + "</div>";

    // skalowanie
    html += '<div class="karta"><div class="rzad"><h2 style="margin:0">Skalowanie</h2>' +
      '<div class="stepper rozdziel"><button data-akcja="partie" data-s="-1">−</button>' +
      '<span class="wartosc">' + this.partie + "</span>" +
      '<button data-akcja="partie" data-s="1">+</button></div></div>' +
      '<p class="maly wyciszony" style="margin:6px 0 10px">partii × ' + Math.round(r.porcje_partia || 1) + " porcji = <b>~" +
      Math.round((r.porcje_partia || 1) * this.partie) + " porcji</b> · masa ciasta ~" + AB.g(r.masa_partii_g * this.partie) + "</p>";

    // rozkład czasu
    html += '<div class="przewijalna"><table class="tabela"><tr>' +
      "<th>Ręce</th><th>Pasywne</th><th>" + (rz.zasob === "smazalnik" ? "Smażenie" : "Piec") + "</th><th>Razem</th></tr><tr>" +
      '<td class="liczba"><b>' + AB.min(rz.aktywny) + "</b></td>" +
      '<td class="liczba">' + AB.min(rz.pasywnePrzed + rz.chlodzenieCiasta + rz.studzenie) + "</td>" +
      '<td class="liczba">' + (rz.piec ? AB.min(rz.piec) + " (" + rz.wsady + " wsad.)" : "—") + "</td>" +
      '<td class="liczba"><b>' + AB.min(rz.total) + "</b></td></tr></table></div>";

    if (koszt && !r.tylko_proces) {
      html += '<p class="maly" style="margin-top:8px">Surowce <b>' + AB.zl(koszt.surowce) + "</b> + robocizna <b>" + AB.zl(koszt.robocizna) +
        "</b> = <b>" + AB.zl(koszt.razem) + "</b> (" + AB.zl(koszt.naPorcje) + "/porcję" +
        (r.cena_obecna ? ", cena obecna " + AB.zl(r.cena_obecna) : "") + ")</p>";
      if (r.brak_cen && r.brak_cen.length) {
        html += '<div class="ostrzezenie">⚠️ Koszt NIEPEŁNY — w cenniku brakuje cen: ' + AB.esc(r.brak_cen.join(", ")) +
          ". Uzupełnij CENNIK_SUROWCÓW w XLSX i przelicz.</div>";
      }
    }
    if (!Store.stan.kalibracja[r.nr] && (r.czas_pracy_min || 0) <= 2) {
      html += '<div class="ostrzezenie">⚠️ Czas pracy z arkusza (' + (r.czas_pracy_min || 0) +
        " min) wygląda na nierealny — zmierz stoperem i użyj „Kalibruj czas”, inaczej symulacje będą nieprawdziwe.</div>";
    }
    html += '<div class="rzad" style="margin-top:10px">' +
      '<button class="btn btn-glowny" data-akcja="do-planu">+ Wstaw do planu</button>' +
      '<button class="btn" data-akcja="deleguj-nawazki">Deleguj naważki</button>' +
      '<button class="btn btn-cichy" data-akcja="kalibruj">⏱ Kalibruj czas</button></div></div>';

    // wykres czasu vs ilość (zakres = zakres steppera)
    html += '<div class="karta"><h2>Czas vs ilość</h2>' +
      Wykresy.skalowanie(r.nr, 12, this.partie) + "</div>";

    // naważki wg faz
    if (nawazki.length) {
      html += '<div class="karta"><div class="rzad"><h2 style="margin:0">Naważki × ' + this.partie + '</h2>' +
        '<button class="btn btn-maly rozdziel" data-akcja="drukuj">🖨 Drukuj</button></div>';
      for (const faza of fazy) {
        const grupa = nawazki.filter(n => n.faza === faza);
        html += '<h3 style="margin-top:12px;text-transform:capitalize">' + AB.esc(faza) + "</h3>" +
          '<table class="tabela">' +
          grupa.map(n => "<tr><td>" + AB.esc(n.nazwa) + '</td><td class="liczba"><b>' + AB.g(n.ilosc) + "</b></td></tr>").join("") +
          "</table>";
      }
      html += "</div>";
    }

    // parametry procesu
    html += '<div class="karta"><h2>Proces</h2><table class="tabela">';
    const wiersze = [
      ["Piec / metoda", p.piec || "—"],
      p.bong_t ? ["Bongard", p.bong_t + "°C · " + p.bong_min + " min · wiatrak " + (p.wiatrak || "—")] : null,
      p.ibis_t ? ["IBIS", p.ibis_t + "°C · " + p.ibis_min + " min · pokład " + (p.poklad || "—")] : null,
      p.piec === "smażone" ? ["Smażenie", "MechMasz 180–190°C (CCP2)"] : null,
      ["Forma", p.forma || "—"],
      ["Masa sztuki", p.masa_szt_g ? AB.g(p.masa_szt_g) : "—"],
      p.miesz_min ? ["Mieszanie", p.miesz_min + " min" + (p.t_ciasta ? " · ciasto " + p.t_ciasta + "°C" : "")] : null,
      p.ferm_min ? ["Fermentacja wstępna", p.ferm_min + " min"] : null,
      p.rozrost_min ? ["Rozrost", p.rozrost_min + " min"] : null,
      p.ubytek_pct ? ["Ubytek wypieku", p.ubytek_pct + "%"] : null
    ].filter(Boolean);
    html += wiersze.map(w => "<tr><td>" + w[0] + '</td><td class="liczba">' + AB.esc(String(w[1])) + "</td></tr>").join("") + "</table></div>";

    el.innerHTML = html;
    el.addEventListener("click", e => this._klikKarta(e, r));
  },

  _klikKarta(e, r) {
    const cel = e.target.closest("[data-akcja]");
    if (!cel) return;
    const a = cel.dataset.akcja;
    if (a === "wroc") { this.otwarta = null; App.render(); }
    if (a === "partie") { this.partie = Math.min(12, Math.max(1, this.partie + Number(cel.dataset.s))); App.render(); }
    if (a === "do-planu") {
      WidokPlan._dodajBlok(r.nr, this.partie, "oliwia");
      App.idz("plan");
    }
    if (a === "drukuj") window.print();
    if (a === "deleguj-nawazki") {
      const pomoc = Store.stan.ustawienia.zespol.find(z => z.rola === "pomoc");
      Store.stan.zadania.push({
        id: AB.uid(), tytul: "Naważki: " + r.nazwa + " × " + this.partie + " partii",
        osoba: pomoc ? pomoc.id : "oliwia", data: WidokPlan.data,
        czas_min: 10 * this.partie, status: "otwarte", typ: "nawazki", zrodlo: r.nr
      });
      Store.zapisz();
      AB.toast("Zadanie naważek dodane dla " + (pomoc ? pomoc.nazwa : "Oliwii") + " ✓");
    }
    if (a === "kalibruj") this._modalKalibracji(r);
  },

  _modalKalibracji(r) {
    const teraz = Store.czasPracy(r.nr);
    const m = AB.el('<div class="modal-tlo"><div class="modal"><h2>Kalibracja czasu</h2>' +
      "<p class=\"maly\">Ile minut pracy rąk zajmuje 1 partia „" + AB.esc(r.nazwa) + "”? " +
      "Domyślnie z arkusza FOODCOST: " + (r.czas_pracy_min || "—") + " min. Zmierz raz stoperem i wpisz — " +
      "symulacje będą liczyć na Twojej liczbie.</p>" +
      '<label class="pole"><span>Czas pracy 1 partii (min)</span><input type="number" id="kal-min" value="' + teraz + '" min="1" max="600"></label>' +
      '<div class="modal-akcje"><button class="btn btn-cichy" data-a="x">Anuluj</button>' +
      '<button class="btn btn-glowny" data-a="ok">Zapisz</button></div></div></div>');
    m.addEventListener("click", e => {
      if (e.target.dataset.a === "x" || e.target === m) m.remove();
      if (e.target.dataset.a === "ok") {
        const v = Number(m.querySelector("#kal-min").value);
        if (v > 0) {
          Store.stan.kalibracja[r.nr] = { czas_pracy_min: v };
          Store.zapisz(); AB.toast("Skalibrowano ✓"); m.remove(); App.render();
        }
      }
    });
    document.body.appendChild(m);
  }
};
