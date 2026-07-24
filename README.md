# 🥐 Alterbake · Planer Produkcji

> **⚠️ ZMIGROWANO DO MONOREPO ALTERBAKE OS (2026-07-24).**
> Kod tego repozytorium żyje teraz w `alterbake-ai-dashboard` w katalogu `apps/planer/` (aplikacja) i `apps/os/` (portal OS)
> (gałąź konsolidacyjna `claude/alterbake-routing-consolidation-lfze3v`; po scaleniu — `main`),
> pod wspólną powłoką z routingiem `#/`. Tam prowadź dalszy rozwój — to repozytorium
> pozostaje archiwum historii sprzed konsolidacji.


Mobilne narzędzie do planowania produkcji dla **Alterbake S.C.** (Gliwice, „stara piekarnia na nowo”) — w **dwóch modułach**:

- 🍰 **Cukiernia** (Oliwia) — 18 produktów C-001…C-018, skalowanie partiami
- 🥖 **Piekarnia** (piekarz) — 40 produktów R-001…R-040, skalowanie w % piekarskich (kg mąki), prowadzenie zaczynów, retard nocny

Przełączasz je jednym dotknięciem ikony w nagłówku (🍰 ↔ 🥖). Każdy moduł ma osobny plan, zadania, pomysły i wiedzę.

Planowanie produkcji przestaje być piętą achillesową: aplikacja układa dzień po piecach, skaluje receptury, liczy naważki, deleguje zadania i podpowiada — wszystko ugruntowane w **złotych standardach Alterbake** (cukiernictwo + piekarstwo) i praktykach **autorytetów** planowania produkcji.

## 🤖 Darmowy doradca AI — bez tokenów, offline, uczy się od Ciebie

Najczęstsze pytanie: *„czy da się postawić AI, które odpowiada z plików wiedzy i samo się uczy, bez płatnych tokenów?”* — **tak, i tak to zrobiliśmy**:

- **Silnik wyszukiwania (BM25) po całej bazie wiedzy** — doradca „Sous Chef" odpowiada na *dowolne* pytanie, zestawiając najtrafniejsze fragmenty z dokumentów, reguł, autorytetów, tabel półproduktów i kalendarza — **z podaniem źródła**. Zero tokenów, zero sieci, działa w samolocie.
- **Uczy się z Twojej pracowni** (uczciwie — nie trenuje sieci neuronowej, tylko gromadzi wiedzę): każda **kalibracja czasu** i każdy **wynik eksperymentu** zapisują się jako fakt; możesz też **dopisać własną wiedzę** (zakładka 🧠 *Moja wiedza*). Wszystko to natychmiast wchodzi do bazy wyszukiwania — doradca zaczyna z tego korzystać w kolejnych odpowiedziach.
- **Opcjonalny tryb online** (Claude API, własny klucz) — gdy chcesz swobodnej rozmowy; model dostaje najtrafniejsze fragmenty Twojej bazy jako grunt (RAG). Domyślnie wyłączony; bez niego wszystko i tak działa.

> Świadomie **nie** stawiamy modelu językowego pobieranego na telefon (WebLLM/WebGPU): 0,5–2 GB do pobrania, kapryśne na iPhonie, słabe po polsku — to byłaby obietnica, która się sypie. Wyszukiwanie + uczenie z pracowni daje realną, cytowalną wartość, która nigdy się nie „zawiesi”.

## ✨ Automatyzacja

- **🤖 Auto-plan** — proponuje zestaw produktów na dzień z Twoich **nawyków** (historia planów) i **sezonu**, po czym układa go symulacją bez kolizji. Korygujesz ilości i gotowe.
- **✅ Zadania z planu** — z gotowego planu generuje naważki (do pomocy) i sprzątanie jednym dotknięciem.
- **🧾 Naważki dnia** — zbiorcza lista składników z całego planu do druku.

---

## 🧭 Portal Alterbake OS (`os/`)

Obok aplikacji, pod `os/index.html` (na GitHub Pages: `…/plan-produkcji-cukiernia/os/`),
żyje **portal Alterbake OS** — wspólny pulpit wszystkich aplikacji Alterbake na tym
originie. Portal:

- pokazuje **stan źródeł danych** tego urządzenia (planer, Panel Szkoleniowy,
  Work Profile, Menu Board) i listę **braków w danych** z linkami do uzupełnienia,
- **generuje rejestr zespołu** (`alterbake_zespol_v1`) z profili Panelu Szkoleniowego
  i pozwala nadać prawa KIEROWNIK per moduł — rejestr czyta Command HUD,
- przyjmuje **zgłoszenia pracowników** (`alterbake_zgloszenia_v1`, log append-only),
- **eksportuje/importuje PACZKĘ OS** — plik JSON przenoszący wspólne klucze do
  prywatnego Command HUD i z powrotem (statusy zgłoszeń wracają do pracowników).

Kontrakty i zasady scalania: `alterbake-ai-dashboard/docs/ALTERBAKE-OS.md`.
Portal jest osobnym plikiem — nie dotyka aplikacji planera.

## Szybki start

Aplikacja to statyczna strona — **bez instalacji, bez serwera, bez kont**.

**Opcja A — GitHub Pages (zalecana):**
1. W repozytorium: *Settings → Pages → Source: Deploy from a branch → main / (root)* → Save.
2. Po chwili aplikacja działa pod `https://<użytkownik>.github.io/plan-produkcji-cukiernia/`.
3. Na telefonie: otwórz link → menu przeglądarki → **„Dodaj do ekranu głównego”**. Od tej pory działa jak apka, także offline.

**Opcja B — lokalnie:**
```bash
python3 -m http.server 8000
# → http://localhost:8000/app/
```

Dane (plany, zadania, inspiracje) żyją w przeglądarce telefonu (localStorage). Kopia zapasowa: **⚙ Ustawienia → Kopia zapasowa** (plik JSON do wczytania na innym urządzeniu).

---

## Co potrafi

### 📋 Plan dnia — oś czasu z piecami
- Bloki produkcyjne na osi 06:00–16:00: przygotowanie (ręce) → fermentacja/chłodzenie (pasywne) → **piec** → studzenie → wykończenie.
- Osobne tory dla **Bongard Krystal+**, **IBIS GT MAXI 3** i **smażalnika MechMasz**.
- **„Ułóż dzień”** — symulacja rozstawia bloki bez kolizji, pilnując drabinki temperatur (piec konwekcyjny grzeje się szybciej niż stygnie → wypieki od najniższej do najwyższej temperatury) i dostępności IBIS-a (rano piekarnia).
- Ostrzeżenia: nakładające się wypieki, spadki temperatur, przekroczenie zmiany, przeciążenie osoby. Smażenie liczy się jako praca rąk (ktoś stoi przy smażalniku).
- **🧾 Naważki dnia** — zbiorcza lista składników z całego planu (suma po blokach) do druku: gotowa lista naważek dla pomocy albo lista zakupów.
- **Inteligentne podpowiedzi**: kiedy zrobić podwójną partię kremu/ciasta i zamrozić, serniki na jutrzejszą witrynę (tężeją noc), wspólne okno smażenia pączków i donutów, delegacja gdy dzień Oliwii pęka w szwach.

### 📖 Receptury — 18 produktów z systemu Receptur XLSX
- Składniki, fazy, parametry pieca, alergeny (wyprowadzone z matrycy surowców), foodcost.
- **Skalowanie**: partie → naważki w gramach (karta do druku), porcje, koszt.
- **Wykres czas vs ilość**: jak rosną czas rąk i czas pieca przy 1…8 partiach — druga partia kosztuje ~70% czasu pierwszej, bo czynności stałe robi się raz.
- **Kalibracja czasu**: zmierz raz stoperem, wpisz — symulacje liczą na Twojej liczbie.
- „Deleguj naważki” — jedno dotknięcie i zadanie idzie do pomocy.

### ✅ Zadania — delegowanie wg gradientu osądu
- Kolumny: **Oliwia** (szef) / **Julia** / **Natalia** (pomoc), z godzinami zmian i licznikiem obciążenia.
- Szablony z czasami: naważki, opisywanie pudełek, sprzątanie, mycie form, tulipany, obtaczanie pączków, owoce, prażenie orzechów…
- Zasada ze złotych standardów: osąd sensoryczny zostaje przy szefie, czynności checklistowe idą do pomocy od pierwszego dnia.

### 💭 Inspiracje — od pomysłu do wdrożenia
- Skrzynka na pomysły (z Instagrama, od klientek, z radaru trendów).
- Pipeline eksperymentu: **pomysł → plan (hipoteza, test na 1 blasze, liczbowe kryteria) → test → ocena → wdrożone/odrzucone**.
- Zasada: *testuj liść, nie buduj drzewa* — nowy produkt najpierw jako wariant istniejącej bazy.

### 👨‍🍳 Sous Chef — doradca strategiczny
- **Czat** ugruntowany w złotych standardach: oceni plan dnia, podpowie co mrozić, jak delegować, jak sekwencjonować piec. Działa w 100% offline.
- **Tryb online (opcjonalny)**: rozmowa z modelem Claude z pełnym kontekstem pracowni — wymaga własnego klucza API (⚙ Ustawienia).
- **📅 Sezon**: kalendarz 12 miesięcy polskiej cukierni (Tłusty Czwartek, mazurki, komunie, truskawka→węgierka, rogale, pierniki, 3 fale grudnia).
- **📡 Trendy**: radar 14 trendów 2025/26 z siłą i horyzontem dla rynku polskiego — jedno dotknięcie i trend ląduje w Inspiracjach.
- **📚 Wiedza**: 25 autorytetów (Hermé, Grolet, Conticini, Robertson, Poilâne, Goldratt, Ohno, Deming…) — praktyka + jak stosować w Alterbake.

---

## Fundament wiedzy

| Dokument | Co zawiera |
|---|---|
| [`docs/baza-wiedzy/ZS-PLANOWANIE-PRODUKCJI.md`](docs/baza-wiedzy/ZS-PLANOWANIE-PRODUKCJI.md) | **Cukiernia** — 25 autorytetów, horyzonty, drabinka temperaturowa, batching/mrożenie, gradient delegacji, kalendarz sezonowy, pipeline eksperymentów, mierniki, kanon 10 zasad, diagnostyka 13 objawów |
| [`docs/baza-wiedzy/ZS-PLANOWANIE-PIEKARNIA.md`](docs/baza-wiedzy/ZS-PLANOWANIE-PIEKARNIA.md) | **Piekarnia** — 18 mistrzów piekarstwa, drzewo 4 ciast-matek → 40 SKU, krytyczna ścieżka doby z harmonogramem wstecznym, prefermenty jako zegary, retard masy vs kęsów, sekwencjonowanie pokładów IBIS, diagnostyka 16 objawów |
| [`docs/standardy/DESTYLAT-ZLOTYCH-STANDARDOW.md`](docs/standardy/DESTYLAT-ZLOTYCH-STANDARDOW.md) | Destylat istniejących złotych standardów Alterbake (Drive) + **audyt 15 luk** w wiedzy firmowej |
| [`docs/RED-TEAM.md`](docs/RED-TEAM.md) | Raport ataku red team na projekt + status poprawek |
| `app/data/wiedza*.js`, `korpus-*.js` | Reguły doradcy (60 cukiernia + 55 piekarnia), autorytety, sezon, trendy oraz pofragmentowane dokumenty do wyszukiwania (generowane) |

## Skąd są dane i jak je aktualizować

- **Receptury**: generowane z `Receptury_v2026-06-17.xlsx` (Google Drive) — cukiernia przez [`tools/extract.py`](tools/extract.py), piekarnia (% piekarskie, prefermenty) przez [`tools/extract-piekarnia.py`](tools/extract-piekarnia.py). Po aktualizacji XLSX: pobierz jako `receptury.xlsx` i uruchom oba skrypty (wymaga `pip install openpyxl`).
- **Baza wiedzy**: `wiedza*.js` scalane z `scratch-*.json` przez [`tools/build-wiedza.py`](tools/build-wiedza.py); `korpus-*.js` (fragmenty dokumentów do wyszukiwania) przez [`tools/build-korpus.py`](tools/build-korpus.py).
- **Czasy pracy**: domyślnie z arkusza FOODCOST („Czas pracy min”) — to szacunki. Model: `czas(n) = czas(1) × (0,3 + 0,7·n)`, pojemność Bongarda ~4 formy/wsad, smażenie ~12 min/partię. **Kalibruj na kartach receptur** — każda zmierzona liczba wypiera założenie.

## Uczciwie o ograniczeniach

- Czasy i pojemności to **punkt startowy do kalibracji**, nie prawda objawiona — zgodnie z zasadą triady Alterbake (liczba + tolerancja + znak sensoryczny).
- Foodcost nie zawiera mediów (prąd/gaz) — tak jak arkusz źródłowy.
- Dane żyją w jednej przeglądarce; wspólny plan dla zespołu = jedno urządzenie w pracowni albo ręczna wymiana kopii JSON. Synchronizacja wielu urządzeń to świadomie odłożona decyzja (wymaga backendu).
- C-004 (Croissant) i C-009 (Saltbread) mają w XLSX tylko parametry procesu — bez składników; w aplikacji oznaczone i planowalne, ale bez naważek.

## Struktura repozytorium

```
app/                 aplikacja PWA (otwórz index.html)
  data/              receptury, zasoby pracowni, baza wiedzy (generowane + ręczne)
  js/                logika: czas, symulacja, sous chef, widoki
docs/                złote standardy, baza wiedzy, raport red team
tools/               skrypty ekstrakcji (XLSX → JS) i scalania wiedzy
scratch-*.json       źródła bazy wiedzy (wejście do build-wiedza.py)
```

---

*Zbudowane dla Alterbake S.C. · Gliwice · v1.0 · lipiec 2026*
