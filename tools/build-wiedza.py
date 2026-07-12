#!/usr/bin/env python3
"""Scala źródła wiedzy (reguły, autorytety, sezon, trendy) w app/data/wiedza.js"""
import json, os, sys, datetime

BAZA = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def wczytaj(nazwa):
    with open(os.path.join(BAZA, nazwa)) as f:
        return json.load(f)

reguly = wczytaj('scratch-rules.json')
autorytety = wczytaj('scratch-autorytety.json')
sezon = wczytaj('scratch-sezon.json')
trendy = wczytaj('scratch-trendy.json')

out = (
    "// BAZA WIEDZY — generowana przez tools/build-wiedza.py — %s\n"
    "// Źródła: złote standardy Alterbake (Drive) + ZS Planowanie Produkcji (docs/baza-wiedzy)\n"
    "window.AB_WIEDZA = {\n"
    "reguly: %s,\n"
    "autorytety: %s,\n"
    "sezon: %s,\n"
    "trendy: %s\n"
    "};\n"
) % (
    datetime.date.today().isoformat(),
    json.dumps(reguly, ensure_ascii=False),
    json.dumps(autorytety, ensure_ascii=False),
    json.dumps(sezon, ensure_ascii=False),
    json.dumps(trendy, ensure_ascii=False),
)

with open(os.path.join(BAZA, 'app/data/wiedza.js'), 'w') as f:
    f.write(out)
print("reguły:", len(reguly), "| autorytety:", len(autorytety), "| miesiące:", len(sezon), "| trendy:", len(trendy))
