// Pomocnicze funkcje wspólne
window.AB = window.AB || {};

AB.uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
};

// "06:30" -> 390 (minuty od północy)
AB.doMin = function (hhmm) {
  if (typeof hhmm === "number") return hhmm;
  const [h, m] = String(hhmm).split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

// 390 -> "06:30"
AB.zMin = function (min) {
  min = Math.max(0, Math.round(min));
  const h = Math.floor(min / 60) % 24, m = min % 60;
  return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
};

AB.dzisISO = function () {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};

AB.dataPL = function (iso) {
  const [r, m, d] = iso.split("-").map(Number);
  const dni = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
  const dt = new Date(r, m - 1, d);
  return dni[dt.getDay()] + " " + d + "." + String(m).padStart(2, "0");
};

AB.przesunDate = function (iso, dni) {
  const [r, m, d] = iso.split("-").map(Number);
  const dt = new Date(r, m - 1, d + dni);
  return dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
};

AB.g = function (n) { // format gramów: 1250 -> "1 250 g" / "1,25 kg"
  if (n >= 10000) return (Math.round(n / 100) / 10).toLocaleString("pl-PL") + " kg";
  return Math.round(n).toLocaleString("pl-PL") + " g";
};

AB.zl = function (n) {
  return (Math.round(n * 100) / 100).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł";
};

AB.min = function (n) { // 95 -> "1 h 35 min"
  n = Math.round(n);
  if (n < 60) return n + " min";
  const h = Math.floor(n / 60), m = n % 60;
  return m ? h + " h " + m + " min" : h + " h";
};

AB.esc = function (s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
};

AB.el = function (html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};

AB.receptura = function (nr) {
  return (window.AB_RECEPTURY || []).find(r => r.nr === nr);
};

AB.toast = function (msg, typ) {
  document.querySelectorAll(".toast").forEach(s => s.remove());
  const t = AB.el('<div class="toast ' + (typ || "") + '">' + AB.esc(msg) + "</div>");
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("widoczny"));
  setTimeout(() => { t.classList.remove("widoczny"); setTimeout(() => t.remove(), 300); }, 2600);
};

// Modal potwierdzenia (zamiast confirm() — spójny z UI)
AB.potwierdz = function (msg) {
  return new Promise(res => {
    const m = AB.el(
      '<div class="modal-tlo"><div class="modal"><p>' + AB.esc(msg) + '</p>' +
      '<div class="modal-akcje"><button class="btn btn-cichy" data-a="nie">Anuluj</button>' +
      '<button class="btn btn-glowny" data-a="tak">Tak</button></div></div></div>');
    m.addEventListener("click", e => {
      const a = e.target.dataset.a;
      if (a || e.target === m) { m.remove(); res(a === "tak"); }
    });
    document.body.appendChild(m);
  });
};
