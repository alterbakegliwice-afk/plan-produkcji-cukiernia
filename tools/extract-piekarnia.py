#!/usr/bin/env python3
"""Ekstrakcja danych PIEKARSKICH z receptury.xlsx do app/data/piekarnia.js

Analogiczny do tools/extract.py (moduł cukierniczy), ale dostosowany do
technologii piekarskiej:
  - receptury w % PIEKARSKICH (baker's %), gdzie suma mąk = 100%,
  - prefermenty/zaczyny prowadzone osobno (arkusz PREFERMENTY),
  - koszt liczony na 1 kg mąki wsadu (skalowalny), a nie na partię.

Arkusze piekarni w XLSX:
  SKŁADNIKI   — receptury R-001..R-040 (kolumny A-J; K+ to legenda/kalkulator, ignorujemy)
  PREFERMENTY — parametry prowadzenia zaczynów
  PRODUKTY    — parametry procesowe (wiersze R-001..R-040)
  FOODCOST    — czas pracy (min) i ceny (piekarnia)
  CENNIK_SUROWCÓW / ALERGENY — wspólne z cukiernią
"""
import openpyxl, json, datetime, os, sys

# --- lokalizacja pliku źródłowego ---
CANDIDATES = [
    (sys.argv[1] if len(sys.argv) > 1 else None),
    'receptury.xlsx',
    os.path.join(os.path.dirname(__file__), 'receptury.xlsx'),
    '/tmp/claude-0/-home-user-plan-produkcji-cukiernia/'
    'f5aaa064-9fac-5106-91f1-be7cb3b5ad1c/scratchpad/receptury.xlsx',
]
SRC = next((p for p in CANDIDATES if p and os.path.exists(p)), None)
if not SRC:
    sys.exit('Nie znaleziono receptury.xlsx (podaj ścieżkę jako argument).')

wb = openpyxl.load_workbook(SRC, data_only=True)


def rows(name):
    for row in wb[name].iter_rows(values_only=True):
        if any(v is not None and str(v).strip() for v in row):
            yield row


def num(v):
    try:
        return float(str(v).replace(',', '.'))
    except (TypeError, ValueError):
        return None


def txt(v):
    s = str(v).strip() if v is not None else ''
    return s or None


# typy składników traktowane jako prefermenty/zaczyny
PREFERMENT_TYPY = {'zakwas', 'poolish', 'biga', 'zaparka'}

# --- CENNIK (wspólny z cukiernią) ---
cennik = {}
for r in rows('CENNIK_SUROWCÓW'):
    kat, nazwa, jedn, cena = r[0], r[1], r[2], r[3]
    if not nazwa or nazwa == 'Nazwa surowca' or not kat or 'CENNIK' in str(kat):
        continue
    cennik[str(nazwa).strip()] = {
        "kategoria": str(kat).strip(),
        "jednostka": str(jedn or 'kg').strip(),
        "cena": num(cena),
    }

# --- ALERGENY per surowiec (wspólne z cukiernią) ---
ALG = ["Gluten", "Skorupiaki", "Jaja", "Ryby", "Orzeszki ziemne", "Soja",
       "Mleko", "Orzechy", "Seler", "Gorczyca", "Sezam", "SO2/siarczyny",
       "Łubin", "Mięczaki"]
alergeny = {}
started = False
for r in rows('ALERGENY'):
    if r[0] == 'Surowiec':
        started = True
        continue
    if not started or not r[0]:
        continue
    marks = [ALG[i] for i in range(14) if r[i + 1] is not None and str(r[i + 1]).strip()]
    if marks:
        alergeny[str(r[0]).strip()] = marks

# --- PREFERMENTY (parametry prowadzenia zaczynów) ---
prefermenty = {}
for r in rows('PREFERMENTY'):
    if not r[0] or r[0] == 'Nazwa' or 'PREFERMENTY' in str(r[0]):
        continue
    nazwa = str(r[0]).strip()
    prefermenty[nazwa] = {
        "typ": txt(r[1]),
        "hydracja": num(r[2]),
        "proporcja": txt(r[3]),          # Mąka:Woda
        "starter": txt(r[4]),
        "temp": num(r[5]),               # °C (0 = wrzątek/schłodzone, patrz uwagi)
        "czas_h": num(r[6]),
        "lodowka": txt(r[7]),
        "sygnal": txt(r[8]),             # sygnał gotowości
        "uzycie_pct": txt(r[9]),         # zakres np. "15-30"
        "uwagi": txt(r[10]),
    }

# --- SKŁADNIKI (receptury w % piekarskich; tylko kolumny A-J = 0..9) ---
receptury = {}
for r in rows('SKŁADNIKI'):
    nr = r[0]
    if not nr or not str(nr).startswith('R-'):
        continue
    nr = str(nr).strip()
    rec = receptury.setdefault(nr, {
        "nr": nr, "nazwa": None, "kategoria": None, "skladniki": [],
    })
    if r[1]:
        rec["nazwa"] = str(r[1]).strip()
    if r[2]:
        rec["kategoria"] = str(r[2]).strip()
    if r[3]:  # nazwa składnika
        rec["skladniki"].append({
            "nazwa": str(r[3]).strip(),
            "typ": txt(r[4]) or '',
            "pct": num(r[5]),                       # % piekarski
            "faza": txt(r[6]) or 'ciasto',
            "kolejnosc": int(num(r[7])) if num(r[7]) is not None else 0,
            "wariant": txt(r[8]),
            "uwagi": txt(r[9]),
        })

# --- PRODUKTY (parametry procesowe) ---
proces = {}
for r in rows('PRODUKTY'):
    nr = r[0]
    if not nr or not str(nr).startswith('R-'):
        continue
    proces[str(nr).strip()] = {
        "masa_szt_g": num(r[3]),
        "szt_blacha": num(r[4]),
        "forma": txt(r[5]),
        "wydajnosc_pct": num(r[6]),
        "ubytek_pct": num(r[7]),          # Ubytek wypieku %
        "miesz_min": num(r[8]),
        "t_ciasta": num(r[9]),
        "ferm_min": num(r[10]),           # fermentacja wstępna
        "rozrost_min": num(r[11]),
        "t_ferm": num(r[12]),
        "piec": txt(r[13]),
        "ibis_t": num(r[14]),
        "ibis_min": num(r[15]),
        "para_ibis": txt(r[16]),          # Para IBIS s (np. "10s×2")
        "poklad": txt(r[18]),
        "bong_t": num(r[19]),
        "bong_min": num(r[20]),
        "wiatrak": num(r[22]),
        "uwagi": txt(r[25]),
    }

# --- FOODCOST (piekarnia): czas pracy (min), cena obecna ---
# Nagłówek tabeli: Nr | Nazwa | Mąka (g) | Czas pracy (min) | Robocizna | Media |
#                  Surowce | Koszt totalny | Koszt/szt | Cena detal brutto | Cena gastro brutto
foodcost = {}
for r in rows('FOODCOST'):
    nr = r[0]
    if not nr or not str(nr).startswith('R-'):
        continue
    foodcost[str(nr).strip()] = {
        "czas_pracy_min": num(r[3]),
        "cena_obecna": num(r[9]),         # Cena detal brutto (w arkuszu pusta => null)
    }

zaloz = {"stawka_h": 40, "media_zl_kg_maki": 0.8, "marza_detal": 0.35,
         "marza_gastro": 0.3, "vat_detal": 0.05, "vat_gastro": 0.23}

# --- dopasowanie ceny surowca (piekarskie nazwy mąk różnią się od cennika) ---
def _norm(s):
    return str(s).lower().replace('ą', 'a').replace('ż', 'z').replace('ó', 'o').replace('ł', 'l')


def cena_surowca(nazwa):
    c = cennik.get(nazwa)
    if c and c["cena"] is not None:
        return c
    n = _norm(nazwa)
    # dopasowanie po numerze typu mąki (T65, T650...) i rdzeniu (żytnia/orkiszowa/graham)
    import re as _re
    tnum = _re.findall(r't\s?(\d{2,4})', n)
    kand = None
    for cn, cc in cennik.items():
        if cc["cena"] is None:
            continue
        cnn = _norm(cn)
        if 'maka' not in cnn and 'mąk' not in cn.lower():
            continue
        # ten sam numer T i zgodny rodzaj mąki
        cnums = _re.findall(r't\s?(\d{2,4})', cnn)
        if tnum and cnums and tnum[0] == cnums[0]:
            rodzaj_ok = (('zytni' in n) == ('zytni' in cnn)) and (('orkisz' in n) == ('orkisz' in cnn))
            if rodzaj_ok:
                return cc
        # bez numeru: dopasuj po rdzeniu (razowa żytnia, orkiszowa, graham, chlebowa≈500)
        for rdzen in ('zytnia razowa', 'zytnia', 'orkiszowa razowa', 'orkiszowa', 'graham', 'pelnoziarnista'):
            if rdzen in n and rdzen in cnn:
                kand = cc
    if 'chlebowa' in n and not tnum:
        kand = kand or cennik.get('Mąka pszenna 500')
    return kand


# --- SCALENIE ---
out = []
for nr, rec in sorted(receptury.items()):
    p = proces.get(nr, {})
    f = foodcost.get(nr, {})

    suma_mak = round(sum(s["pct"] or 0 for s in rec["skladniki"] if s["typ"] == 'mąka'), 2)
    suma_wody = sum(s["pct"] or 0 for s in rec["skladniki"] if s["typ"] == 'woda')
    hydracja = round(suma_wody / suma_mak * 100, 1) if suma_mak else None

    # prefermenty użyte w recepturze (nazwy zaczynów)
    prefy = [s["nazwa"] for s in rec["skladniki"] if s["typ"] in PREFERMENT_TYPY]

    # alergeny: matryca cukierni + wnioskowanie z nazwy/typu składnika.
    # WAŻNE (bezpieczeństwo prawne): składniki wariantowe (kolumna Wariant) NIE
    # wchodzą do alergenów bazowych — trafiają do osobnego zbioru "może zawierać".
    algs = set()
    algs_war = set()
    for s in rec["skladniki"]:
        cel = algs_war if s.get("wariant") else algs
        for a in alergeny.get(s["nazwa"], []):
            cel.add(a)
        nz = s["nazwa"].lower()
        typ = s["typ"].lower()
        if any(k in nz for k in ["mąka pszen", "pszenna", "pszenn", "orkisz", "graham",
                                  "żytni", "zytni", " t55", " t65", "t550", "t650", "t720",
                                  "t150", "t1850", "t2000", "chlebowa", "tostowa", "durum",
                                  "słód", "slod", "otręby", "otrab", "kasza manna", "bulgur",
                                  "jęczmi", "jeczmi", "owsian", "płatki owsiane"]) or typ == "mąka":
            cel.add("Gluten")
        if any(k in nz for k in ["jaj", "żółt", "zolt", "białk"]) or typ in ("jaja", "jajka"):
            cel.add("Jaja")
        if any(k in nz for k in ["mlek", "masło", "maslo", "śmietan", "smietan", "twaróg",
                                  "twarog", "serek", "mascarpone", "jogurt", "maślan", "maslan",
                                  "ser ", "kefir"]) or typ == "nabiał":
            cel.add("Mleko")
        if "sezam" in nz:
            cel.add("Sezam")
        if any(k in nz for k in ["soja", "sojow", "lecytyn"]):
            cel.add("Soja")
        if any(k in nz for k in ["orzech", "migdał", "migdal", "pekan", "laskow", "nerkow",
                                  "pistacj", "włoski", "wloski"]):
            cel.add("Orzechy")

    # koszt surowców na 1 kg mąki wsadu (baker's % => g na 1 kg mąki = pct*10)
    # Pomijamy: wodę (bez ceny) oraz prefermenty/zaczyny (ich mąka+woda są już
    # ujęte w 100% mąki i osobnych fazach — koszt liczymy z surowców bazowych).
    koszt = 0.0
    brak_cen = []
    for s in rec["skladniki"]:
        if s["typ"] in ('woda',) or s["typ"] in PREFERMENT_TYPY:
            continue
        if s.get("wariant"):
            continue  # wariant opcjonalny — nie licz do kosztu bazowego
        pct = s["pct"] or 0
        gram_na_kg = pct * 10.0        # gramy składnika na 1 kg mąki
        c = cena_surowca(s["nazwa"])
        if c and c["cena"] is not None:
            if c["jednostka"] == 'szt':
                koszt += (gram_na_kg / 55.0) * c["cena"]   # jajko ≈ 55 g
            else:  # kg, l, itp.
                koszt += gram_na_kg / 1000.0 * c["cena"]
        else:
            brak_cen.append(s["nazwa"])

    out.append({
        "nr": nr,
        "nazwa": rec["nazwa"],
        "kategoria": rec["kategoria"],
        "skladniki": rec["skladniki"],
        "proces": p,
        "prefermenty": prefy,
        "alergeny": sorted(algs),
        "alergeny_warianty": sorted(algs_war - algs),
        "suma_mak_pct": suma_mak,
        "suma_mak_ok": abs(suma_mak - 100) < 0.5,
        "hydracja_pct": hydracja,
        "czas_pracy_min": f.get("czas_pracy_min"),
        "cena_obecna": f.get("cena_obecna"),
        "koszt_na_kg_maki": round(koszt, 2),
        "brak_cen": sorted(set(brak_cen)),
    })

js = ("// AUTO-GENEROWANE z receptury.xlsx (Google Drive) — %s\n"
      "// Moduł PIEKARSKI. Nie edytuj ręcznie — uruchom tools/extract-piekarnia.py.\n"
      "// Receptury w %% piekarskich (baker's %%): suma mąk = 100%%, reszta względem mąki.\n"
      "// Koszt liczony na 1 kg mąki wsadu (skalowalny). Braki oznaczone null.\n"
      "window.AB_PIEKARNIA_RECEPTURY = %s;\n"
      "window.AB_PREFERMENTY = %s;\n"
      "window.AB_PIEKARNIA_FOODCOST_ZALOZENIA = %s;\n") % (
    datetime.date.today().isoformat(),
    json.dumps(out, ensure_ascii=False, indent=1),
    json.dumps(prefermenty, ensure_ascii=False, indent=1),
    json.dumps(zaloz, ensure_ascii=False))

os.makedirs('/home/user/plan-produkcji-cukiernia/app/data', exist_ok=True)
with open('/home/user/plan-produkcji-cukiernia/app/data/piekarnia.js', 'w') as fp:
    fp.write(js)

# --- RAPORT ---
print("Receptur piekarskich:", len(out))
print("Prefermentów w słowniku:", len(prefermenty))
print()
for r in out:
    flag = '' if r["suma_mak_ok"] else '  <-- SUMA MĄK != 100!'
    print("%s %-32s | skł:%2d | mąki:%6s%% | hydr:%5s%% | preferm:%d | alerg:%s%s" % (
        r["nr"], (r["nazwa"] or '?')[:32], len(r["skladniki"]),
        r["suma_mak_pct"], r["hydracja_pct"],
        len(r["prefermenty"]), ",".join(r["alergeny"]) or '-', flag))
