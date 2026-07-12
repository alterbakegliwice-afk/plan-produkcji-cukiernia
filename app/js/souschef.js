// SOUS CHEF — doradca strategiczny Oliwii.
// Tryb lokalny: odpowiada z bazy wiedzy (złote standardy + 25 autorytetów + sezon + trendy)
// i analizy bieżącego planu. Działa w 100% offline.
// Tryb online (opcjonalny): rozmowa z modelem Claude — wymaga klucza API w Ustawieniach.

window.SousChef = {

  // ── kontekst: co wie doradca ───────────────────────────────────────────
  _kontekstPlanu(data) {
    const dzien = Store.dzien(data);
    const jedn = (window.AB_MODUL || {}).skalowanie === "maka" ? " kg mąki" : " partii";
    if (!dzien.bloki.length) return "Plan dnia " + data + " jest pusty.";
    const linie = dzien.bloki.map(b => {
      const r = AB.receptura(b.nr);
      const koniec = b.start + b.segmenty[b.segmenty.length - 1].do;
      return "• " + r.nazwa + " — " + b.partie + jedn + " (" + AB.zMin(b.start) + "–" + AB.zMin(koniec) +
        ", " + (Czas.temperatura(r) ? Czas.temperatura(r) + "°C" : "smażone/bez pieca") + ", prowadzi: " + b.osoba + ")";
    });
    return "Plan dnia " + data + ":\n" + linie.join("\n");
  },

  // ── tryb lokalny: dopasowanie intencji ─────────────────────────────────
  odpowiedzLokalna(pytanie, data) {
    const q = pytanie.toLowerCase();
    const W = window.AB_WIEDZA || { reguly: [], autorytety: [], sezon: [], trendy: [] };

    // 1. ocena planu
    if (/oce[nń]|omów.*plan|sprawd[zź].*plan|co s[aą]dzisz|plan dnia/.test(q)) {
      return this._ocenPlan(data);
    }
    // 2. sezon (tylko wprost o sezon/miesiąc — nie przechwytuj innych pytań)
    if (/\bsezon|w sezonie|miesi[aą]c|co teraz produkowa|jaki[ei] owoce|kalendarz/.test(q)) {
      const m = W.sezon.find(s => s.miesiac === new Date().getMonth() + 1);
      if (m) return { tekst: "📅 " + m.nazwa + ":\n\n" +
        "Surowce sezonu: " + (m.surowce || []).join("; ") + "\n\n" +
        "Okazje: " + (m.okazje || []).join("; ") + "\n\n" +
        "Co produkować: " + (m.produkty || []).join("; ") + "\n\n💡 " + (m.planowanie || ""),
        zrodlo: "Kalendarz sezonowy" };
    }
    // 3. trendy (wprost)
    if ((W.trendy || []).length && /\btrend|co modne|radar|dubai|crookie|vintage/.test(q)) {
      const top = [...W.trendy].sort((a, b) => b.sila - a.sila).slice(0, 4);
      return { tekst: "📡 Radar trendów (najsilniejsze):\n\n" + top.map(t =>
        "• " + t.nazwa + " (siła " + t.sila + "/5, " + t.horyzont + "): " + t.dopasowanie_alterbake).join("\n\n") +
        "\n\nPełny radar w zakładce Doradca → Trendy. Pomysł? Wrzuć do Pomysłów i przetestuj na 1 blasze.",
        zrodlo: "Radar trendów 2025/26" };
    }

    // WSZYSTKO INNE — pełnotekstowe wyszukiwanie po całej bazie wiedzy: dokumenty,
    // reguły, autorytety, półprodukty, sezon, ORAZ Twoja wiedza własna i nauczone fakty.
    // Dzięki temu doradca korzysta z tego, czego się od Ciebie nauczył.
    const znal = window.Wiedza && Wiedza.odpowiedz(pytanie);
    if (znal && znal.tekst) {
      return { tekst: "Z bazy wiedzy:\n\n" + znal.tekst, zrodlo: znal.zrodlo };
    }

    return { tekst: "Nie znalazłem tego w bazie. Zapytaj inaczej albo dotknij podpowiedzi. Przykłady:\n\n" +
      "• „Oceń mój plan” — analiza dzisiejszego dnia\n• „Co mrozić na zapas?”\n• „Jak delegować?”\n• „Co w sezonie?”\n• „Kolejność pieca / pokładów”\n\n" +
      "Możesz też dopisać własną wiedzę (zakładka 🧠 Moja wiedza) — doradca zacznie z niej korzystać. Albo włącz tryb online (⚙ Ustawienia) — rozmowa z modelem Claude na Twojej bazie.",
      zrodlo: null };
  },

  _ocenPlan(data) {
    const dzien = Store.dzien(data);
    if (!dzien.bloki.length) return { tekst: "Plan na " + data + " jest pusty — dodaj produkty w zakładce Plan, wtedy go omówimy.", zrodlo: null };
    const ostrz = WidokPlan._sprawdz(dzien);
    const rady = Symulacja.sugestie(data);
    let t = "🔍 " + this._kontekstPlanu(data) + "\n\n";
    if (ostrz.length) t += "⚠️ Problemy (" + ostrz.length + "):\n" + ostrz.map(o => "• " + o.tekst).join("\n") + "\n\n";
    else t += "✅ Brak kolizji pieca i zespołu.\n\n";
    if (rady.length) t += "💡 Podpowiedzi:\n" + rady.slice(0, 4).map(r => "• " + r.tytul + ": " + r.tekst).join("\n");
    // obciążenie
    const zespol = Store.stan.ustawienia.zespol;
    const zadania = Store.stan.zadania.filter(z => z.data === data && z.status !== "zrobione");
    if (zadania.length) t += "\n\n📋 Otwarte zadania: " + zadania.length + " (" + AB.min(zadania.reduce((a, z) => a + (z.czas_min || 0), 0)) + ")";
    return { tekst: t, zrodlo: "Symulacja + reguły złotych standardów" };
  },

  // ── tryb online: Claude API ────────────────────────────────────────────
  _systemPrompt(pytanie) {
    const W = window.AB_WIEDZA || {};
    const M = window.AB_MODUL || {};
    const m = (W.sezon || []).find(s => s.miesiac === new Date().getMonth() + 1);
    const piekarnia = M.klucz === "piekarnia";
    // najtrafniejsze fragmenty z lokalnej bazy jako grunt dla modelu (RAG — także online)
    const grunt = (window.Wiedza ? Wiedza.szukaj(pytanie || "planowanie produkcji", 6) : [])
      .map(t => "— " + t.frag.tekst.replace(/\s+/g, " ").trim().slice(0, 300)).join("\n");
    return [
      "Jesteś Sous Chefem — doradcą strategicznym " + (piekarnia ? "piekarza" : "Oliwii, kierowniczki cukierni") +
        " w rzemieślniczej piekarni-cukierni ALTERBAKE S.C. (Gliwice, „stara piekarnia na nowo”).",
      "Rola: pomagasz planować produkcję " + (piekarnia ? "piekarską (fermentacja, retard, prowadzenie zaczynów, poranny odpiek na IBIS-ie, sekwencjonowanie pokładów)" :
        "cukierniczą (sekwencjonowanie pieca, batching, mrożenie, delegacja, sezonowość, eksperymenty)") +
        ". Odpowiadasz po polsku, konkretnie, po partnersku, z liczbami i tolerancjami. Krótko — czyta na telefonie w pracowni.",
      "Sprzęt: piec pokładowy IBIS GT MAXI 3 (3 pokłady, para), konwekcyjny Bongard Krystal+, chłodnia Asber (−2..8°C, retard)" +
        (piekarnia ? ", miesiarka." : ", smażalnik MechMasz (pączki/donuty 180-190°C)."),
      "Kluczowe zasady: planuj od wąskiego gardła (Goldratt); " + (piekarnia
        ? "harmonogram wsteczny od porannego odpieku; levain/prefermenty to zegary — dokarmiaj D-1; retard nocny w Asber; rdzeń ≥92°C (CCP1, sonda nie skórka)."
        : "wypieki od najniższej do najwyższej temperatury; krem patissiere max 3°C/2 dni (CCP5); serniki pieczone dzień przed (tężeją noc)."),
      "Zasada triady: liczba + tolerancja + znak sensoryczny. Testuj liść nie drzewo (nowy produkt = wariant bazy, 1 blacha próbna).",
      m ? "Sezon (" + m.nazwa + "): " + (m.surowce || []).join(", ") + ". " + (m.planowanie || "") : "",
      grunt ? "FRAGMENTY Z BAZY WIEDZY ALTERBAKE (opieraj się na nich, cytuj gdy trzeba):\n" + grunt : ""
    ].filter(Boolean).join("\n");
  },

  async odpowiedzOnline(pytanie, data) {
    const klucz = Store.stan.globalne.apiKey;
    if (!klucz) throw new Error("Brak klucza API — wpisz go w Ustawieniach.");
    const historia = Store.stan.czat.slice(-10).map(w => ({ role: w.rola === "ja" ? "user" : "assistant", content: w.tekst }));
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": klucz,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-opus-4-8",
        max_tokens: 1024,
        system: this._systemPrompt(pytanie),
        messages: [...historia, { role: "user", content: this._kontekstPlanu(data) + "\n\nPytanie Oliwii: " + pytanie }]
      })
    });
    if (!resp.ok) {
      const blad = await resp.json().catch(() => ({}));
      throw new Error("API " + resp.status + ": " + ((blad.error && blad.error.message) || "błąd połączenia"));
    }
    const dane = await resp.json();
    if (dane.stop_reason === "refusal") throw new Error("Model odmówił odpowiedzi — spróbuj przeformułować.");
    const tekst = (dane.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
    return { tekst: tekst || "(pusta odpowiedź)", zrodlo: "Claude (tryb online)" };
  },

  async zapytaj(pytanie, data) {
    if (Store.stan.globalne.trybOnline && Store.stan.globalne.apiKey) {
      try {
        return await this.odpowiedzOnline(pytanie, data);
      } catch (e) {
        const lok = this.odpowiedzLokalna(pytanie, data);
        lok.tekst = "⚠️ Tryb online: " + e.message + " — odpowiadam lokalnie.\n\n" + lok.tekst;
        return lok;
      }
    }
    return this.odpowiedzLokalna(pytanie, data);
  }
};
