#!/usr/bin/env python3
"""Ekstrakcja danych cukierniczych z Receptury_v2026-06-17.xlsx do data/receptury.js"""
import openpyxl, json, re, datetime

wb = openpyxl.load_workbook('receptury.xlsx', data_only=True)

def rows(name):
    for row in wb[name].iter_rows(values_only=True):
        if any(v is not None and str(v).strip() for v in row):
            yield row

# --- CENNIK ---
cennik = {}
for r in rows('CENNIK_SUROWCÓW'):
    kat, nazwa, jedn, cena = r[0], r[1], r[2], r[3]
    if not nazwa or nazwa == 'Nazwa surowca' or not kat or 'CENNIK' in str(kat):
        continue
    try:
        cena = float(cena) if cena is not None else None
    except (TypeError, ValueError):
        cena = None
    cennik[str(nazwa).strip()] = {"kategoria": str(kat).strip(), "jednostka": str(jedn or 'kg').strip(), "cena": cena}

# --- ALERGENY (per surowiec) ---
ALG = ["Gluten","Skorupiaki","Jaja","Ryby","Orzeszki ziemne","Soja","Mleko","Orzechy","Seler","Gorczyca","Sezam","SO2/siarczyny","Łubin","Mięczaki"]
alergeny = {}
started = False
for r in rows('ALERGENY'):
    if r[0] == 'Surowiec':
        started = True; continue
    if not started or not r[0]:
        continue
    marks = [ALG[i] for i in range(14) if r[i+1] is not None and str(r[i+1]).strip()]
    if marks:
        alergeny[str(r[0]).strip()] = marks

# --- RECEPTURY CUKIERNIA ---
receptury = {}
cur = None
for r in rows('CUKIERNIA'):
    nr = r[0]
    if not nr or not str(nr).startswith('C-'):
        continue
    nr = str(nr).strip()
    if nr not in receptury:
        receptury[nr] = {"nr": nr, "nazwa": None, "kategoria": None, "porcje_partia": None, "skladniki": []}
    rec = receptury[nr]
    if r[1]: rec["nazwa"] = str(r[1]).strip()
    if r[2]: rec["kategoria"] = str(r[2]).strip()
    uwagi = str(r[9] or '')
    m = re.search(r'Porcji/partia:\s*([\d.,]+)', uwagi)
    if m: rec["porcje_partia"] = float(m.group(1).replace(',', '.'))
    if r[3]:
        rec["skladniki"].append({
            "nazwa": str(r[3]).strip(), "typ": str(r[4] or '').strip(),
            "ilosc_g": float(r[5]) if r[5] is not None else 0,
            "faza": str(r[7] or 'ciasto').strip(), "kolejnosc": int(r[8]) if r[8] else 0,
        })

# --- PRODUKTY (parametry procesowe) ---
def num(v):
    try:
        f = float(v); return f
    except (TypeError, ValueError):
        return None

produkty = {}
for r in rows('PRODUKTY'):
    nr = r[0]
    if not nr or not str(nr).startswith('C-'):
        continue
    produkty[str(nr).strip()] = {
        "masa_szt_g": num(r[3]), "szt_blacha": num(r[4]), "forma": str(r[5] or '').strip(),
        "miesz_min": num(r[8]) or 0, "t_ciasta": num(r[9]), "ferm_min": num(r[10]) or 0,
        "rozrost_min": num(r[11]) or 0,
        "piec": str(r[13] or '').strip(),
        "ibis_t": num(r[14]), "ibis_min": num(r[15]), "poklad": str(r[18] or '').strip(),
        "bong_t": num(r[19]), "bong_min": num(r[20]), "wiatrak": num(r[22]),
        "ubytek_pct": num(r[23]) or 0,
        "uwagi": str(r[25] or '').strip(),
    }

# --- FOODCOST_CUKIER ---
foodcost = {}
zaloz = {"stawka_h": 40, "marza_detal": 0.35, "vat_detal": 0.05}
for r in rows('FOODCOST_CUKIER'):
    nr = r[0]
    if not nr or not str(nr).startswith('C-'):
        continue
    foodcost[str(nr).strip()] = {
        "czas_pracy_min": num(r[5]) or 0,
        "cena_obecna": num(r[9]),
    }

# produkty z parametrami procesowymi bez receptury w arkuszu CUKIERNIA (np. C-004, C-009)
naz_prod = {}
for r in rows('PRODUKTY'):
    if r[0] and str(r[0]).startswith('C-'):
        naz_prod[str(r[0]).strip()] = (str(r[1] or '').strip(), str(r[2] or '').strip())
for nr, (nazwa, kat) in naz_prod.items():
    if nr not in receptury:
        receptury[nr] = {"nr": nr, "nazwa": nazwa, "kategoria": kat, "porcje_partia": None,
                         "skladniki": [], "tylko_proces": True}

# merge
out = []
for nr, rec in sorted(receptury.items()):
    p = produkty.get(nr, {})
    f = foodcost.get(nr, {})
    algs = set()
    koszt = 0.0
    brak_cen = []
    for s in rec["skladniki"]:
        for a in alergeny.get(s["nazwa"], []):
            algs.add(a)
        c = cennik.get(s["nazwa"])
        if c and c["cena"] is not None:
            if c["jednostka"] in ('kg', 'l'):
                koszt += s["ilosc_g"] / 1000 * c["cena"]
            elif c["jednostka"] == 'szt':
                koszt += (s["ilosc_g"] / 55) * c["cena"]  # jajko ≈ 55 g
            else:
                koszt += s["ilosc_g"] / 1000 * c["cena"]
        else:
            brak_cen.append(s["nazwa"])
    out.append({
        **rec, "proces": p, "czas_pracy_min": f.get("czas_pracy_min", 0),
        "cena_obecna": f.get("cena_obecna"),
        "alergeny": sorted(algs), "koszt_surowcow_partia": round(koszt, 2),
        "brak_cen": sorted(set(brak_cen)),
        "masa_partii_g": round(sum(s["ilosc_g"] for s in rec["skladniki"])),
    })

js = ("// AUTO-GENEROWANE z Receptury_v2026-06-17.xlsx (Google Drive) — %s\n"
      "// Nie edytuj ręcznie — uruchom tools/extract.py po aktualizacji receptur.\n"
      "window.AB_RECEPTURY = %s;\n"
      "window.AB_CENNIK = %s;\n"
      "window.AB_ALERGENY_SUROWCE = %s;\n"
      "window.AB_FOODCOST_ZALOZENIA = %s;\n") % (
    datetime.date.today().isoformat(),
    json.dumps(out, ensure_ascii=False, indent=1),
    json.dumps(cennik, ensure_ascii=False),
    json.dumps(alergeny, ensure_ascii=False),
    json.dumps(zaloz, ensure_ascii=False))

import os
os.makedirs('/home/user/plan-produkcji-cukiernia/app/data', exist_ok=True)
with open('/home/user/plan-produkcji-cukiernia/app/data/receptury.js', 'w') as f:
    f.write(js)
print("Receptur:", len(out))
for r in out:
    print(r["nr"], r["nazwa"], "| koszt partii:", r["koszt_surowcow_partia"], "zł | porcje:", r["porcje_partia"], "| alergeny:", ",".join(r["alergeny"]) or '-', "| brak cen:", r["brak_cen"])
