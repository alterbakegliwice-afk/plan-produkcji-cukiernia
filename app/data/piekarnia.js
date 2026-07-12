// AUTO-GENEROWANE z receptury.xlsx (Google Drive) — 2026-07-12
// Moduł PIEKARSKI. Nie edytuj ręcznie — uruchom tools/extract-piekarnia.py.
// Receptury w % piekarskich (baker's %): suma mąk = 100%, reszta względem mąki.
// Koszt liczony na 1 kg mąki wsadu (skalowalny). Braki oznaczone null.
window.AB_PIEKARNIA_RECEPTURY = [
 {
  "nr": "R-001",
  "nazwa": "Chleb na zakwasie Tartine",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna chlebowa T65",
    "typ": "mąka",
    "pct": 90.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": "Silna mąka W>280"
   },
   {
    "nazwa": "Mąka pszenna pełnoziarnista T150",
    "typ": "mąka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Pszenny levain płynny (100%)",
    "typ": "zakwas",
    "pct": 20.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Dojrzały, kopuła aktywna"
   },
   {
    "nazwa": "Woda (autolyse)",
    "typ": "woda",
    "pct": 75.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Temp. 32°C"
   },
   {
    "nazwa": "Woda (bassinage)",
    "typ": "woda",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": "Dodawać powoli na 2. pr. mieszarki — po autolyse"
   },
   {
    "nazwa": "Sól morska",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Po autolyse 30-45 min"
   },
   {
    "nazwa": "Słód pszeniczny",
    "typ": "dodatek",
    "pct": 0.5,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Opcjonalne"
   }
  ],
  "proces": {
   "masa_szt_g": 800.0,
   "szt_blacha": 2.0,
   "forma": "koszyk",
   "wydajnosc_pct": 148.0,
   "ubytek_pct": 12.0,
   "miesz_min": 25.0,
   "t_ciasta": 26.0,
   "ferm_min": 60.0,
   "rozrost_min": 90.0,
   "t_ferm": 24.0,
   "piec": "IBIS GT MAXI 3",
   "ibis_t": 250.0,
   "ibis_min": 50.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 230.0,
   "bong_min": 45.0,
   "wiatrak": 2.0,
   "uwagi": "Nacinać przed załadunkiem; Bongard wiatrak 1 przez pierwsze 10 min"
  },
  "prefermenty": [
   "Pszenny levain płynny (100%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 80.0,
  "czas_pracy_min": 45.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 0.36,
  "brak_cen": [
   "Mąka pszenna chlebowa T65",
   "Słód pszeniczny"
  ]
 },
 {
  "nr": "R-002",
  "nazwa": "Chleb żytni razowy 100%",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka żytnia razowa T2000",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Żytni zakwas razowy (100%)",
    "typ": "zakwas",
    "pct": 40.0,
    "faza": "preferm.",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Min. 20% dla 100% żytniego"
   },
   {
    "nazwa": "Yudane żytnia (200%)",
    "typ": "zaparka",
    "pct": 20.0,
    "faza": "zaparka",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Wnosi ~13% wody — odejmij z wody"
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 55.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Skorygowana o wodę z zaparki"
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Słód barwiący",
    "typ": "dodatek",
    "pct": 1.5,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 800.0,
   "szt_blacha": 3.0,
   "forma": "forma keksowa",
   "wydajnosc_pct": 145.0,
   "ubytek_pct": 11.0,
   "miesz_min": 15.0,
   "t_ciasta": 28.0,
   "ferm_min": 30.0,
   "rozrost_min": 60.0,
   "t_ferm": 28.0,
   "piec": "oba",
   "ibis_t": 220.0,
   "ibis_min": 65.0,
   "para_ibis": "10",
   "poklad": "dolny",
   "bong_t": 200.0,
   "bong_min": 60.0,
   "wiatrak": 1.0,
   "uwagi": "Bongard bez wiatraka lub 1; IBIS dolny pokład dla mocnej spodni"
  },
  "prefermenty": [
   "Żytni zakwas razowy (100%)",
   "Yudane żytnia (200%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 55.0,
  "czas_pracy_min": 40.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 2.83,
  "brak_cen": [
   "Słód barwiący"
  ]
 },
 {
  "nr": "R-003",
  "nazwa": "Chleb pszenno-żytni 70/30",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna chlebowa T65",
    "typ": "mąka",
    "pct": 70.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mąka żytnia T720",
    "typ": "mąka",
    "pct": 30.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Żytni zakwas płynny (125%)",
    "typ": "zakwas",
    "pct": 25.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 65.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Temp. 30°C"
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 800.0,
   "szt_blacha": 3.0,
   "forma": "koszyk/blacha",
   "wydajnosc_pct": 150.0,
   "ubytek_pct": 11.0,
   "miesz_min": 20.0,
   "t_ciasta": 26.0,
   "ferm_min": 45.0,
   "rozrost_min": 75.0,
   "t_ferm": 24.0,
   "piec": "oba",
   "ibis_t": 235.0,
   "ibis_min": 48.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 218.0,
   "bong_min": 43.0,
   "wiatrak": 2.0,
   "uwagi": null
  },
  "prefermenty": [
   "Żytni zakwas płynny (125%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 65.0,
  "czas_pracy_min": 38.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 0.78,
  "brak_cen": [
   "Mąka pszenna chlebowa T65"
  ]
 },
 {
  "nr": "R-004",
  "nazwa": "Bagietki pszenne",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T55 (baguette)",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": "Słabsza mąka W200-230"
   },
   {
    "nazwa": "Poolish pszenny (100%)",
    "typ": "poolish",
    "pct": 35.0,
    "faza": "preferm.",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "0,1% drożdży; 14h w 20°C"
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 62.0,
    "faza": "autolyse",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 0.2,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": "Małe ilości przy poolish"
   }
  ],
  "proces": {
   "masa_szt_g": 350.0,
   "szt_blacha": 6.0,
   "forma": "blacha",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 22.0,
   "miesz_min": 18.0,
   "t_ciasta": 24.0,
   "ferm_min": 20.0,
   "rozrost_min": 45.0,
   "t_ferm": 22.0,
   "piec": "IBIS GT MAXI 3",
   "ibis_t": 260.0,
   "ibis_min": 24.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 240.0,
   "bong_min": 20.0,
   "wiatrak": 3.0,
   "uwagi": "IBIS: 3 impulsy 10s na start; Bongard: 300ml + wiatrak 3; ubytek wysoki"
  },
  "prefermenty": [
   "Poolish pszenny (100%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 62.0,
  "czas_pracy_min": 35.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 0.04,
  "brak_cen": [
   "Mąka pszenna T55 (baguette)"
  ]
 },
 {
  "nr": "R-005",
  "nazwa": "Bułki pszenne klasyczne",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 55.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 2.5,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło",
    "typ": "tłuszcz",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Temp. pokojowa"
   },
   {
    "nazwa": "Mak / sezam",
    "typ": "posypka",
    "pct": 3.0,
    "faza": "posypka",
    "kolejnosc": 7,
    "wariant": "Wariant sezamowy",
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 105.0,
   "szt_blacha": 12.0,
   "forma": "blacha",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 225.0,
   "ibis_min": 18.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 210.0,
   "bong_min": 16.0,
   "wiatrak": 3.0,
   "uwagi": "Bongard równomierniejsze rumienianie; perforowane blachy zalecane"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Mleko",
   "Sezam"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 55.0,
  "czas_pracy_min": 25.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 3.74,
  "brak_cen": [
   "Mak / sezam"
  ]
 },
 {
  "nr": "R-006",
  "nazwa": "Ciabatta",
  "kategoria": "Specialty",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T65",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": "W>280"
   },
   {
    "nazwa": "Biga klasyczna pszenna (52%)",
    "typ": "biga",
    "pct": 40.0,
    "faza": "preferm.",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Kruszyć przed dodaniem"
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 78.0,
    "faza": "autolyse",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Bassinage — dodawać stopniowo"
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 0.3,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Oliwa z oliwek",
    "typ": "tłuszcz",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 200.0,
   "szt_blacha": 6.0,
   "forma": "blacha",
   "wydajnosc_pct": 160.0,
   "ubytek_pct": 13.0,
   "miesz_min": 20.0,
   "t_ciasta": 26.0,
   "ferm_min": 60.0,
   "rozrost_min": 60.0,
   "t_ferm": 24.0,
   "piec": "IBIS GT MAXI 3",
   "ibis_t": 245.0,
   "ibis_min": 22.0,
   "para_ibis": "10",
   "poklad": "dolny",
   "bong_t": 225.0,
   "bong_min": 19.0,
   "wiatrak": 3.0,
   "uwagi": "Bardzo delikatne ciasto; IBIS pokład dolny dla chrupiącej spodni"
  },
  "prefermenty": [
   "Biga klasyczna pszenna (52%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 78.0,
  "czas_pracy_min": 40.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 3.21,
  "brak_cen": []
 },
 {
  "nr": "R-007",
  "nazwa": "Focaccia",
  "kategoria": "Specialty",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T65",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 75.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 1.5,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Oliwa z oliwek (ciasto)",
    "typ": "tłuszcz",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Oliwa z oliwek (wierzch)",
    "typ": "tłuszcz",
    "pct": 3.0,
    "faza": "posypka",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Przed pieczeniem"
   },
   {
    "nazwa": "Sól gruboziarnista",
    "typ": "posypka",
    "pct": 1.0,
    "faza": "posypka",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Rozmaryn świeży",
    "typ": "aromat",
    "pct": 0.5,
    "faza": "posypka",
    "kolejnosc": 8,
    "wariant": "Wariant ziołowy",
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 1800.0,
   "szt_blacha": 3.0,
   "forma": "blaszka 60x40",
   "wydajnosc_pct": 162.0,
   "ubytek_pct": 11.0,
   "miesz_min": 15.0,
   "t_ciasta": 26.0,
   "ferm_min": 30.0,
   "rozrost_min": 60.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 230.0,
   "ibis_min": 25.0,
   "para_ibis": "0",
   "poklad": "środkowy",
   "bong_t": 220.0,
   "bong_min": 22.0,
   "wiatrak": 2.0,
   "uwagi": "Brak pary; Bongard: wiatrak 2 dla równomiernego wypieku"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 75.0,
  "czas_pracy_min": 30.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 2.92,
  "brak_cen": [
   "Oliwa z oliwek (ciasto)",
   "Oliwa z oliwek (wierzch)"
  ]
 },
 {
  "nr": "R-008",
  "nazwa": "Chleb tostowy",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Tangzhong pszenny (500%)",
    "typ": "zaparka",
    "pct": 6.0,
    "faza": "zaparka",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Gotować do 65°C"
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 30.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 25.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 2.5,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.8,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło",
    "typ": "tłuszcz",
    "pct": 8.0,
    "faza": "ciasto",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": "Temp. pokojowa"
   },
   {
    "nazwa": "Jajko",
    "typ": "jajka",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 9,
    "wariant": null,
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 800.0,
   "szt_blacha": 4.0,
   "forma": "forma tostowa",
   "wydajnosc_pct": 165.0,
   "ubytek_pct": 10.0,
   "miesz_min": 20.0,
   "t_ciasta": 27.0,
   "ferm_min": 30.0,
   "rozrost_min": 60.0,
   "t_ferm": 26.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 185.0,
   "ibis_min": 35.0,
   "para_ibis": "0",
   "poklad": "środkowy",
   "bong_t": 180.0,
   "bong_min": 32.0,
   "wiatrak": 2.0,
   "uwagi": "Brak pary; Bongard idealny do form; przykryć folią ostatnie 10 min"
  },
  "prefermenty": [
   "Tangzhong pszenny (500%)"
  ],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 25.0,
  "czas_pracy_min": 35.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 5.74,
  "brak_cen": [
   "Jajko",
   "Mleko pełne"
  ]
 },
 {
  "nr": "R-009",
  "nazwa": "Bułki graham",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna chlebowa T650",
    "typ": "mąka",
    "pct": 70.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mąka graham T1850",
    "typ": "mąka",
    "pct": 30.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 58.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Miód",
    "typ": "cukier",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Otręby pszenne (posypka)",
    "typ": "posypka",
    "pct": 3.0,
    "faza": "posypka",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 100.0,
   "szt_blacha": 10.0,
   "forma": "blacha",
   "wydajnosc_pct": 152.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "oba",
   "ibis_t": 215.0,
   "ibis_min": 20.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 200.0,
   "bong_min": 18.0,
   "wiatrak": 3.0,
   "uwagi": null
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 58.0,
  "czas_pracy_min": 28.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 1.0,
  "brak_cen": [
   "Miód",
   "Mąka pszenna chlebowa T650",
   "Otręby pszenne (posypka)"
  ]
 },
 {
  "nr": "R-010",
  "nazwa": "Rogale maślane",
  "kategoria": "Słodkie",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 45.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.4,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 12.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło (ciasto)",
    "typ": "tłuszcz",
    "pct": 15.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Zimne, kostki"
   },
   {
    "nazwa": "Jajko",
    "typ": "jajka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło (laminowanie)",
    "typ": "tłuszcz",
    "pct": 40.0,
    "faza": "laminacja",
    "kolejnosc": 8,
    "wariant": "Wariant croissant",
    "uwagi": "Zimne 8°C"
   }
  ],
  "proces": {
   "masa_szt_g": 100.0,
   "szt_blacha": 10.0,
   "forma": "blacha",
   "wydajnosc_pct": 165.0,
   "ubytek_pct": 8.0,
   "miesz_min": 20.0,
   "t_ciasta": 24.0,
   "ferm_min": 30.0,
   "rozrost_min": 60.0,
   "t_ferm": 26.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 180.0,
   "ibis_min": 22.0,
   "para_ibis": "0",
   "poklad": "górny",
   "bong_t": 170.0,
   "bong_min": 20.0,
   "wiatrak": 2.0,
   "uwagi": "Brak pary; Bongard: wiatrak 2; IBIS górny pokład"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 0.0,
  "czas_pracy_min": 50.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 2.88,
  "brak_cen": [
   "Jajko",
   "Masło (ciasto)",
   "Masło (laminowanie)",
   "Mleko pełne"
  ]
 },
 {
  "nr": "R-011",
  "nazwa": "Chleb orkiszowy",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka orkiszowa T630",
    "typ": "mąka",
    "pct": 80.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mąka orkiszowa razowa T2000",
    "typ": "mąka",
    "pct": 20.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Orkiszowy zakwas płynny (100%)",
    "typ": "zakwas",
    "pct": 20.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Szybciej niż pszenny"
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 70.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Temp. 28°C — nie przekraczać 26°C ciasta"
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Oliwa z oliwek",
    "typ": "tłuszcz",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 500.0,
   "szt_blacha": 3.0,
   "forma": "foremka",
   "wydajnosc_pct": 148.0,
   "ubytek_pct": 12.0,
   "miesz_min": 18.0,
   "t_ciasta": 25.0,
   "ferm_min": 45.0,
   "rozrost_min": 75.0,
   "t_ferm": 22.0,
   "piec": "oba",
   "ibis_t": 230.0,
   "ibis_min": 45.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 212.0,
   "bong_min": 40.0,
   "wiatrak": 2.0,
   "uwagi": "Orkisz: autolyse max 20 min, temp ciasta max 26°C"
  },
  "prefermenty": [
   "Orkiszowy zakwas płynny (100%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 70.0,
  "czas_pracy_min": 42.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 5.19,
  "brak_cen": []
 },
 {
  "nr": "R-012",
  "nazwa": "Drożdżówki z nadzieniem",
  "kategoria": "Słodkie",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 40.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 4.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.4,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 15.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło",
    "typ": "tłuszcz",
    "pct": 15.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Jajko",
    "typ": "jajka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Nadzienie (dżem/budyń)",
    "typ": "dodatek",
    "pct": 30.0,
    "faza": "posypka",
    "kolejnosc": 8,
    "wariant": "Wariant dżemowy",
    "uwagi": "~30g/szt"
   }
  ],
  "proces": {
   "masa_szt_g": 150.0,
   "szt_blacha": 10.0,
   "forma": "blacha",
   "wydajnosc_pct": 168.0,
   "ubytek_pct": 8.0,
   "miesz_min": 20.0,
   "t_ciasta": 26.0,
   "ferm_min": 30.0,
   "rozrost_min": 50.0,
   "t_ferm": 26.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 175.0,
   "ibis_min": 18.0,
   "para_ibis": "0",
   "poklad": "górny",
   "bong_t": 165.0,
   "bong_min": 16.0,
   "wiatrak": 2.0,
   "uwagi": null
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 0.0,
  "czas_pracy_min": 45.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 8.82,
  "brak_cen": [
   "Jajko",
   "Mleko pełne",
   "Nadzienie (dżem/budyń)"
  ]
 },
 {
  "nr": "R-013",
  "nazwa": "Chleb z ziarnami",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna chlebowa T65",
    "typ": "mąka",
    "pct": 80.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mąka żytnia T720",
    "typ": "mąka",
    "pct": 20.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Pszenny levain płynny (100%)",
    "typ": "zakwas",
    "pct": 20.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 70.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Siemię lniane (namoczone)",
    "typ": "ziarno",
    "pct": 8.0,
    "faza": "namocz.",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Namaczać 8h w 2× wody"
   },
   {
    "nazwa": "Słonecznik (namoczony)",
    "typ": "ziarno",
    "pct": 8.0,
    "faza": "namocz.",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Dynia (namoczona)",
    "typ": "ziarno",
    "pct": 5.0,
    "faza": "namocz.",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mak (posypka)",
    "typ": "posypka",
    "pct": 3.0,
    "faza": "posypka",
    "kolejnosc": 9,
    "wariant": null,
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 750.0,
   "szt_blacha": 4.0,
   "forma": "forma",
   "wydajnosc_pct": 150.0,
   "ubytek_pct": 12.0,
   "miesz_min": 22.0,
   "t_ciasta": 26.0,
   "ferm_min": 50.0,
   "rozrost_min": 80.0,
   "t_ferm": 24.0,
   "piec": "oba",
   "ibis_t": 235.0,
   "ibis_min": 50.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 215.0,
   "bong_min": 45.0,
   "wiatrak": 2.0,
   "uwagi": "Namoczenie ziaren 8-12h przed; IBIS środkowy lub dolny"
  },
  "prefermenty": [
   "Pszenny levain płynny (100%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 70.0,
  "czas_pracy_min": 45.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 0.53,
  "brak_cen": [
   "Dynia (namoczona)",
   "Mak (posypka)",
   "Mąka pszenna chlebowa T65",
   "Siemię lniane (namoczone)",
   "Słonecznik (namoczony)"
  ]
 },
 {
  "nr": "R-014",
  "nazwa": "Saltbread",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 50.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.8,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 4.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło",
    "typ": "tłuszcz",
    "pct": 6.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Jajko (glazura)",
    "typ": "jajka",
    "pct": 5.0,
    "faza": "posypka",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Roztrzepane przed nałożeniem"
   }
  ],
  "proces": {
   "masa_szt_g": 100.0,
   "szt_blacha": 12.0,
   "forma": "blacha",
   "wydajnosc_pct": 162.0,
   "ubytek_pct": 9.0,
   "miesz_min": 18.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 26.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 195.0,
   "ibis_min": 17.0,
   "para_ibis": "0",
   "poklad": "górny",
   "bong_t": 185.0,
   "bong_min": 15.0,
   "wiatrak": 2.0,
   "uwagi": "Bez pary; smarować masłem po wyjęciu — połysk i miękkość"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 0.0,
  "czas_pracy_min": 30.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 4.98,
  "brak_cen": [
   "Jajko (glazura)",
   "Mleko pełne"
  ]
 },
 {
  "nr": "R-015",
  "nazwa": "Chleb pszenno-orkiszowy",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T65",
    "typ": "mąka",
    "pct": 60.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mąka orkiszowa T630",
    "typ": "mąka",
    "pct": 40.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Pszenny levain płynny (100%)",
    "typ": "zakwas",
    "pct": 20.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 70.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 800.0,
   "szt_blacha": 3.0,
   "forma": "koszyk",
   "wydajnosc_pct": 150.0,
   "ubytek_pct": 12.0,
   "miesz_min": 20.0,
   "t_ciasta": 25.0,
   "ferm_min": 45.0,
   "rozrost_min": 75.0,
   "t_ferm": 24.0,
   "piec": "oba",
   "ibis_t": 232.0,
   "ibis_min": 47.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 214.0,
   "bong_min": 42.0,
   "wiatrak": 2.0,
   "uwagi": null
  },
  "prefermenty": [
   "Pszenny levain płynny (100%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 70.0,
  "czas_pracy_min": 42.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 3.27,
  "brak_cen": []
 },
 {
  "nr": "R-016",
  "nazwa": "Bułki wieloziarniste",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T650",
    "typ": "mąka",
    "pct": 70.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mąka żytnia T720",
    "typ": "mąka",
    "pct": 20.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mąka graham T1850",
    "typ": "mąka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 60.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Miód",
    "typ": "cukier",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mix ziaren (posypka)",
    "typ": "posypka",
    "pct": 5.0,
    "faza": "posypka",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": "Zwilżyć bułkę przed posypaniem"
   }
  ],
  "proces": {
   "masa_szt_g": 110.0,
   "szt_blacha": 10.0,
   "forma": "blacha",
   "wydajnosc_pct": 154.0,
   "ubytek_pct": 10.0,
   "miesz_min": 18.0,
   "t_ciasta": 25.0,
   "ferm_min": 25.0,
   "rozrost_min": 55.0,
   "t_ferm": 24.0,
   "piec": "oba",
   "ibis_t": 220.0,
   "ibis_min": 20.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 205.0,
   "bong_min": 18.0,
   "wiatrak": 3.0,
   "uwagi": "Posypka: zamoczyć wierzchnią warstwę przed posypaniem"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 60.0,
  "czas_pracy_min": 30.0,
  "cena_obecna": null,
  "koszt_na_kg_maki": 2.6,
  "brak_cen": [
   "Mix ziaren (posypka)",
   "Miód"
  ]
 },
 {
  "nr": "R-017",
  "nazwa": "Bułki maślane",
  "kategoria": "Słodkie",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 45.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.4,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 12.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło (ciasto)",
    "typ": "tłuszcz",
    "pct": 15.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Zimne, kostki — dodawać stopniowo"
   },
   {
    "nazwa": "Jajko",
    "typ": "jajka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło (glazura)",
    "typ": "tłuszcz",
    "pct": 5.0,
    "faza": "posypka",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": "Roztopione — smarować po wypieku"
   }
  ],
  "proces": {
   "masa_szt_g": 100.0,
   "szt_blacha": 10.0,
   "forma": "blacha",
   "wydajnosc_pct": 165.0,
   "ubytek_pct": 8.0,
   "miesz_min": 20.0,
   "t_ciasta": 24.0,
   "ferm_min": 30.0,
   "rozrost_min": 60.0,
   "t_ferm": 26.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 180.0,
   "ibis_min": 22.0,
   "para_ibis": "0",
   "poklad": "górny",
   "bong_t": 170.0,
   "bong_min": 20.0,
   "wiatrak": 2.0,
   "uwagi": "Brak pary; Bongard: wiatrak 2; IBIS górny pokład"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 0.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 2.88,
  "brak_cen": [
   "Jajko",
   "Masło (ciasto)",
   "Masło (glazura)",
   "Mleko pełne"
  ]
 },
 {
  "nr": "R-018",
  "nazwa": "Sześciopaki maślane z ziarnami",
  "kategoria": "Słodkie",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 45.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.4,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 12.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło (ciasto)",
    "typ": "tłuszcz",
    "pct": 15.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Zimne, kostki"
   },
   {
    "nazwa": "Jajko",
    "typ": "jajka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mix ziaren (sezam, mak, słonecznik)",
    "typ": "posypka",
    "pct": 5.0,
    "faza": "posypka",
    "kolejnosc": 8,
    "wariant": "Wariant mieszany",
    "uwagi": "Zwilżyć bułkę przed posypaniem"
   },
   {
    "nazwa": "Masło (glazura)",
    "typ": "tłuszcz",
    "pct": 5.0,
    "faza": "posypka",
    "kolejnosc": 9,
    "wariant": null,
    "uwagi": "Roztopione — smarować po wypieku"
   }
  ],
  "proces": {
   "masa_szt_g": 80.0,
   "szt_blacha": 10.0,
   "forma": "blacha",
   "wydajnosc_pct": 165.0,
   "ubytek_pct": 8.0,
   "miesz_min": 20.0,
   "t_ciasta": 24.0,
   "ferm_min": 30.0,
   "rozrost_min": 60.0,
   "t_ferm": 26.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 180.0,
   "ibis_min": 22.0,
   "para_ibis": "0",
   "poklad": "górny",
   "bong_t": 170.0,
   "bong_min": 20.0,
   "wiatrak": 2.0,
   "uwagi": "Brak pary; Bongard: wiatrak 2; IBIS górny pokład"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko",
   "Sezam"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 0.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 2.88,
  "brak_cen": [
   "Jajko",
   "Masło (ciasto)",
   "Masło (glazura)",
   "Mix ziaren (sezam, mak, słonecznik)",
   "Mleko pełne"
  ]
 },
 {
  "nr": "R-019",
  "nazwa": "Chałki",
  "kategoria": "Słodkie",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": "Silna mąka W>260"
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 40.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 3.5,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.5,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 15.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło",
    "typ": "tłuszcz",
    "pct": 18.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Temp. pokojowa, dodawać na końcu"
   },
   {
    "nazwa": "Jajko",
    "typ": "jajka",
    "pct": 15.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Jajko (glazura)",
    "typ": "jajka",
    "pct": 5.0,
    "faza": "posypka",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": "Roztrzepać z łyżką mleka, smarować przed pieczeniem"
   },
   {
    "nazwa": "Sezam lub mak",
    "typ": "posypka",
    "pct": 3.0,
    "faza": "posypka",
    "kolejnosc": 9,
    "wariant": "Wariant sezam/mak",
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 400.0,
   "szt_blacha": 5.0,
   "forma": "forma",
   "wydajnosc_pct": 165.0,
   "ubytek_pct": 8.0,
   "miesz_min": 20.0,
   "t_ciasta": 24.0,
   "ferm_min": 30.0,
   "rozrost_min": 60.0,
   "t_ferm": 26.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 180.0,
   "ibis_min": 22.0,
   "para_ibis": "0",
   "poklad": "górny",
   "bong_t": 170.0,
   "bong_min": 20.0,
   "wiatrak": 2.0,
   "uwagi": "Brak pary; Bongard: wiatrak 2; IBIS górny pokład"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko",
   "Sezam"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 0.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 9.94,
  "brak_cen": [
   "Jajko",
   "Jajko (glazura)",
   "Mleko pełne",
   "Sezam lub mak"
  ]
 },
 {
  "nr": "R-020",
  "nazwa": "Chleb na zakwasie Tartine z orzechem włoskim i żurawiną",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna chlebowa T65",
    "typ": "mąka",
    "pct": 90.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": "Silna mąka W>280"
   },
   {
    "nazwa": "Mąka pszenna pełnoziarnista T150",
    "typ": "mąka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Pszenny levain płynny (100%)",
    "typ": "zakwas",
    "pct": 20.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Dojrzały, kopuła aktywna"
   },
   {
    "nazwa": "Woda (autolyse)",
    "typ": "woda",
    "pct": 75.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Temp. 32°C"
   },
   {
    "nazwa": "Woda (bassinage)",
    "typ": "woda",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": "Dodawać powoli na 2. pr. mieszarki — po autolyse"
   },
   {
    "nazwa": "Sól morska",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Po autolyse 30–45 min"
   },
   {
    "nazwa": "Orzechy włoskie",
    "typ": "ziarno",
    "pct": 20.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": "Wariant orzechowy",
    "uwagi": "Prażone, grubo siekane — dodać na końcu wyrabiania"
   },
   {
    "nazwa": "Żurawina suszona",
    "typ": "dodatek",
    "pct": 15.0,
    "faza": "ciasto",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": "Namoczyć 15 min w zimnej wodzie, odsączyć"
   }
  ],
  "proces": {
   "masa_szt_g": 800.0,
   "szt_blacha": 2.0,
   "forma": "koszyk",
   "wydajnosc_pct": 148.0,
   "ubytek_pct": 12.0,
   "miesz_min": 25.0,
   "t_ciasta": 26.0,
   "ferm_min": 60.0,
   "rozrost_min": 90.0,
   "t_ferm": 24.0,
   "piec": "IBIS GT MAXI 3",
   "ibis_t": 250.0,
   "ibis_min": 50.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 230.0,
   "bong_min": 45.0,
   "wiatrak": 2.0,
   "uwagi": "Nacinać przed załadunkiem; Bongard wiatrak 1 przez pierwsze 10 min"
  },
  "prefermenty": [
   "Pszenny levain płynny (100%)"
  ],
  "alergeny": [
   "Gluten",
   "Orzechy"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 80.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 0.36,
  "brak_cen": [
   "Mąka pszenna chlebowa T65",
   "Orzechy włoskie",
   "Żurawina suszona"
  ]
 },
 {
  "nr": "R-021",
  "nazwa": "Chleb na zakwasie Tartine z serem cheddar i papryką jalapeno",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna chlebowa T65",
    "typ": "mąka",
    "pct": 90.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": "Silna mąka W>280"
   },
   {
    "nazwa": "Mąka pszenna pełnoziarnista T150",
    "typ": "mąka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Pszenny levain płynny (100%)",
    "typ": "zakwas",
    "pct": 20.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Dojrzały, kopuła aktywna"
   },
   {
    "nazwa": "Woda (autolyse)",
    "typ": "woda",
    "pct": 75.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Temp. 32°C"
   },
   {
    "nazwa": "Woda (bassinage)",
    "typ": "woda",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": "Dodawać powoli na 2. pr. mieszarki — po autolyse"
   },
   {
    "nazwa": "Sól morska",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Po autolyse 30–45 min"
   },
   {
    "nazwa": "Ser cheddar w kostce",
    "typ": "inclusion",
    "pct": 25.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": "Wariant serowy",
    "uwagi": "Inclusion — nie wliczać do hydratacji ciasta"
   },
   {
    "nazwa": "Papryka jalapeno (kiszona, odsączona)",
    "typ": "inclusion",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": "Inclusion — nie wliczać do hydratacji ciasta"
   }
  ],
  "proces": {
   "masa_szt_g": 800.0,
   "szt_blacha": 2.0,
   "forma": "koszyk",
   "wydajnosc_pct": 148.0,
   "ubytek_pct": 12.0,
   "miesz_min": 25.0,
   "t_ciasta": 26.0,
   "ferm_min": 60.0,
   "rozrost_min": 90.0,
   "t_ferm": 24.0,
   "piec": "IBIS GT MAXI 3",
   "ibis_t": 250.0,
   "ibis_min": 50.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 230.0,
   "bong_min": 45.0,
   "wiatrak": 2.0,
   "uwagi": "Nacinać przed załadunkiem; Bongard wiatrak 1 przez pierwsze 10 min"
  },
  "prefermenty": [
   "Pszenny levain płynny (100%)"
  ],
  "alergeny": [
   "Gluten",
   "Mleko"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 80.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 0.36,
  "brak_cen": [
   "Mąka pszenna chlebowa T65",
   "Papryka jalapeno (kiszona, odsączona)",
   "Ser cheddar w kostce"
  ]
 },
 {
  "nr": "R-022",
  "nazwa": "Chleb na zakwasie Tartine ziarnisty z czarnuszką",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna chlebowa T65",
    "typ": "mąka",
    "pct": 90.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": "Silna mąka W>280"
   },
   {
    "nazwa": "Mąka pszenna pełnoziarnista T150",
    "typ": "mąka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Pszenny levain płynny (100%)",
    "typ": "zakwas",
    "pct": 20.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Dojrzały, kopuła aktywna"
   },
   {
    "nazwa": "Woda (autolyse)",
    "typ": "woda",
    "pct": 75.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Temp. 32°C"
   },
   {
    "nazwa": "Woda (bassinage)",
    "typ": "woda",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": "Dodawać powoli na 2. pr. mieszarki — po autolyse"
   },
   {
    "nazwa": "Sól morska",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Po autolyse 30–45 min"
   },
   {
    "nazwa": "Słonecznik łuskany (prażony)",
    "typ": "ziarno",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": "Wariant ziarnisty",
    "uwagi": "Prażyć na suchej patelni do zapachu"
   },
   {
    "nazwa": "Siemię lniane",
    "typ": "ziarno",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": "Dodać z ziarnami"
   },
   {
    "nazwa": "Czarnuszka",
    "typ": "posypka",
    "pct": 2.0,
    "faza": "posypka",
    "kolejnosc": 9,
    "wariant": null,
    "uwagi": "Posypać wierzch przed rozrostem"
   }
  ],
  "proces": {
   "masa_szt_g": 800.0,
   "szt_blacha": 2.0,
   "forma": "koszyk",
   "wydajnosc_pct": 148.0,
   "ubytek_pct": 12.0,
   "miesz_min": 25.0,
   "t_ciasta": 26.0,
   "ferm_min": 60.0,
   "rozrost_min": 90.0,
   "t_ferm": 24.0,
   "piec": "IBIS GT MAXI 3",
   "ibis_t": 250.0,
   "ibis_min": 50.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 230.0,
   "bong_min": 45.0,
   "wiatrak": 2.0,
   "uwagi": "Nacinać przed załadunkiem; Bongard wiatrak 1 przez pierwsze 10 min"
  },
  "prefermenty": [
   "Pszenny levain płynny (100%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 80.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 0.69,
  "brak_cen": [
   "Czarnuszka",
   "Mąka pszenna chlebowa T65",
   "Słonecznik łuskany (prażony)"
  ]
 },
 {
  "nr": "R-023",
  "nazwa": "Chleb na zakwasie Tartine z oliwką, skórką cytryny i rozmarynem",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna chlebowa T65",
    "typ": "mąka",
    "pct": 90.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": "Silna mąka W>280"
   },
   {
    "nazwa": "Mąka pszenna pełnoziarnista T150",
    "typ": "mąka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Pszenny levain płynny (100%)",
    "typ": "zakwas",
    "pct": 20.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Dojrzały, kopuła aktywna"
   },
   {
    "nazwa": "Woda (autolyse)",
    "typ": "woda",
    "pct": 75.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Temp. 32°C"
   },
   {
    "nazwa": "Woda (bassinage)",
    "typ": "woda",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": "Dodawać powoli na 2. pr. mieszarki — po autolyse"
   },
   {
    "nazwa": "Sól morska",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Po autolyse 30–45 min"
   },
   {
    "nazwa": "Oliwki czarne (bez pestek)",
    "typ": "dodatek",
    "pct": 20.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": "Wariant prowansalski",
    "uwagi": "Grube plastry, odsączone"
   },
   {
    "nazwa": "Skórka cytryny",
    "typ": "aromat",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": "Świeżo starta, bez białej części"
   },
   {
    "nazwa": "Rozmaryn świeży",
    "typ": "aromat",
    "pct": 1.0,
    "faza": "ciasto",
    "kolejnosc": 9,
    "wariant": null,
    "uwagi": "Drobno siekany"
   }
  ],
  "proces": {
   "masa_szt_g": 800.0,
   "szt_blacha": 2.0,
   "forma": "koszyk",
   "wydajnosc_pct": 148.0,
   "ubytek_pct": 12.0,
   "miesz_min": 25.0,
   "t_ciasta": 26.0,
   "ferm_min": 60.0,
   "rozrost_min": 90.0,
   "t_ferm": 24.0,
   "piec": "IBIS GT MAXI 3",
   "ibis_t": 250.0,
   "ibis_min": 50.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 230.0,
   "bong_min": 45.0,
   "wiatrak": 2.0,
   "uwagi": "Nacinać przed załadunkiem; Bongard wiatrak 1 przez pierwsze 10 min"
  },
  "prefermenty": [
   "Pszenny levain płynny (100%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 80.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 0.66,
  "brak_cen": [
   "Mąka pszenna chlebowa T65",
   "Oliwki czarne (bez pestek)",
   "Skórka cytryny"
  ]
 },
 {
  "nr": "R-024",
  "nazwa": "Chleb na zakwasie Tartine z prażonym słonecznikiem i suszonymi pomidorami",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna chlebowa T65",
    "typ": "mąka",
    "pct": 90.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": "Silna mąka W>280"
   },
   {
    "nazwa": "Mąka pszenna pełnoziarnista T150",
    "typ": "mąka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Pszenny levain płynny (100%)",
    "typ": "zakwas",
    "pct": 20.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Dojrzały, kopuła aktywna"
   },
   {
    "nazwa": "Woda (autolyse)",
    "typ": "woda",
    "pct": 75.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Temp. 32°C"
   },
   {
    "nazwa": "Woda (bassinage)",
    "typ": "woda",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": "Dodawać powoli na 2. pr. mieszarki — po autolyse"
   },
   {
    "nazwa": "Sól morska",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Po autolyse 30–45 min"
   },
   {
    "nazwa": "Słonecznik łuskany (prażony)",
    "typ": "ziarno",
    "pct": 15.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Prażony na złoto"
   },
   {
    "nazwa": "Suszone pomidory w oleju",
    "typ": "dodatek",
    "pct": 15.0,
    "faza": "ciasto",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": "Odsączone, grubo krojone — olej z pomidorów liczyć w wodzie"
   }
  ],
  "proces": {
   "masa_szt_g": 800.0,
   "szt_blacha": 2.0,
   "forma": "koszyk",
   "wydajnosc_pct": 148.0,
   "ubytek_pct": 12.0,
   "miesz_min": 25.0,
   "t_ciasta": 26.0,
   "ferm_min": 60.0,
   "rozrost_min": 90.0,
   "t_ferm": 24.0,
   "piec": "IBIS GT MAXI 3",
   "ibis_t": 250.0,
   "ibis_min": 50.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 230.0,
   "bong_min": 45.0,
   "wiatrak": 2.0,
   "uwagi": "Nacinać przed załadunkiem; Bongard wiatrak 1 przez pierwsze 10 min"
  },
  "prefermenty": [
   "Pszenny levain płynny (100%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 80.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 0.36,
  "brak_cen": [
   "Mąka pszenna chlebowa T65",
   "Suszone pomidory w oleju",
   "Słonecznik łuskany (prażony)"
  ]
 },
 {
  "nr": "R-025",
  "nazwa": "Chleb na zakwasie Tartine kanapkowy",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna chlebowa T65",
    "typ": "mąka",
    "pct": 90.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": "Silna mąka W>280"
   },
   {
    "nazwa": "Mąka pszenna pełnoziarnista T150",
    "typ": "mąka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Pszenny levain płynny (100%)",
    "typ": "zakwas",
    "pct": 20.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Dojrzały, kopuła aktywna"
   },
   {
    "nazwa": "Woda (autolyse)",
    "typ": "woda",
    "pct": 72.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Temp. 32°C — nieco mniej wody dla zwartego miękiszu"
   },
   {
    "nazwa": "Woda (bassinage)",
    "typ": "woda",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": "Dodawać powoli na 2. pr. mieszarki — po autolyse"
   },
   {
    "nazwa": "Sól morska",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Po autolyse 30–45 min"
   },
   {
    "nazwa": "Masło",
    "typ": "tłuszcz",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Zimne kostki na końcu wyrabiania — uelastycznia miękisz"
   }
  ],
  "proces": {
   "masa_szt_g": 700.0,
   "szt_blacha": 4.0,
   "forma": "Forma zespolona",
   "wydajnosc_pct": 148.0,
   "ubytek_pct": 12.0,
   "miesz_min": 25.0,
   "t_ciasta": 26.0,
   "ferm_min": 60.0,
   "rozrost_min": 90.0,
   "t_ferm": 24.0,
   "piec": "IBIS GT MAXI 3",
   "ibis_t": 250.0,
   "ibis_min": 50.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 230.0,
   "bong_min": 45.0,
   "wiatrak": 2.0,
   "uwagi": "Nacinać przed załadunkiem; Bongard wiatrak 1 przez pierwsze 10 min"
  },
  "prefermenty": [
   "Pszenny levain płynny (100%)"
  ],
  "alergeny": [
   "Gluten",
   "Mleko"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 75.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 2.29,
  "brak_cen": [
   "Mąka pszenna chlebowa T65"
  ]
 },
 {
  "nr": "R-026",
  "nazwa": "Bułki pszenne kajzerki",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 55.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 2.5,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Smalec lub margaryna",
    "typ": "tłuszcz",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Nadaje chrupkość skórce"
   },
   {
    "nazwa": "Mak lub sezam",
    "typ": "posypka",
    "pct": 5.0,
    "faza": "posypka",
    "kolejnosc": 7,
    "wariant": "Wariant mak/sezam",
    "uwagi": "Zwilżyć bułkę przed posypką"
   }
  ],
  "proces": {
   "masa_szt_g": 105.0,
   "szt_blacha": 20.0,
   "forma": "blacha 80x60",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 225.0,
   "ibis_min": 18.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 210.0,
   "bong_min": 16.0,
   "wiatrak": 3.0,
   "uwagi": "Bongard równomierniejsze rumienianie; perforowane blachy zalecane"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Sezam"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 55.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 2.58,
  "brak_cen": [
   "Mak lub sezam",
   "Smalec lub margaryna"
  ]
 },
 {
  "nr": "R-027",
  "nazwa": "Bułki pszenne kajzerki z ziarnem",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 55.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 2.5,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Smalec lub margaryna",
    "typ": "tłuszcz",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mix ziaren (sezam, mak, słonecznik, siemię)",
    "typ": "posypka",
    "pct": 8.0,
    "faza": "posypka",
    "kolejnosc": 7,
    "wariant": "Wariant wieloziarnisty",
    "uwagi": "Zwilżyć bułkę, obtaczać w mieszance ziaren"
   }
  ],
  "proces": {
   "masa_szt_g": 100.0,
   "szt_blacha": 10.0,
   "forma": "blacha 40x60",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 225.0,
   "ibis_min": 18.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 210.0,
   "bong_min": 16.0,
   "wiatrak": 3.0,
   "uwagi": "Bongard równomierniejsze rumienianie; perforowane blachy zalecane, ziarno mak lub sezam"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Sezam"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 55.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 2.58,
  "brak_cen": [
   "Mix ziaren (sezam, mak, słonecznik, siemię)",
   "Smalec lub margaryna"
  ]
 },
 {
  "nr": "R-028",
  "nazwa": "Solanki pszenne z kminkiem i solą",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 55.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 2.5,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 1.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Smalec lub margaryna",
    "typ": "tłuszcz",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Smalec lub margaryna (nie masło!) — daje chrupkość skórce"
   },
   {
    "nazwa": "Kminek mielony",
    "typ": "aromat",
    "pct": 1.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Dodać do ciasta"
   },
   {
    "nazwa": "Sól gruboziarnista",
    "typ": "posypka",
    "pct": 3.0,
    "faza": "posypka",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": "Posypać przed pieczeniem"
   },
   {
    "nazwa": "Kminek cały",
    "typ": "posypka",
    "pct": 1.0,
    "faza": "posypka",
    "kolejnosc": 9,
    "wariant": null,
    "uwagi": "Na wierzch przed pieczeniem"
   }
  ],
  "proces": {
   "masa_szt_g": 105.0,
   "szt_blacha": 12.0,
   "forma": "blacha na bagietki",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 225.0,
   "ibis_min": 18.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 210.0,
   "bong_min": 16.0,
   "wiatrak": 3.0,
   "uwagi": "Bongard równomierniejsze rumienianie; perforowane blachy zalecane"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 55.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 2.62,
  "brak_cen": [
   "Kminek cały",
   "Kminek mielony",
   "Smalec lub margaryna"
  ]
 },
 {
  "nr": "R-029",
  "nazwa": "Wek pszenny",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 55.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Smalec lub margaryna",
    "typ": "tłuszcz",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sezam lub mak",
    "typ": "posypka",
    "pct": 5.0,
    "faza": "posypka",
    "kolejnosc": 7,
    "wariant": "Wariant posypka",
    "uwagi": "Zwilżyć przed posypką"
   }
  ],
  "proces": {
   "masa_szt_g": 420.0,
   "szt_blacha": 4.0,
   "forma": "blacha 40x60",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 225.0,
   "ibis_min": 18.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 210.0,
   "bong_min": 16.0,
   "wiatrak": 3.0,
   "uwagi": "Bongard równomierniejsze rumienianie; perforowane blachy zalecane"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Sezam"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 55.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 2.54,
  "brak_cen": [
   "Sezam lub mak",
   "Smalec lub margaryna"
  ]
 },
 {
  "nr": "R-030",
  "nazwa": "Bułki hamburgerowe (Kogutek)",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 52.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Dla miękkości"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.8,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło",
    "typ": "tłuszcz",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Temp. pokojowa"
   },
   {
    "nazwa": "Jajko",
    "typ": "jajka",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sezam",
    "typ": "posypka",
    "pct": 5.0,
    "faza": "posypka",
    "kolejnosc": 9,
    "wariant": "Wariant sezamowy",
    "uwagi": "Zwilżyć wierzch jajkiem"
   }
  ],
  "proces": {
   "masa_szt_g": 210.0,
   "szt_blacha": 10.0,
   "forma": "blacha 80x60",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 225.0,
   "ibis_min": 18.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 210.0,
   "bong_min": 16.0,
   "wiatrak": 3.0,
   "uwagi": "Bongard równomierniejsze rumienianie; perforowane blachy zalecane"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko",
   "Sezam"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 52.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 5.23,
  "brak_cen": [
   "Jajko",
   "Mleko pełne"
  ]
 },
 {
  "nr": "R-031",
  "nazwa": "Bułki hotdogowe małe (Kogutek)",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 52.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.8,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło",
    "typ": "tłuszcz",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Temp. pokojowa"
   },
   {
    "nazwa": "Jajko",
    "typ": "jajka",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 140.0,
   "szt_blacha": 15.0,
   "forma": "blacha na bagietki",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 225.0,
   "ibis_min": 18.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 210.0,
   "bong_min": 16.0,
   "wiatrak": 3.0,
   "uwagi": "Bongard równomierniejsze rumienianie; perforowane blachy zalecane"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 52.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 4.63,
  "brak_cen": [
   "Jajko",
   "Mleko pełne"
  ]
 },
 {
  "nr": "R-032",
  "nazwa": "Bułki hotdogowe duże (Kogutek)",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 52.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.8,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło",
    "typ": "tłuszcz",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Temp. pokojowa"
   },
   {
    "nazwa": "Jajko",
    "typ": "jajka",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 210.0,
   "szt_blacha": 10.0,
   "forma": "blacha na bagietki",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 225.0,
   "ibis_min": 18.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 210.0,
   "bong_min": 16.0,
   "wiatrak": 3.0,
   "uwagi": "Bongard równomierniejsze rumienianie; perforowane blachy zalecane"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 52.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 4.63,
  "brak_cen": [
   "Jajko",
   "Mleko pełne"
  ]
 },
 {
  "nr": "R-033",
  "nazwa": "Bułki na zapiekanki (Kogutek)",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 52.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.8,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło",
    "typ": "tłuszcz",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Temp. pokojowa"
   },
   {
    "nazwa": "Jajko",
    "typ": "jajka",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 210.0,
   "szt_blacha": 5.0,
   "forma": "blacha 40x60",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 225.0,
   "ibis_min": 18.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 210.0,
   "bong_min": 16.0,
   "wiatrak": 3.0,
   "uwagi": "Bongard równomierniejsze rumienianie; perforowane blachy zalecane"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 52.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 4.63,
  "brak_cen": [
   "Jajko",
   "Mleko pełne"
  ]
 },
 {
  "nr": "R-034",
  "nazwa": "Bułki kebabowe małe (Kogutek)",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 50.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C — nieco gęstsze niż hamburgerowe"
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.8,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 4.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło",
    "typ": "tłuszcz",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Temp. pokojowa"
   },
   {
    "nazwa": "Jajko",
    "typ": "jajka",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sezam lub mak",
    "typ": "posypka",
    "pct": 4.0,
    "faza": "posypka",
    "kolejnosc": 9,
    "wariant": "Wariant posypka",
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 265.0,
   "szt_blacha": 5.0,
   "forma": "blacha 80x60",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 225.0,
   "ibis_min": 18.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 210.0,
   "bong_min": 16.0,
   "wiatrak": 3.0,
   "uwagi": "Bongard równomierniejsze rumienianie; perforowane blachy zalecane"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko",
   "Sezam"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 50.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 4.6,
  "brak_cen": [
   "Jajko",
   "Mleko pełne",
   "Sezam lub mak"
  ]
 },
 {
  "nr": "R-035",
  "nazwa": "Bułki kebabowe duże (Kogutek)",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T550",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 50.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Mleko pełne",
    "typ": "nabiał",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 1.8,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 4.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło",
    "typ": "tłuszcz",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Temp. pokojowa"
   },
   {
    "nazwa": "Jajko",
    "typ": "jajka",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sezam lub mak",
    "typ": "posypka",
    "pct": 4.0,
    "faza": "posypka",
    "kolejnosc": 9,
    "wariant": "Wariant posypka",
    "uwagi": null
   }
  ],
  "proces": {
   "masa_szt_g": 315.0,
   "szt_blacha": 5.0,
   "forma": "blacha 80x60",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 225.0,
   "ibis_min": 18.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 210.0,
   "bong_min": 16.0,
   "wiatrak": 3.0,
   "uwagi": "Bongard równomierniejsze rumienianie; perforowane blachy zalecane"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko",
   "Sezam"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 50.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 4.6,
  "brak_cen": [
   "Jajko",
   "Mleko pełne",
   "Sezam lub mak"
  ]
 },
 {
  "nr": "R-036",
  "nazwa": "Bułki z dziurką z ziarnami",
  "kategoria": "Bułki",
  "skladniki": [
   {
    "nazwa": "Mąka pszenna T650",
    "typ": "mąka",
    "pct": 70.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mąka żytnia T720",
    "typ": "mąka",
    "pct": 20.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mąka graham T1850",
    "typ": "mąka",
    "pct": 10.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 60.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Temp. 28°C"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Miód",
    "typ": "cukier",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mix ziaren (sezam, mak, siemię, słonecznik)",
    "typ": "posypka",
    "pct": 10.0,
    "faza": "posypka",
    "kolejnosc": 8,
    "wariant": "Wariant mix",
    "uwagi": "Zwilżyć bułkę, obtaczać w ziarnach; forma: wałeczek z dziurką"
   }
  ],
  "proces": {
   "masa_szt_g": 100.0,
   "szt_blacha": 10.0,
   "forma": "blacha 40x60",
   "wydajnosc_pct": 155.0,
   "ubytek_pct": 10.0,
   "miesz_min": 15.0,
   "t_ciasta": 25.0,
   "ferm_min": 20.0,
   "rozrost_min": 50.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": 225.0,
   "ibis_min": 18.0,
   "para_ibis": "10",
   "poklad": "górny",
   "bong_t": 210.0,
   "bong_min": 16.0,
   "wiatrak": 3.0,
   "uwagi": "Bongard równomierniejsze rumienianie; perforowane blachy zalecane"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Sezam"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 60.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 2.6,
  "brak_cen": [
   "Mix ziaren (sezam, mak, siemię, słonecznik)",
   "Miód"
  ]
 },
 {
  "nr": "R-037",
  "nazwa": "Chleb orkiszowy low FODMAP mały",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka orkiszowa T630",
    "typ": "mąka",
    "pct": 80.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mąka orkiszowa razowa T2000",
    "typ": "mąka",
    "pct": 20.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Orkiszowy zakwas płynny (100%)",
    "typ": "zakwas",
    "pct": 20.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Szybciej niż pszenny"
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 70.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Temp. 28°C — nie przekraczać 26°C ciasta"
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Oliwa z oliwek",
    "typ": "tłuszcz",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Siemię lniane (namoczone)",
    "typ": "ziarno",
    "pct": 8.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Namoczone 2h w 2× wody"
   }
  ],
  "proces": {
   "masa_szt_g": 500.0,
   "szt_blacha": 10.0,
   "forma": "foremka stalowa",
   "wydajnosc_pct": 148.0,
   "ubytek_pct": 12.0,
   "miesz_min": 18.0,
   "t_ciasta": 25.0,
   "ferm_min": 45.0,
   "rozrost_min": 75.0,
   "t_ferm": 22.0,
   "piec": "oba",
   "ibis_t": 230.0,
   "ibis_min": 45.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 212.0,
   "bong_min": 40.0,
   "wiatrak": 2.0,
   "uwagi": "Orkisz: autolyse max 20 min, temp ciasta max 26°C"
  },
  "prefermenty": [
   "Orkiszowy zakwas płynny (100%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 70.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 5.19,
  "brak_cen": [
   "Siemię lniane (namoczone)"
  ]
 },
 {
  "nr": "R-038",
  "nazwa": "Chleb orkiszowy low FODMAP duży",
  "kategoria": "Chleby",
  "skladniki": [
   {
    "nazwa": "Mąka orkiszowa T630",
    "typ": "mąka",
    "pct": 80.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Mąka orkiszowa razowa T2000",
    "typ": "mąka",
    "pct": 20.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Orkiszowy zakwas płynny (100%)",
    "typ": "zakwas",
    "pct": 20.0,
    "faza": "preferm.",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": "Szybciej niż pszenny"
   },
   {
    "nazwa": "Woda",
    "typ": "woda",
    "pct": 70.0,
    "faza": "autolyse",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": "Temp. 28°C — nie przekraczać 26°C ciasta"
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Oliwa z oliwek",
    "typ": "tłuszcz",
    "pct": 3.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Siemię lniane (namoczone)",
    "typ": "ziarno",
    "pct": 8.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Namoczone 2h w 2× wody"
   }
  ],
  "proces": {
   "masa_szt_g": 750.0,
   "szt_blacha": 4.0,
   "forma": "Forma zespolona",
   "wydajnosc_pct": 148.0,
   "ubytek_pct": 12.0,
   "miesz_min": 18.0,
   "t_ciasta": 25.0,
   "ferm_min": 45.0,
   "rozrost_min": 75.0,
   "t_ferm": 22.0,
   "piec": "oba",
   "ibis_t": 230.0,
   "ibis_min": 45.0,
   "para_ibis": "10",
   "poklad": "środkowy",
   "bong_t": 212.0,
   "bong_min": 40.0,
   "wiatrak": 2.0,
   "uwagi": "Orkisz: autolyse max 20 min, temp ciasta max 26°C"
  },
  "prefermenty": [
   "Orkiszowy zakwas płynny (100%)"
  ],
  "alergeny": [
   "Gluten"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 70.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 5.19,
  "brak_cen": [
   "Siemię lniane (namoczone)"
  ]
 },
 {
  "nr": "R-039",
  "nazwa": "Croissant",
  "kategoria": "Specialty",
  "skladniki": [
   {
    "nazwa": "Mąka 00",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": "Mąka włoska typ 00 — dobra elastyczność do laminacji"
   },
   {
    "nazwa": "Mleko",
    "typ": "nabiał",
    "pct": 52.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 20°C"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 4.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 12.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło (détrempe)",
    "typ": "tłuszcz",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Do ciasta, nie do laminacji"
   },
   {
    "nazwa": "Masło do laminacji",
    "typ": "tłuszcz",
    "pct": 50.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Beurre sec 82–84% tł.; temp. masła = temp. ciasta ~14–16°C; 1 tura single + 1 tura double"
   },
   {
    "nazwa": "Jajko (glazura)",
    "typ": "jajka",
    "pct": 5.0,
    "faza": "posypka",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": "Roztrzepane, smarować 2× przed pieczeniem"
   }
  ],
  "proces": {
   "masa_szt_g": 80.0,
   "szt_blacha": 8.0,
   "forma": "blaszka 60x40",
   "wydajnosc_pct": 162.0,
   "ubytek_pct": 11.0,
   "miesz_min": 15.0,
   "t_ciasta": 26.0,
   "ferm_min": 30.0,
   "rozrost_min": 60.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": null,
   "ibis_min": null,
   "para_ibis": null,
   "poklad": null,
   "bong_t": 220.0,
   "bong_min": 22.0,
   "wiatrak": 2.0,
   "uwagi": "Brak pary; Bongard: wiatrak 2 dla równomiernego wypieku"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 0.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 30.94,
  "brak_cen": [
   "Jajko (glazura)",
   "Masło (détrempe)"
  ]
 },
 {
  "nr": "R-040",
  "nazwa": "Pain au chocolat",
  "kategoria": "Specialty",
  "skladniki": [
   {
    "nazwa": "Mąka 00",
    "typ": "mąka",
    "pct": 100.0,
    "faza": "ciasto",
    "kolejnosc": 1,
    "wariant": null,
    "uwagi": "Mąka włoska typ 00"
   },
   {
    "nazwa": "Mleko",
    "typ": "nabiał",
    "pct": 52.0,
    "faza": "ciasto",
    "kolejnosc": 2,
    "wariant": null,
    "uwagi": "Temp. 20°C"
   },
   {
    "nazwa": "Drożdże świeże",
    "typ": "drożdże",
    "pct": 4.0,
    "faza": "ciasto",
    "kolejnosc": 3,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Cukier",
    "typ": "cukier",
    "pct": 12.0,
    "faza": "ciasto",
    "kolejnosc": 4,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Sól",
    "typ": "sól",
    "pct": 2.0,
    "faza": "ciasto",
    "kolejnosc": 5,
    "wariant": null,
    "uwagi": null
   },
   {
    "nazwa": "Masło (détrempe)",
    "typ": "tłuszcz",
    "pct": 5.0,
    "faza": "ciasto",
    "kolejnosc": 6,
    "wariant": null,
    "uwagi": "Do ciasta"
   },
   {
    "nazwa": "Masło do laminacji",
    "typ": "tłuszcz",
    "pct": 50.0,
    "faza": "ciasto",
    "kolejnosc": 7,
    "wariant": null,
    "uwagi": "Jak croissant — ta sama technika laminacji"
   },
   {
    "nazwa": "Czekolada 64% (sztabki)",
    "typ": "czekolada",
    "pct": 12.0,
    "faza": "nadzienie",
    "kolejnosc": 8,
    "wariant": null,
    "uwagi": "2 sztabki na pain au chocolat; czekolada chłodna przy zawijaniu"
   },
   {
    "nazwa": "Jajko (glazura)",
    "typ": "jajka",
    "pct": 5.0,
    "faza": "posypka",
    "kolejnosc": 9,
    "wariant": null,
    "uwagi": "Smarować 2× przed pieczeniem"
   }
  ],
  "proces": {
   "masa_szt_g": 80.0,
   "szt_blacha": 10.0,
   "forma": "blaszka 60x40",
   "wydajnosc_pct": 162.0,
   "ubytek_pct": 11.0,
   "miesz_min": 15.0,
   "t_ciasta": 26.0,
   "ferm_min": 30.0,
   "rozrost_min": 60.0,
   "t_ferm": 24.0,
   "piec": "Bongard Krystal+",
   "ibis_t": null,
   "ibis_min": null,
   "para_ibis": null,
   "poklad": null,
   "bong_t": 220.0,
   "bong_min": 22.0,
   "wiatrak": 2.0,
   "uwagi": "Brak pary; Bongard: wiatrak 2 dla równomiernego wypieku"
  },
  "prefermenty": [],
  "alergeny": [
   "Gluten",
   "Jaja",
   "Mleko"
  ],
  "suma_mak_pct": 100.0,
  "suma_mak_ok": true,
  "hydracja_pct": 0.0,
  "czas_pracy_min": null,
  "cena_obecna": null,
  "koszt_na_kg_maki": 30.94,
  "brak_cen": [
   "Czekolada 64% (sztabki)",
   "Jajko (glazura)",
   "Masło (détrempe)"
  ]
 }
];
window.AB_PREFERMENTY = {
 "Pszenny levain płynny": {
  "typ": "zakwas",
  "hydracja": 100.0,
  "proporcja": "1:1",
  "starter": "5-10% dojrzały",
  "temp": 26.0,
  "czas_h": 10.0,
  "lodowka": "10°C/20h",
  "sygnal": "Kopuła aktywna",
  "uzycie_pct": "15-30",
  "uwagi": "Podstawowy zakwas do chlebów pszennych"
 },
 "Pszenny zakwas sztywny (lievito madre)": {
  "typ": "zakwas",
  "hydracja": 50.0,
  "proporcja": "2:1",
  "starter": "10-20% dojrzały",
  "temp": 27.0,
  "czas_h": 6.0,
  "lodowka": "8°C/24h",
  "sygnal": "Podwojenie objętości",
  "uzycie_pct": "20-40",
  "uwagi": null
 },
 "Żytni zakwas razowy": {
  "typ": "zakwas",
  "hydracja": 100.0,
  "proporcja": "1:1",
  "starter": "5-8% dojrzały",
  "temp": 29.0,
  "czas_h": 12.0,
  "lodowka": "10°C/24h",
  "sygnal": "Bąble, kwaśny, +50%",
  "uzycie_pct": "20-50",
  "uwagi": "Wymagany przy 100% żytnim"
 },
 "Żytni zakwas płynny": {
  "typ": "zakwas",
  "hydracja": 125.0,
  "proporcja": "4:5",
  "starter": "5-10% dojrzały",
  "temp": 29.0,
  "czas_h": 14.0,
  "lodowka": "10°C/24h",
  "sygnal": "1,5-2× objętość",
  "uzycie_pct": "15-30",
  "uwagi": null
 },
 "Orkiszowy zakwas płynny": {
  "typ": "zakwas",
  "hydracja": 100.0,
  "proporcja": "1:1",
  "starter": "5% pszenny",
  "temp": 25.0,
  "czas_h": 10.0,
  "lodowka": "—",
  "sygnal": "Kopuła, szybszy",
  "uzycie_pct": "15-25",
  "uwagi": "Szybciej fermentuje niż pszenny"
 },
 "Poolish pszenny": {
  "typ": "poolish",
  "hydracja": 100.0,
  "proporcja": "1:1",
  "starter": "0,1% drożdży",
  "temp": 21.0,
  "czas_h": 14.0,
  "lodowka": "—",
  "sygnal": "Kopuła opada — użyć natychmiast",
  "uzycie_pct": "25-40",
  "uwagi": "Podać od razu po osiągnięciu szczytu"
 },
 "Poolish żytni": {
  "typ": "poolish",
  "hydracja": 100.0,
  "proporcja": "1:1",
  "starter": "0,2% drożdży",
  "temp": 21.0,
  "czas_h": 12.0,
  "lodowka": "—",
  "sygnal": "Kopuła, zapach",
  "uzycie_pct": "20-35",
  "uwagi": null
 },
 "Poolish pszenny ciepły (szybki)": {
  "typ": "poolish",
  "hydracja": 100.0,
  "proporcja": "1:1",
  "starter": "1% drożdży",
  "temp": 27.0,
  "czas_h": 3.0,
  "lodowka": "—",
  "sygnal": "Kopuła",
  "uzycie_pct": "20-35",
  "uwagi": "Awaryjny — słabszy aromat"
 },
 "Biga klasyczna pszenna": {
  "typ": "biga",
  "hydracja": 52.0,
  "proporcja": "2:1",
  "starter": "0,5% drożdży",
  "temp": 19.0,
  "czas_h": 18.0,
  "lodowka": "—",
  "sygnal": "Kwaśny zapach, bąble",
  "uzycie_pct": "30-45",
  "uwagi": "Kruszyć ręcznie przed użyciem"
 },
 "Biga orkiszowa": {
  "typ": "biga",
  "hydracja": 50.0,
  "proporcja": "2:1",
  "starter": "0,5% drożdży",
  "temp": 19.0,
  "czas_h": 14.0,
  "lodowka": "—",
  "sygnal": "Bąble, zapach",
  "uzycie_pct": "25-40",
  "uwagi": "Krótsza fermentacja"
 },
 "Yudane pszenna": {
  "typ": "zaparka",
  "hydracja": 100.0,
  "proporcja": "1:1",
  "starter": "wrzątek",
  "temp": 0.0,
  "czas_h": 12.0,
  "lodowka": "4°C/24-48h",
  "sygnal": "Gęsty żel <35°C",
  "uzycie_pct": "10-15",
  "uwagi": "Lodówka obowiązkowo min. 12h"
 },
 "Yudane żytnia": {
  "typ": "zaparka",
  "hydracja": 200.0,
  "proporcja": "1:2",
  "starter": "wrzątek",
  "temp": 0.0,
  "czas_h": 12.0,
  "lodowka": "4°C/24-48h",
  "sygnal": "Gęsty żel",
  "uzycie_pct": "15-25",
  "uwagi": "Wnosi ~2/3 masy jako wodę — koryguj recepturę"
 },
 "Tangzhong pszenny": {
  "typ": "zaparka",
  "hydracja": 500.0,
  "proporcja": "1:5",
  "starter": "gotować 65°C",
  "temp": 0.0,
  "czas_h": 2.0,
  "lodowka": "4°C/24h",
  "sygnal": "Pasta klejsta",
  "uzycie_pct": "5-8",
  "uwagi": "Nie zagotować — stracisz skrobię żelową"
 },
 "Skalded grain (zaparzane ziarno żytnie)": {
  "typ": "inne",
  "hydracja": 150.0,
  "proporcja": "1:1,5",
  "starter": "wrzątek",
  "temp": 0.0,
  "czas_h": 12.0,
  "lodowka": "4°C",
  "sygnal": "Miękkie, nasiąknięte",
  "uzycie_pct": "10-20",
  "uwagi": "Ziarna żyta lub pszenicy"
 }
};
window.AB_PIEKARNIA_FOODCOST_ZALOZENIA = {"stawka_h": 40, "media_zl_kg_maki": 0.8, "marza_detal": 0.35, "marza_gastro": 0.3, "vat_detal": 0.05, "vat_gastro": 0.23};
