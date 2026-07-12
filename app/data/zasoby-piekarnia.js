// ZASOBY PIEKARNI ALTERBAKE — piece, brygada, szablony zadań, półprodukty.
// Piekarnia rządzi się fermentacją i retardem; IBIS pokładowy to główny piec poranny.
window.AB_ZASOBY_PIEKARNIA = {
  piece: [
    {
      id: "ibis",
      nazwa: "IBIS GT MAXI 3",
      typ: "pokładowy",
      opis: "Główny piec piekarni — 3 pokłady, para impulsowa. Rano ciąg odpieku: chleby (para, wyższa temp.) → bułki → laminowane. Grupuj wg temperatury i pary.",
      poziomy: 3,
      dostepnyOd: "04:00",
      kolor: "piec-ibis"
    },
    {
      id: "bongard",
      nazwa: "Bongard Krystal+",
      typ: "konwekcyjny",
      opis: "Konwekcja — bułki, drobne, dopiek. Jedna temperatura naraz.",
      poziomy: 4,
      dostepnyOd: "04:00",
      kolor: "piec-bongard"
    }
  ],

  chlodnia: {
    nazwa: "Chłodnia Asber",
    zakres: "−2…8°C",
    uwaga: "Retardacja nocna kęsów i mas. Zaparki 4°C/24–48 h. Levain dojrzewa w cieple, potem hamowany chłodem."
  },

  // model wieczorny + poranny odpiek: dzień na tablicy 04:00–14:00
  dzienDomyslny: { od: "04:00", do: "14:00" },

  zespolDomyslny: [
    { id: "piekarz", nazwa: "Piekarz", rola: "szef", od: "04:00", do: "12:00",
      opis: "Mistrz — osąd: gotowość zakwasu, dojrzałość pointage, gotowość garu, nacinanie, prowadzenie pieca." },
    { id: "weronika", nazwa: "Weronika", rola: "pomoc", od: "05:00", do: "13:00",
      opis: "Pomoc — naważki, formowanie wg zdjęcia, załadunek pieca, koszyki." },
    { id: "michal", nazwa: "Michał", rola: "pomoc", od: "05:00", do: "13:00",
      opis: "Pomoc — naważki, dzielenie, mycie, opisywanie, transport." },
    { id: "zuza", nazwa: "Zuza", rola: "pomoc", od: "06:00", do: "14:00",
      opis: "Pomoc — pakowanie, ekspedycja, etykiety, sprzątanie." }
  ],

  szablonyZadan: [
    { id: "dokarm-zakwas", tytul: "Dokarmienie zakwasu (D-1)", czas_min: 8, jednostka: "na zaczyn", rola: "pomoc",
      opis: "Odśwież levain wg tabeli prefermentów: mąka:woda, starter %, temperatura. Etykieta z godziną — sygnał gotowości = kopuła/podwojenie." },
    { id: "nawazki-pk", tytul: "Naważki mąki i dodatków", czas_min: 12, jednostka: "na recepturę", rola: "pomoc",
      opis: "Odważ wg karty (baker's %). Mąki, sól, dodatki osobno. Sól z dala od drożdży/zakwasu do czasu mieszania." },
    { id: "formowanie", tytul: "Formowanie wg zdjęcia", czas_min: 20, jednostka: "na 20 kęsów", rola: "pomoc",
      opis: "Formuj wg wzorca fotograficznego. Napięcie skórki, domknięty szew. Kęsy do koszyków/na tacki, potem retard." },
    { id: "zaladunek", tytul: "Załadunek i rozładunek pieca", czas_min: 10, jednostka: "na wsad", rola: "pomoc",
      opis: "Załaduj wg kolejności z planu. Para na start dla chlebów. Rozładunek na kratki — nie układać ciepłych na płask." },
    { id: "koszyki", tytul: "Przygotowanie koszyków / tacek", czas_min: 10, jednostka: "na komplet", rola: "pomoc",
      opis: "Oprósz koszyki mieszanką mąki (ryżowa + pszenna). Tacki wyłóż. Etykieta toru retardu (do IS-WYP-01)." },
    { id: "nacinanie", tytul: "Nacinanie (lame)", czas_min: 8, jednostka: "na 20 szt.", rola: "szef",
      opis: "Osąd mistrza — kąt i głębokość wg produktu. Kęs prosto z chłodu do pieca (bez temperowania dla retardu kęsów)." },
    { id: "mycie-pk", tytul: "Mycie sprzętu i miesiarki", czas_min: 20, jednostka: "na koniec", rola: "pomoc",
      opis: "Miesiarka, dzieża, skrobki, blaty. Środek wg planu higieny." },
    { id: "pakowanie-pk", tytul: "Pakowanie i etykiety", czas_min: 15, jednostka: "na partię", rola: "pomoc",
      opis: "Studzenie min. do letniego przed pakowaniem (inaczej skropli się w torbie). Etykieta: nazwa, data, alergeny, skład." }
  ],

  polprodukty: [
    { id: "levain", nazwa: "Levain / zakwas", uzycie: [],
      chlodzenie: "dojrzały: hamować chłodem 10°C/20–24 h; dokarmiać co dzień", mrozenie: "NIE dla aktywnego; rezerwę można wysuszyć",
      rada: "Planuj dokarmianie D-1 wg tabeli prefermentów — levain to zegar, nie składnik na już. Podwójna porcja, gdy rano idzie kilka chlebów pszennych." },
    { id: "kesy-laminowane", nazwa: "Kęsy laminowane (croissant/pain au chocolat)", uzycie: ["R-039", "R-040"],
      chlodzenie: "retard nocny w Asber po uformowaniu", mrozenie: "TAK — po uformowaniu, przed garem, do 3 tyg.",
      rada: "Laminuj raz na 2–3 dni większą partię; nadmiar mroź uformowany. Gar ≤ 26–28°C — inaczej masło wycieka (Tom IX). Rano tylko gar + odpiek." },
    { id: "zaparki", nazwa: "Zaparki (yudane / tangzhong / zaparzane ziarno)", uzycie: [],
      chlodzenie: "OBOWIĄZKOWO 4°C, min. 12 h (do 24–48 h)", mrozenie: "krótkie porcje można mrozić",
      rada: "Rób zaparki D-1 — muszą się schłodzić min. 12 h. Yudane żytnia wnosi ~2/3 masy jako wodę — koryguj recepturę." },
    { id: "ciasto-retard-masa", nazwa: "Masa chleba (bulk retard)", uzycie: [],
      chlodzenie: "retard masy w misce: nocny, −2…8°C; tempering rano przed dzieleniem", mrozenie: "NIE — traci strukturę",
      rada: "Domknij zmianę ~13–14, retard masy noc, rano dzielenie/formowanie bez presji. Wyrównaj temp. rdzenia przed dzieleniem." }
  ],

  modelCzasu: {
    udzialStaly: 0.3,
    opis: "Czas aktywny n wsadów mąki = czas bazowy × (0,3 + 0,7 × skala). Bakerskie % — skala liczona względem 10 kg mąki wsadu bazowego. Kalibruj na realnych pomiarach.",
    wsadBazowyKg: 10,   // dla ilu kg mąki podano czas_pracy_min z arkusza
    studzenieMin: 30,
    dekoracjaMin: 10
  }
};
