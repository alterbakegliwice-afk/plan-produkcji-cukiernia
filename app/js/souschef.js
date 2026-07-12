// SOUS CHEF — doradca strategiczny Oliwii.
// Tryb lokalny: odpowiada z bazy wiedzy (złote standardy + 25 autorytetów + sezon + trendy)
// i analizy bieżącego planu. Działa w 100% offline.
// Tryb online (opcjonalny): rozmowa z modelem Claude — wymaga klucza API w Ustawieniach.

window.SousChef = {

  // ── kontekst: co wie doradca ───────────────────────────────────────────
  _kontekstPlanu(data) {
    const dzien = Store.dzien(data);
    if (!dzien.bloki.length) return "Plan dnia " + data + " jest pusty.";
    const linie = dzien.bloki.map(b => {
      const r = AB.receptura(b.nr);
      const koniec = b.start + b.segmenty[b.segmenty.length - 1].do;
      return "• " + r.nazwa + " ×" + b.partie + " partii (" + AB.zMin(b.start) + "–" + AB.zMin(koniec) +
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
    // 2. sezon
    if (/sezon|miesi[aą]c|co teraz|co produkowa|owoce|lipiec|sierpie|okazje/.test(q)) {
      const m = W.sezon.find(s => s.miesiac === new Date().getMonth() + 1);
      if (m) return { tekst: "📅 " + m.nazwa + " w cukierni rzemieślniczej:\n\n" +
        "Surowce sezonu: " + m.surowce.join("; ") + "\n\n" +
        "Okazje: " + m.okazje.join("; ") + "\n\n" +
        "Co produkować: " + m.produkty.join("; ") + "\n\n" +
        "💡 " + m.planowanie, zrodlo: "Kalendarz sezonowy — ZS Planowanie Produkcji" };
    }
    // 3. mrożenie / zapas
    if (/mro[zż]|zamro|zapas|na zapas|batch|wi[eę]cej kremu|wi[eę]cej ciasta|schłodz|chłodz/.test(q)) {
      const rady = AB_ZASOBY.polprodukty.slice(0, 5).map(p => "• " + p.nazwa + ": " + p.rada).join("\n");
      const reg = W.reguly.filter(r => r.kategoria === "mrozenie" || r.kategoria === "chlodzenie").slice(0, 3)
        .map(r => "• " + r.rada + " (źródło: " + r.zrodlo + ")").join("\n");
      return { tekst: "🧊 Batching i mrożenie strategiczne:\n\n" + rady + "\n\nZe złotych standardów:\n" + reg +
        "\n\nZasada progu: rób podwójną partię, gdy druga partia kosztuje <40% czasu pierwszej i masz zbyt/miejsce w mrozie.",
        zrodlo: "Złote standardy + tabela półproduktów" };
    }
    // 4. delegacja
    if (/deleg|julia|natalia|pomoc|komu da[cć]|zadania|rozdziel/.test(q)) {
      const reg = W.reguly.filter(r => r.kategoria === "delegacja").slice(0, 3)
        .map(r => "• " + r.rada).join("\n");
      return { tekst: "👥 Delegacja wg gradientu osądu:\n\n" +
        "Zostaje przy Tobie (wysoki osąd): ciasta i kremy do oceny sensorycznej, prowadzenie pieca, dekoracja finalna, decyzje jakościowe.\n\n" +
        "Oddajesz pomocy od 1. dnia (niski osąd, checklista): naważki, opisywanie pudełek, mycie form, tulipany, obtaczanie pączków, przygotowanie owoców, sprzątanie.\n\n" + reg +
        "\n\nW zakładce Zadania masz gotowe szablony z czasami — jedno dotknięcie i zadanie idzie do Julii lub Natalii.",
        zrodlo: "ZS Planowanie Produkcji, rozdz. 5 (gradient osądu)" };
    }
    // 5. trendy
    if (/trend|nowo[sś]|inspirac|co modne|dubai|pistacj|crookie|wege|vintage/.test(q)) {
      const top = [...W.trendy].sort((a, b) => b.sila - a.sila).slice(0, 4);
      return { tekst: "📡 Radar trendów (najsilniejsze):\n\n" + top.map(t =>
        "• " + t.nazwa + " (siła " + t.sila + "/5, " + t.horyzont + "): " + t.dopasowanie_alterbake).join("\n\n") +
        "\n\nPełny radar w zakładce Sous Chef → Trendy. Pomysł? Wrzuć do Inspiracji i przetestuj na 1 blasze.",
        zrodlo: "Radar trendów 2025/26" };
    }
    // 6. piec / kolejność
    if (/piec|kolejno|temperatur|bongard|ibis|wsad/.test(q)) {
      const reg = W.reguly.filter(r => r.kategoria === "piec" || r.kategoria === "kolejnosc").slice(0, 4)
        .map(r => "• " + r.rada + " (" + r.zrodlo + ")").join("\n");
      return { tekst: "🔥 Sekwencjonowanie pieca:\n\nZłota zasada: planuj od pieca (wąskie gardło) i układaj wypieki od najniższej do najwyższej temperatury — piec szybciej dogrzewa niż stygnie. Bongard: jedna temperatura naraz. IBIS rano zajęty przez piekarnię.\n\n" + reg +
        "\n\nPrzycisk „Ułóż dzień” w Planie robi to automatycznie.",
        zrodlo: "ZS Planowanie Produkcji, rozdz. 3 (drabinka temperaturowa)" };
    }
    // 7. autorytety / kto
    if (/autorytet|mistrz|kto|herm|grolet|poil|goldratt|ohno|jak robi[aą]/.test(q)) {
      const traf = W.autorytety.filter(a => q.includes(a.nazwa.split(" ").pop().toLowerCase()));
      const lista = (traf.length ? traf : W.autorytety.slice(0, 3)).map(a =>
        "• " + a.nazwa + " (" + a.rola + "): " + a.praktyka + "\n  → U nas: " + a.zastosowanie).join("\n\n");
      return { tekst: "📚 Z bazy 25 autorytetów:\n\n" + lista, zrodlo: "ZS Planowanie Produkcji, rozdz. 1" };
    }
    // 8. skalowanie / czas
    if (/skalow|czas|ile zajmie|jak długo|partii|podwójn/.test(q)) {
      return { tekst: "⏱ Model czasu Alterbake:\n\nCzas rąk n partii = czas 1 partii × (0,3 + 0,7·n) — 30% to czynności stałe (stanowisko, sprzęt, mycie), które robisz raz. Druga partia tego samego produktu kosztuje ~70% czasu pierwszej — dlatego batching się opłaca.\n\nCzas pieca liczy się wsadami (Bongard mieści ~4 formy naraz). Wykres „czas vs ilość” znajdziesz na każdej karcie receptury.\n\nCzasy są średnie — zmierz raz stoperem i skalibruj na karcie receptury.",
        zrodlo: "Model czasu — założenia w app/data/zasoby.js" };
    }
    // 9. reguły ogólne — szukaj po słowach kluczowych
    const slowa = q.split(/\s+/).filter(w => w.length > 4);
    const trafienia = W.reguly.filter(r =>
      slowa.some(w => (r.warunek + " " + r.rada).toLowerCase().includes(w))).slice(0, 3);
    if (trafienia.length) {
      return { tekst: trafienia.map(r => "• " + r.rada + "\n  (kiedy: " + r.warunek + " — źródło: " + r.zrodlo + ")").join("\n\n"),
        zrodlo: "Reguły ze złotych standardów" };
    }

    return { tekst: "Mogę pomóc w tych tematach — zapytaj np.:\n\n• „Oceń mój plan” — analiza dzisiejszego dnia\n• „Co mrozić na zapas?” — batching półproduktów\n• „Jak delegować?” — podział na Ciebie / Julię / Natalię\n• „Co w sezonie?” — kalendarz miesiąca\n• „Trendy” — radar cukierniczy\n• „Kolejność pieca” — sekwencjonowanie wypieków\n\nAlbo włącz tryb online (⚙ Ustawienia) — wtedy rozmawiasz swobodnie z modelem Claude ugruntowanym w Twojej bazie wiedzy.",
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
  _systemPrompt() {
    const W = window.AB_WIEDZA || {};
    const m = (W.sezon || []).find(s => s.miesiac === new Date().getMonth() + 1);
    return [
      "Jesteś Sous Chefem-doradcą strategicznym Oliwii — kierowniczki cukierni w rzemieślniczej piekarni-cukierni ALTERBAKE S.C. (Gliwice).",
      "Twoja rola: pomagasz planować produkcję cukierniczą — sekwencjonowanie pieca, batching, mrożenie, delegacja, sezonowość, eksperymenty. Odpowiadasz po polsku, konkretnie, po partnersku, z liczbami i tolerancjami. Krótko — Oliwia czyta na telefonie w pracowni.",
      "Sprzęt: piec konwekcyjny Bongard Krystal+ (jedna temperatura naraz, ~4 formy/wsad), piec pokładowy IBIS GT MAXI 3 (rano zajęty przez piekarnię), smażalnik MechMasz (pączki/donuty 180-190°C, CCP2), chłodnia Asber (−2..8°C).",
      "Zespół: Oliwia (szef — osąd sensoryczny, piec, dekoracja), Julia i Natalia (pomoc — naważki, pudełka, sprzątanie, owoce; deleguj wg gradientu osądu).",
      "Asortyment C-001..C-018: brownie, serniki (NY, baskijski, mango, tonka — pieczone dzień przed sprzedażą, tężeją noc), pączki różane, croissanty, muffiny, babki, ciastka maślane (ciasto chłodzić 2h, walce można mrozić 4 tyg.), donuty.",
      "Kluczowe zasady złotych standardów: planuj od pieca (wąskie gardło, Goldratt); wypieki od najniższej do najwyższej temperatury; krem patissiere max 3°C/2 dni (CCP5); retardacja kęsów drożdżowych przez noc w Asber; podwójna partia gdy druga kosztuje <40% czasu pierwszej; zasada triady: liczba + tolerancja + znak sensoryczny; testuj liść nie drzewo (nowy produkt = wariant istniejącej bazy, 1 blacha próbna).",
      m ? "Sezon (" + m.nazwa + "): " + (m.surowce || []).join(", ") + ". " + (m.planowanie || "") : "",
      "Wybrane reguły: " + (W.reguly || []).slice(0, 12).map(r => r.rada).join(" | ")
    ].filter(Boolean).join("\n");
  },

  async odpowiedzOnline(pytanie, data) {
    const klucz = Store.stan.ustawienia.apiKey;
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
        system: this._systemPrompt(),
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
    if (Store.stan.ustawienia.trybOnline && Store.stan.ustawienia.apiKey) {
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
