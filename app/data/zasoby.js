// ZASOBY PRACOWNI ALTERBAKE — piece, zespół, szablony zadań, tabela mrożenia
// Wartości domyślne — Oliwia może kalibrować czasy w aplikacji (Ustawienia / karta receptury).

window.AB_ZASOBY = {
  piece: [
    {
      id: "bongard",
      nazwa: "Bongard Krystal+",
      typ: "konwekcyjny",
      opis: "Piec konwekcyjny (wiatrak 1–5). Jedna temperatura naraz — grupuj wypieki od najniższej do najwyższej temperatury.",
      poziomy: 4, // ile form/blach cukierniczych wchodzi na jeden wsad (założenie — do kalibracji)
      dostepnyOd: "06:00",
      kolor: "piec-bongard"
    },
    {
      id: "ibis",
      nazwa: "IBIS GT MAXI 3",
      typ: "pokładowy",
      opis: "Piec pokładowy (3 pokłady). Rano zwykle zajęty przez piekarnię — cukiernia korzysta w drugiej kolejności.",
      poziomy: 3,
      dostepnyOd: "10:00",
      kolor: "piec-ibis"
    },
    {
      id: "smazalnik",
      nazwa: "Smażalnik MechMasz",
      typ: "smażalnik",
      opis: "Pączki i donuty — 180–190°C (CCP2). Partie smażone sekwencyjnie.",
      poziomy: 1,
      dostepnyOd: "06:00",
      kolor: "piec-smazalnik"
    }
  ],

  chlodnia: {
    nazwa: "Chłodnia Asber",
    zakres: "−2…8°C",
    uwaga: "Retardacja i przechowywanie półproduktów. Krem patissiere: max 3°C / 2 dni (CCP5)."
  },

  zespolDomyslny: [
    { id: "oliwia", nazwa: "Oliwia", rola: "szef", od: "06:00", do: "14:00",
      opis: "Kierowniczka cukierni — czynności wymagające osądu: ciasta, kremy, piec, dekoracja." },
    { id: "julia", nazwa: "Julia", rola: "pomoc", od: "07:00", do: "13:00",
      opis: "Pomoc — zadania o niskim osądzie: naważki, pudełka, sprzątanie, obtaczanie." },
    { id: "natalia", nazwa: "Natalia", rola: "pomoc", od: "08:00", do: "14:00",
      opis: "Pomoc — zadania o niskim osądzie: naważki, pudełka, sprzątanie, tulipany." }
  ],

  // Szablony zadań do delegowania — średnie czasy (do kalibracji z produkcją).
  szablonyZadan: [
    { id: "nawazki", tytul: "Naważki składników", czas_min: 10, jednostka: "na recepturę", rola: "pomoc",
      opis: "Odważyć składniki wg karty naważek z aplikacji. Suche i mokre osobno, etykieta z nazwą receptury." },
    { id: "pudelka", tytul: "Opisywanie pudełek", czas_min: 2, jednostka: "na pudełko", rola: "pomoc",
      opis: "Etykieta: produkt, data produkcji, alergeny (z karty produktu), termin przydatności." },
    { id: "sprzatanie-blaty", tytul: "Sprzątanie blatów i stanowisk", czas_min: 15, jednostka: "na stanowisko", rola: "pomoc",
      opis: "Blaty, wagi, miski. Środek dezynfekujący wg planu higieny HACCP." },
    { id: "mycie-form", tytul: "Mycie form i blach", czas_min: 20, jednostka: "na komplet", rola: "pomoc",
      opis: "Tortownice, formy keksowe, blaszki. Suszenie i odkładanie na regał." },
    { id: "tulipany", tytul: "Tulipany papierowe do muffin", czas_min: 5, jednostka: "na 12 szt.", rola: "pomoc",
      opis: "Włożyć papilotki/tulipany do form muffinowych przed dozowaniem ciasta." },
    { id: "obtaczanie", tytul: "Obtaczanie pączków w pudrze", czas_min: 8, jednostka: "na 20 szt.", rola: "pomoc",
      opis: "Obtaczać ciepłe (nie gorące) pączki w cukrze pudrze — po nadziewaniu." },
    { id: "owoce", tytul: "Przygotowanie owoców", czas_min: 15, jednostka: "na partię", rola: "pomoc",
      opis: "Mycie, krojenie, odsączanie (marchew/rabarbar/mango). Rabarbar posypać cukrem 30 min przed użyciem." },
    { id: "prazenie", tytul: "Prażenie orzechów", czas_min: 12, jednostka: "na partię", rola: "pomoc",
      opis: "Pekan/migdały — 160°C, pilnować koloru. Wystudzić przed dodaniem do ciasta." },
    { id: "zmywanie-koncowe", tytul: "Zmywanie końcowe pracowni", czas_min: 30, jednostka: "dziennie", rola: "pomoc",
      opis: "Podłogi, zlewy, kosze. Zamknięcie zmiany wg checklisty." },
    { id: "dekoracja-prosta", tytul: "Dekoracja prosta (posypki, lukier)", czas_min: 10, jednostka: "na partię", rola: "pomoc",
      opis: "Wg zdjęcia wzorcowego z karty produktu. Dekoracje wymagające osądu zostają przy Oliwii." }
  ],

  // Półprodukty: co można zrobić na zapas — chłodzenie / mrożenie (ugruntowane w złotych standardach i praktyce).
  polprodukty: [
    { id: "krem-patissiere", nazwa: "Krem patissiere (pistacjowy)", uzycie: ["C-008"],
      chlodzenie: "max 3°C / 2 dni — CCP5", mrozenie: "NIE — krem na bazie skrobi rozwarstwia się po rozmrożeniu",
      rada: "Rób co 2 dni podwójną partię zamiast codziennie pojedynczej. Etykieta WIP z datą i godziną." },
    { id: "ciasto-kruche", nazwa: "Ciasto maślane / kruche (C-018)", uzycie: ["C-018"],
      chlodzenie: "2 h obowiązkowo przed wałkowaniem, do 3 dni w chłodni", mrozenie: "TAK — walce owinięte folią, do 4 tyg.",
      rada: "Podwójna partia: połowa na dziś, połowa w walcach do zamrażarki. Rozmrażanie: noc w chłodni." },
    { id: "ciasto-brownie", nazwa: "Masa brownie (C-001/C-016)", uzycie: ["C-001", "C-016"],
      chlodzenie: "do 24 h w chłodni (dokręcić folią)", mrozenie: "Upieczone brownie mrozi się bardzo dobrze — do 8 tyg.",
      rada: "Piecz pełną blachę nawet przy mniejszym zamówieniu — nadwyżkę mroź pokrojoną, sprzedawaj po rozmrożeniu nocnym." },
    { id: "ciasto-drozdzowe", nazwa: "Ciasto drożdżowe słodkie (pączki/donuty)", uzycie: ["C-003", "C-010"],
      chlodzenie: "retardacja w Asber: nocna, −2…8°C — kęsy uformowane", mrozenie: "TAK — kęsy po uformowaniu, przed rozrostem, do 2 tyg.",
      rada: "Uformuj wieczorem, retarduj noc, smaż rano prosto z chłodni po dogrzaniu. Wspólne okno smażenia dla pączków i donutów." },
    { id: "ciasto-croissant", nazwa: "Ciasto laminowane (croissant)", uzycie: ["C-004", "C-008"],
      chlodzenie: "retardacja kęsów uformowanych: noc w Asber", mrozenie: "TAK — po uformowaniu, do 3 tyg.; rozrost po rozmrożeniu",
      rada: "Laminuj raz na 2–3 dni większą partię. Gar ≤ 26–28°C — inaczej masło wycieka (Tom IX)." },
    { id: "sery", nazwa: "Masa sernikowa", uzycie: ["C-002", "C-006", "C-013", "C-014"],
      chlodzenie: "do 24 h w chłodni", mrozenie: "Upieczony sernik: TAK, w całości lub porcjach, do 4 tyg.",
      rada: "Serniki piecz dzień przed sprzedażą — tężeją noc w lodówce (karta produktu). Baskijski: środek płynny po wyjęciu — to celowe." },
    { id: "coulis", nazwa: "Coulis mango / frużeliny owocowe", uzycie: ["C-013"],
      chlodzenie: "do 3 dni w chłodni", mrozenie: "TAK — porcjowane, do 8 tyg.",
      rada: "Rób z pełnego opakowania owoców — porcjuj i mroź nadmiar." },
    { id: "babki-gotowe", nazwa: "Babki upieczone (bez lukru)", uzycie: ["C-011", "C-012", "C-015"],
      chlodzenie: "2 dni w temp. pokojowej pod kloszem", mrozenie: "TAK — bez polewy, do 4 tyg.; lukier po rozmrożeniu",
      rada: "Piecz babki w bloku 170–175°C razem z ciastami — ten sam zakres temperatur pieca." }
  ],

  // Model czasu — założenia globalne (do kalibracji).
  modelCzasu: {
    udzialStaly: 0.3, // część czasu pracy niezależna od liczby partii (rozłożenie stanowiska, sprzęt, karta)
    opis: "Czas aktywny n partii = czas 1 partii × (0,3 + 0,7 × n). Założenie: 30% czasu to czynności stałe (stanowisko, sprzęt, mycie po), 70% skaluje się z ilością. Skalibruj na realnych pomiarach — kolumna 'Czas pracy' w FOODCOST.",
    studzenieMin: 30, // minimalne studzenie po wypieku przed pakowaniem/dekoracją
    dekoracjaMin: 10  // domyślny czas wykończenia na partię, gdy receptura nie precyzuje
  }
};
