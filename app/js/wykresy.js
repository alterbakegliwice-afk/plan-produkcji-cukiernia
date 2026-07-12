// Wykresy SVG (bez bibliotek) — czas vs ilość produkcji
window.Wykresy = {

  // Wykres liniowy: jak zmienia się czas przy rosnącej liczbie partii.
  // Dwie serie: czas rąk (aktywny) i czas pieca. Osobno, jedna oś Y (minuty).
  skalowanie(nr, maxPartii, zaznaczone) {
    const dane = Czas.seriaSkalowania(nr, maxPartii);
    if (!dane.length) return '<p class="wyciszony maly">Brak danych do wykresu.</p>';
    const M = window.AB_MODUL || { skalowanie: "partie" };
    const maka = M.skalowanie === "maka";
    const W = 640, H = 300, m = { g: 18, p: 14, d: 40, l: 46 };
    const iw = W - m.l - m.p, ih = H - m.g - m.d;
    const maxY = Math.max(...dane.map(d => Math.max(d.aktywny, d.piec)), 30);
    const krokY = maxY > 300 ? 120 : maxY > 150 ? 60 : 30;
    const topY = Math.ceil(maxY / krokY) * krokY;

    const n0 = dane[0].n, nK = dane[dane.length - 1].n, rozpN = Math.max(1, nK - n0);
    const x = n => m.l + (n - n0) / rozpN * iw;   // mapowanie po wartości n, nie po indeksie
    const y = v => m.g + ih - v / topY * ih;

    const linia = klucz => dane.map((d, i) => (i ? "L" : "M") + x(d.n).toFixed(1) + " " + y(d[klucz]).toFixed(1)).join(" ");

    let siatka = "";
    for (let v = 0; v <= topY; v += krokY) {
      siatka += '<line x1="' + m.l + '" x2="' + (W - m.p) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="var(--grid)" stroke-width="1"/>' +
        '<text x="' + (m.l - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end" font-size="11" fill="var(--wyciszony)">' + v + '</text>';
    }
    // etykiety osi X z rzeczywistych punktów serii (co drugi, gdy gęsto)
    let osX = "";
    const rzadkosc = dane.length > 8 ? 2 : 1;
    dane.forEach((d, i) => {
      if (i % rzadkosc === 0 || i === dane.length - 1)
        osX += '<text x="' + x(d.n) + '" y="' + (H - m.d + 16) + '" text-anchor="middle" font-size="11" fill="var(--wyciszony)">' + d.n + '</text>';
    });

    // zaznaczony punkt: dopasuj po wartości n (nie po indeksie)
    const z = dane.reduce((a, b) => Math.abs(b.n - zaznaczone) < Math.abs(a.n - zaznaczone) ? b : a, dane[0]);
    const ost = dane[dane.length - 1];
    const jedn = maka ? "kg mąki" : "partiach";

    return '<div class="wykres"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Czas pracy i czas pieca w zależności od ilości">' +
      siatka + osX +
      '<line x1="' + m.l + '" x2="' + (W - m.p) + '" y1="' + y(0) + '" y2="' + y(0) + '" stroke="var(--os)" stroke-width="1"/>' +
      '<path d="' + linia("aktywny") + '" fill="none" stroke="var(--s1)" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="' + linia("piec") + '" fill="none" stroke="var(--s2)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="1 0"/>' +
      (z ? '<circle cx="' + x(z.n) + '" cy="' + y(z.aktywny) + '" r="6" fill="var(--s1)" stroke="var(--karta)" stroke-width="2"/>' +
           '<circle cx="' + x(z.n) + '" cy="' + y(z.piec) + '" r="6" fill="var(--s2)" stroke="var(--karta)" stroke-width="2"/>' +
           '<line x1="' + x(z.n) + '" x2="' + x(z.n) + '" y1="' + m.g + '" y2="' + (H - m.d) + '" stroke="var(--os)" stroke-dasharray="3 3"/>' : "") +
      '<text x="' + (W - m.p) + '" y="' + (y(ost.aktywny) - 8) + '" text-anchor="end" font-size="11" font-weight="700" fill="var(--s1)">ręce ' + ost.aktywny + "'</text>" +
      '<text x="' + (W - m.p) + '" y="' + (y(ost.piec) + 16) + '" text-anchor="end" font-size="11" font-weight="700" fill="var(--s2)">piec ' + ost.piec + "'</text>" +
      '<text x="' + (m.l + iw / 2) + '" y="' + (H - 4) + '" text-anchor="middle" font-size="11" fill="var(--wyciszony)">' + (maka ? "kg mąki" : "liczba partii") + '</text>' +
      '</svg></div>' +
      '<div class="legenda"><span><i style="background:var(--s1)"></i>Czas rąk (aktywny)</span>' +
      '<span><i style="background:var(--s2)"></i>Czas pieca / smażalnika</span></div>' +
      (z ? '<p class="maly" style="margin-top:6px">Przy <b>' + z.n + "</b> " + jedn + ": ręce <b>" + AB.min(z.aktywny) +
        '</b>, piec <b>' + AB.min(z.piec) + '</b>. Skala rośnie wolniej niż liniowo — czynności stałe robisz raz.</p>' : "");
  },

  // pasek siły trendu 1–5
  sila(n) {
    let s = '<span class="sila" role="img" aria-label="siła ' + n + ' na 5">';
    for (let i = 1; i <= 5; i++) s += '<i class="' + (i <= n ? "pelna" : "") + '"></i>';
    return s + "</span>";
  }
};
