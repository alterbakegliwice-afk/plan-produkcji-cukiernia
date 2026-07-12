#!/usr/bin/env python3
"""Scala źródła wiedzy (reguły, autorytety, sezon, trendy) w app/data/wiedza*.js — oba moduły."""
import json, os, datetime

BAZA = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def wczytaj(nazwa, dom):
    sciezka = os.path.join(BAZA, nazwa)
    if not os.path.exists(sciezka):
        print("  brak (pomijam):", nazwa)
        return dom
    with open(sciezka, encoding="utf-8") as f:
        return json.load(f)


def zbuduj(var, plik, zrodla):
    dane = {k: wczytaj(v, dom) for k, (v, dom) in zrodla.items()}
    out = (
        "// BAZA WIEDZY — generowana przez tools/build-wiedza.py — %s\n"
        "window.%s = {\n"
        "reguly: %s,\nautorytety: %s,\nsezon: %s,\ntrendy: %s\n};\n"
    ) % (
        datetime.date.today().isoformat(), var,
        json.dumps(dane["reguly"], ensure_ascii=False),
        json.dumps(dane["autorytety"], ensure_ascii=False),
        json.dumps(dane["sezon"], ensure_ascii=False),
        json.dumps(dane["trendy"], ensure_ascii=False),
    )
    with open(os.path.join(BAZA, "app/data", plik), "w", encoding="utf-8") as f:
        f.write(out)
    print(plik, "→ reguły:", len(dane["reguly"]), "autorytety:", len(dane["autorytety"]),
          "sezon:", len(dane["sezon"]), "trendy:", len(dane["trendy"]))


# CUKIERNIA
zbuduj("AB_WIEDZA", "wiedza.js", {
    "reguly": ("scratch-rules.json", []),
    "autorytety": ("scratch-autorytety.json", []),
    "sezon": ("scratch-sezon.json", []),
    "trendy": ("scratch-trendy.json", []),
})

# PIEKARNIA (brak osobnych autorytetów/trendów w JSON — są w tomie i korpusie)
zbuduj("AB_WIEDZA_PIEKARNIA", "wiedza-piekarnia.js", {
    "reguly": ("scratch-rules-piekarnia.json", []),
    "autorytety": ("scratch-autorytety-piekarnia.json", []),
    "sezon": ("scratch-sezon-piekarnia.json", []),
    "trendy": ("scratch-trendy-piekarnia.json", []),
})
