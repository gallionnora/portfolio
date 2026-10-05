// Builds the page from the JSON files in /data. You should not need to edit this file.
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
};
const link = (href, text) => { const a = el("a", "", text); a.href = href; return a; };
const load = f => fetch(`data/${f}.json`).then(r => { if (!r.ok) throw new Error(f); return r.json(); });

Promise.all([load("site"), load("projects"), load("experience")])
  .then(([site, projects, exp]) => { renderSite(site); renderProjects(projects); renderExperience(exp, site); })
  .catch(err => {
    const m = el("p", "error", `Could not load data/${err.message}.json. Check it for a missing comma or quote. If you opened index.html by double-clicking, run "python3 -m http.server" in this folder and visit http://localhost:8000 instead.`);
    document.querySelector("main").prepend(m);
  });

function renderSite(s) {
  document.title = `${s.name} | Portfolio`;
  const tb = document.getElementById("titleblock");
  tb.append(el("h1", "", s.name), el("p", "", s.tagline));
  const nav = el("nav");
  [["About", "#about"], ["Projects", "#projects"], ["Experience", "#experience"]].forEach(([t, h]) => nav.append(link(h, t)));
  const c = el("div", "contact");
  if (s.email) c.append(link(`mailto:${s.email}`, s.email));
  if (s.phone) c.append(link(`tel:${s.phone.replace(/[^\d+]/g, "")}`, s.phone));
  (s.links || []).forEach(l => c.append(link(l.url, l.label)));
  tb.append(nav, c);

  const wrap = el("div", "about-wrap");
  if (s.photo) { const i = el("img"); i.src = s.photo; i.alt = s.photoAlt || s.name; i.onerror = () => i.remove(); wrap.append(i); }
  const t = el("div"); s.about.forEach(p => t.append(el("p", "", p))); wrap.append(t);
  document.getElementById("about-body").append(wrap);
}

function renderProjects(list) {
  const root = document.getElementById("projects-list");
  list.forEach(p => {
    const row = el("article", "project");
    const body = el("div");
    const h = el("h3"); h.append(p.link ? link(p.link, p.title) : p.title);
    body.append(h, el("p", "", p.summary));
    if (p.tags && p.tags.length) { const ul = el("ul", "tags"); p.tags.forEach(t => ul.append(el("li", "", t))); body.append(ul); }
    if (p.image) {
      const i = el("img"); i.src = p.image; i.alt = p.imageAlt || p.title; i.loading = "lazy";
      i.onerror = () => { i.remove(); row.classList.add("noimg"); };
      row.append(i);
    } else row.classList.add("noimg");
    row.append(body); root.append(row);
  });
}

function renderExperience(groups, site) {
  const root = document.getElementById("experience-list");
  groups.forEach(g => {
    root.append(el("div", "group", g.group));
    g.items.forEach(it => {
      const row = el("div", "entry");
      const d = el("div"); d.append(el("strong", "", it.title));
      if (it.org) d.append(el("p", "", it.org));
      if (it.bullets && it.bullets.length) {
        const ul = el("ul"); it.bullets.forEach(b => ul.append(el("li", "", b))); d.append(ul);
      }
      if (it.details) d.append(el("p", "", it.details));
      row.append(el("div", "when", it.dates || ""), d); root.append(row);
    });
  });
  if (site.skills && site.skills.length) {
    root.append(el("div", "group", "Skills"));
    const ul = el("ul", "tags"); site.skills.forEach(s => ul.append(el("li", "", s))); root.append(ul);
  }
}
