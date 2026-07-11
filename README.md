# 🥐 Alterbake · Planer Produkcji Cukierni

Mobilne narzędzie do planowania produkcji cukierniczej dla **Oliwii** — kierowniczki cukierni w Alterbake S.C. (Gliwice, „stara piekarnia na nowo”).

Planowanie produkcji przestaje być piętą achillesową: aplikacja układa dzień po piecach, skaluje receptury, liczy naważki, deleguje zadania i podpowiada — wszystko ugruntowane w **złotych standardach Alterbake** i bazie **25 autorytetów** planowania produkcji.

---

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
- Ostrzeżenia: nakładające się wypieki, spadki temperatur, przekroczenie zmiany, przeciążenie osoby.
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
| [`docs/baza-wiedzy/ZS-PLANOWANIE-PRODUKCJI.md`](docs/baza-wiedzy/ZS-PLANOWANIE-PRODUKCJI.md) | **Złoty Standard Planowania Produkcji** — nowy tom wypełniający lukę: 25 autorytetów, horyzonty planowania, drabinka temperaturowa, batching/mrożenie, gradient delegacji, kalendarz sezonowy, pipeline eksperymentów, mierniki, kanon 10 zasad, diagnostyka 13 objawów |
| [`docs/standardy/DESTYLAT-ZLOTYCH-STANDARDOW.md`](docs/standardy/DESTYLAT-ZLOTYCH-STANDARDOW.md) | Destylat istniejących złotych standardów Alterbake (Drive) pod kątem planowania + **audyt 15 luk** w wiedzy firmowej |
| [`docs/RED-TEAM.md`](docs/RED-TEAM.md) | Raport ataku red team na projekt + status poprawek |
| `app/data/wiedza.js` | 60 reguł doradcy + 25 autorytetów + sezon + trendy (generowane) |

## Skąd są dane i jak je aktualizować

- **Receptury**: `app/data/receptury.js` generowany z `Receptury_v2026-06-17.xlsx` (Google Drive) przez [`tools/extract.py`](tools/extract.py). Po aktualizacji receptur w XLSX: pobierz plik jako `receptury.xlsx` obok skryptu i uruchom `python3 tools/extract.py` (wymaga `pip install openpyxl`).
- **Baza wiedzy**: `app/data/wiedza.js` scalany z plików `scratch-*.json` przez [`tools/build-wiedza.py`](tools/build-wiedza.py).
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
