// UPRAWNIENIA — logowanie profilem z rejestru zespołu i gating edycji.
// Rejestr (alterbake_zespol_v1) pisze wyłącznie Panel Szkoleniowy; wspólny origin
// GitHub Pages = wspólny localStorage. Kontrakt: Panel-szkoleniowy/docs/
// SPEC-APLIKACJA-PRACOWNIKA.md.
//
// Zasady:
// - brak rejestru → tryb legacy: pełny dostęp (samodzielne użycie planera),
// - rejestr obecny → wybór profilu (PIN, jeśli ustawiony); edytować harmonogram
//   i delegować zadania może Właściciel oraz kierownik AKTYWNEGO modułu,
// - pozostali: podgląd + odhaczanie statusu wyłącznie własnych zadań
//   (własność przez mapowanie ustawienia.zespol[].id_prac).
(function () {
  const KLUCZ_REJESTR = "alterbake_zespol_v1";
  const KLUCZ_SESJA = "alterbake_planer_sesja";

  function rejestr() {
    try {
      const surowe = localStorage.getItem(KLUCZ_REJESTR);
      if (!surowe) return null;
      const r = JSON.parse(surowe);
      return r && Array.isArray(r.pracownicy) ? r : null;
    } catch (e) { return null; }
  }

  function sesja() {
    try {
      const s = JSON.parse(sessionStorage.getItem(KLUCZ_SESJA));
      return s && (s.rodzaj === "wlasciciel" || (s.rodzaj === "pracownik" && s.id_prac)) ? s : null;
    } catch (e) { return null; }
  }

  window.Uprawnienia = {
    // czy gating w ogóle obowiązuje (jest rejestr z Panelu Szkoleniowego)
    aktywne() { return !!rejestr(); },
    sesja,

    zaloguj(s) {
      try { sessionStorage.setItem(KLUCZ_SESJA, JSON.stringify(s)); } catch (e) {}
    },

    wyloguj() {
      try { sessionStorage.removeItem(KLUCZ_SESJA); } catch (e) {}
      location.reload();
    },

    pracownik() {
      const s = sesja(), r = rejestr();
      if (!s || s.rodzaj !== "pracownik" || !r) return null;
      return r.pracownicy.find(p => p.id_prac === s.id_prac) || null;
    },

    // pełna edycja: właściciel lub kierownik aktywnego modułu; legacy = wszyscy
    mozeEdytowac() {
      if (!this.aktywne()) return true;
      const s = sesja();
      if (!s) return false;
      if (s.rodzaj === "wlasciciel") return true;
      const p = this.pracownik();
      return !!(p && Array.isArray(p.kierownik) && p.kierownik.includes(Store.modul()));
    },

    // id wpisów zespołu aktywnego modułu powiązanych z zalogowanym pracownikiem
    mojeIdOsob() {
      const s = sesja();
      if (!s || s.rodzaj !== "pracownik") return [];
      return Store.stan.ustawienia.zespol.filter(os => os.id_prac === s.id_prac).map(os => os.id);
    },

    czyMojeZadanie(z) { return this.mojeIdOsob().includes(z.osoba); },

    opisSesji() {
      if (!this.aktywne()) return "";
      const s = sesja();
      if (!s) return "";
      if (s.rodzaj === "wlasciciel") return "Piotr (Właściciel)";
      const p = this.pracownik();
      return p ? p.imie + (this.mozeEdytowac() ? " (kierownik)" : "") : "nieznany profil";
    },

    // pracownicy rejestru do mapowania zespołu w Ustawieniach
    listaRejestru() {
      const r = rejestr();
      return r ? r.pracownicy : [];
    },

    // ekran logowania (overlay); woła po() po udanym logowaniu
    ekranLogowania(po) {
      const r = rejestr();
      const kafel = (etykieta, pod, dataset) =>
        '<button class="btn" style="width:100%;margin:4px 0;text-align:left" ' + dataset + "><b>" +
        AB.esc(etykieta) + "</b>" + (pod ? '<br><span class="wyciszony maly">' + AB.esc(pod) + "</span>" : "") + "</button>";

      const m = AB.el('<div class="modal-tlo" style="z-index:200"><div class="modal">' +
        "<h2>👋 Kto pracuje?</h2>" +
        '<p class="maly wyciszony">Profile zakłada Właściciel w Panelu Szkoleniowym. Harmonogram edytuje Właściciel i kierownicy; reszta zespołu widzi swój plan i odhacza własne zadania.</p>' +
        r.pracownicy.map(p => kafel(p.imie + (p.pin ? " 🔒" : ""),
          p.rola + (Array.isArray(p.kierownik) && p.kierownik.length ? " · kierownik: " + p.kierownik.join(", ") : ""),
          'data-prac="' + AB.esc(p.id_prac) + '"')).join("") +
        kafel("Piotr (Właściciel)" + (r.wlasciciel && r.wlasciciel.pin ? " 🔒" : ""), "pełny dostęp", 'data-wlasciciel="1"') +
        "</div></div>");

      const pytajPin = (oczekiwany, dalej) => {
        const pm = AB.el('<div class="modal-tlo" style="z-index:201"><div class="modal"><h2>🔒 PIN</h2>' +
          '<label class="pole"><span>4 cyfry</span><input id="up-pin" type="password" inputmode="numeric" maxlength="4"></label>' +
          '<p class="maly" id="up-blad" style="color:var(--blad)"></p>' +
          '<div class="modal-akcje"><button class="btn btn-cichy" data-a="x">Wstecz</button>' +
          '<button class="btn btn-glowny" data-a="ok">Wejdź</button></div></div></div>');
        const ok = () => {
          if (pm.querySelector("#up-pin").value === oczekiwany) { pm.remove(); dalej(); }
          else pm.querySelector("#up-blad").textContent = "Błędny PIN.";
        };
        pm.addEventListener("click", e => {
          if (e.target.dataset.a === "x") pm.remove();
          if (e.target.dataset.a === "ok") ok();
        });
        pm.querySelector("#up-pin").addEventListener("keydown", e => { if (e.key === "Enter") ok(); });
        document.body.appendChild(pm);
        pm.querySelector("#up-pin").focus();
      };

      m.addEventListener("click", e => {
        const cel = e.target.closest("[data-prac],[data-wlasciciel]");
        if (!cel) return;
        const wpusc = (s) => { this.zaloguj(s); m.remove(); po(); };
        if (cel.dataset.wlasciciel) {
          const pin = (r.wlasciciel && r.wlasciciel.pin) || "";
          if (pin) pytajPin(pin, () => wpusc({ rodzaj: "wlasciciel" }));
          else wpusc({ rodzaj: "wlasciciel" });
        } else {
          const p = r.pracownicy.find(x => x.id_prac === cel.dataset.prac);
          if (!p) return;
          if (p.pin) pytajPin(p.pin, () => wpusc({ rodzaj: "pracownik", id_prac: p.id_prac }));
          else wpusc({ rodzaj: "pracownik", id_prac: p.id_prac });
        }
      });
      document.body.appendChild(m);
    }
  };
})();
