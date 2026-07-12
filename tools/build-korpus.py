#!/usr/bin/env python3
"""Chunkuje dokumenty wiedzy (Markdown) na fragmenty do wyszukiwania offline.
Wyjście: app/data/korpus-<modul>.js z window.AB_KORPUS_<MODUL> = [{id,tytul,tekst,zrodlo,tagi}]."""
import os, re, json, sys

BAZA = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# słowa-tagi do prostego etykietowania fragmentów (pomaga wyszukiwarce)
TAGI = {
    "mrozenie": ["mroż", "zamroż", "mroźni", "zamraż"],
    "chlodzenie": ["chłodz", "chłodni", "retard", "lodówk"],
    "piec": ["piec", "wypiek", "bongard", "ibis", "pokład", "temperatur", "para"],
    "fermentacja": ["ferment", "pointage", "rozrost", "gar", "autolyse", "levain", "zakwas", "poolish", "biga"],
    "delegacja": ["deleg", "osąd", "pomoc", "brygad", "checklist", "gradient"],
    "kolejnosc": ["kolejno", "sekwencj", "ścieżk", "harmonogram", "wsteczn", "bufor"],
    "skalowanie": ["skalow", "partia", "wsad", "baker", "piekarsk", "batch"],
    "sezon": ["sezon", "miesiąc", "świąt", "wielkanoc", "tłust"],
    "jakosc": ["jakość", "sensor", "diagnost", "objaw", "korekt"],
    "haccp": ["haccp", "ccp", "rdzeń", "higien", "±", "°c"],
}


def taguj(tekst):
    low = tekst.lower()
    return [k for k, sl in TAGI.items() if any(s in low for s in sl)]


def chunkuj(sciezka, zrodlo):
    with open(sciezka, encoding="utf-8") as f:
        linie = f.read().split("\n")
    chunks, biezacy, sciezka_nag = [], [], []

    def zamknij():
        tekst = "\n".join(biezacy).strip()
        if len(tekst) < 40:
            return
        tytul = " › ".join(sciezka_nag[-2:]) if sciezka_nag else zrodlo
        chunks.append({"tytul": tytul, "tekst": tekst[:1400],
                       "zrodlo": zrodlo, "tagi": taguj(tytul + " " + tekst)})

    for ln in linie:
        m = re.match(r"^(#{1,4})\s+(.*)", ln)
        if m:
            zamknij()
            biezacy = []
            poziom = len(m.group(1))
            sciezka_nag = sciezka_nag[:poziom - 1]
            while len(sciezka_nag) < poziom - 1:
                sciezka_nag.append("")
            tytul = re.sub(r"[#*`]", "", m.group(2)).strip()
            sciezka_nag = sciezka_nag[:poziom - 1] + [tytul]
        else:
            biezacy.append(ln)
    zamknij()
    return chunks


def zbuduj(modul, pliki):
    wszystkie = []
    for sciezka, zrodlo in pliki:
        pelna = os.path.join(BAZA, sciezka)
        if not os.path.exists(pelna):
            print("  pomijam (brak):", sciezka)
            continue
        cz = chunkuj(pelna, zrodlo)
        for i, c in enumerate(cz):
            c["id"] = modul[:3] + "-doc-" + str(len(wszystkie) + i)
        wszystkie += cz
    var = "AB_KORPUS_" + modul.upper()
    out = ("// Korpus wiedzy (fragmenty dokumentów) — generowane przez tools/build-korpus.py\n"
           "window.%s = %s;\n") % (var, json.dumps(wszystkie, ensure_ascii=False))
    with open(os.path.join(BAZA, "app/data/korpus-" + modul + ".js"), "w", encoding="utf-8") as f:
        f.write(out)
    print(modul, "→", len(wszystkie), "fragmentów")
    return len(wszystkie)


MODULY = {
    "cukiernia": [
        ("docs/baza-wiedzy/ZS-PLANOWANIE-PRODUKCJI.md", "ZS Planowanie Produkcji Cukierniczej"),
        ("docs/standardy/DESTYLAT-ZLOTYCH-STANDARDOW.md", "Destylat złotych standardów"),
    ],
    "piekarnia": [
        ("docs/baza-wiedzy/ZS-PLANOWANIE-PIEKARNIA.md", "ZS Planowanie Produkcji Piekarskiej"),
    ],
}

if __name__ == "__main__":
    for modul, pliki in MODULY.items():
        zbuduj(modul, pliki)
