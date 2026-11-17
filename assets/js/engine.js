/* Motor de recomendación — Inara by Alma
   1) Deriva un vector de 8 familias olfativas por perfume a partir de su pirámide de notas.
   2) Construye el perfil del usuario desde las respuestas.
   3) Puntúa (coseno + rechazos + clima/intensidad/ocasión) y devuelve ganador + alternativas con diversidad. */
(function () {
  const FAMILIES = ["FLORAL", "VERDE", "CITRICO", "AMADERADO", "AMBAR", "GOURMAND", "ACUATICO", "MUSK"];
  const FAMILY_LABEL = {
    FLORAL: "Floral", VERDE: "Verde y herbal", CITRICO: "Cítrico", AMADERADO: "Amaderado",
    AMBAR: "Ámbar y especias", GOURMAND: "Dulce y gourmand", ACUATICO: "Fresco y acuático", MUSK: "Almizcle y polvo"
  };
  const FAMILY_COLOR = {
    FLORAL: "#a4577a", VERDE: "#5d5e38", CITRICO: "#b8860b", AMADERADO: "#725b27",
    AMBAR: "#9a4a22", GOURMAND: "#8b5a3c", ACUATICO: "#3f7d8c", MUSK: "#79776c"
  };

  const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();

  /* palabra clave (sin tildes) -> familia. Se busca como subcadena en cada nota. */
  const KEYWORDS = {
    FLORAL: ["rosa", "jazmin", "peonia", "azahar", "flor de naranjo", "lirio", "tuberosa", "gardenia", "iris", "violeta", "magnolia", "orquidea", "ylang", "fresia", "freesia", "heliotropo", "mimosa", "flor", "neroli", "lila", "lavanda de", "geranio", "osmanthus", "champaca", "nardo", "cassis flor", "camelia", "lotus", "loto", "orris"],
    VERDE: ["verde", "hoja", "hierba", "menta", "te ", "te,", "albahaca", "lavanda", "salvia", "romero", "tomillo", "helecho", "musgo", "vetiver", "cesped", "artemisa", "estragon", "eucalipto", "pepino", "galbano", "aromatic", "tallo", "bambu", "tea"],
    CITRICO: ["bergamota", "limon", "naranja", "mandarina", "pomelo", "toronja", "lima", "citric", "yuzu", "cidra", "petit grain", "bigarade", "naranja amarga", "kumquat", "clementina", "citron", "lemon", "grapefruit"],
    AMADERADO: ["madera", "sandalo", "cedro", "oud", "agar", "pachuli", "patchouli", "cuero", "tabaco", "incienso", "vetiver", "guayaco", "roble", "ahumad", "humo", "abedul", "tierra", "cipres", "palo santo", "raiz", "cashmeran", "olibano", "sandal", "ambroxan", "ambrox", "madera de"],
    AMBAR: ["ambar", "canela", "clavo", "pimienta", "cardamomo", "azafran", "nuez moscada", "jengibre", "resina", "benjui", "labdano", "mirra", "incienso", "especia", "comino", "anis", "bálsamo", "balsamo", "estoraque", "opoponax", "mejorana", "pimiento", "pink pepper", "bayas rosas", "cuero"],
    GOURMAND: ["vainilla", "caramelo", "chocolate", "cacao", "cafe", "coco", "miel", "praline", "almendra", "haba tonka", "tonka", "azucar", "algodon de azucar", "dulce", "crema", "leche", "mantequilla", "avellana", "ron", "whisky", "licor", "pera", "manzana", "durazno", "melocoton", "frambuesa", "fresa", "cereza", "ciruela", "frutas", "fruta", "mora", "arandano", "lichi", "albaricoque", "maracuya", "mango", "pina", "banana", "platano", "higo", "datil", "tarta", "galleta", "pastel", "toffee", "turron", "sirope", "melaza"],
    ACUATICO: ["marin", "mar", "oceano", "sal", "agua", "acuatic", "ozono", "ozonic", "brisa", "lluvia", "calone", "algas", "mineral", "aire", "rocio", "hielo", "nota azul", "melon", "pepino", "sandia", "fresco"],
    MUSK: ["almizcle", "musk", "polvo", "talco", "piel", "ambrette", "cachemira", "algodon", "ropa", "jabon", "aldehid", "limpio", "sandalo cremoso", "ambroxan", "ambergris", "ambar gris"]
  };
  /* Notas multi-familia: ya contempladas en varias listas. Evita falsos positivos cortos. */
  const WORD_ONLY = new Set(["mar", "sal", "te ", "te,", "tea", "lima", "flor", "ron", "piel", "agua", "aire"]);

  function matchFamilies(note) {
    const n = " " + norm(note) + " ";
    const hits = [];
    for (const fam of FAMILIES) {
      for (const kw of KEYWORDS[fam]) {
        const k = norm(kw);
        const ok = WORD_ONLY.has(kw) ? new RegExp("[^a-z]" + k.trim() + "[^a-z]").test(n) : n.includes(k);
        if (ok) { hits.push(fam); break; }
      }
    }
    return hits;
  }

  /* Pesos por capa de la pirámide: la salida se evapora, el fondo define el rastro. */
  const LAYER_W = { top: 0.8, middle: 1.1, base: 1.2 };

  function deriveVector(p) {
    const v = Object.fromEntries(FAMILIES.map((f) => [f, 0]));
    for (const layer of ["top", "middle", "base"]) {
      for (const note of (p.notes && p.notes[layer]) || []) {
        const fams = matchFamilies(note);
        for (const f of fams) v[f] += LAYER_W[layer] / fams.length ** 0.5;
      }
    }
    const max = Math.max(...Object.values(v), 0.0001);
    for (const f of FAMILIES) v[f] = v[f] / max;
    return v;
  }

  const HEAVY = { AMADERADO: 1, AMBAR: 1.3, GOURMAND: 0.9, MUSK: 0.2, FLORAL: 0.2, VERDE: -0.5, CITRICO: -1, ACUATICO: -1 };
  function deriveTraits(p, v) {
    const sum = FAMILIES.reduce((a, f) => a + v[f], 0.0001);
    const heavy = FAMILIES.reduce((a, f) => a + v[f] * HEAVY[f], 0) / sum; // -1 ligero .. 1.3 denso
    const conc = { parfum: 0.35, extrait: 0.45, edp: 0.15, edt: -0.1, edc: -0.3 }[norm(p.concentration).replace(/[^a-z]/g, "")] || 0;
    const score = heavy + conc;
    const intensity = score > 0.55 ? 3 : score > 0.1 ? 2 : 1;
    return { heavy, intensity, nightish: heavy > 0.35, dayish: heavy < 0.35 };
  }

  /* ---------- Preparación del catálogo ---------- */
  function prepare(catalog) {
    return catalog.map((p) => {
      const vec = p.vec || deriveVector(p);
      const t = deriveTraits(p, vec);
      const accords = FAMILIES.map((f) => ({ family: f, value: vec[f] })).filter((a) => a.value > 0.18).sort((a, b) => b.value - a.value).slice(0, 5);
      const allNotes = ["top", "middle", "base"].flatMap((l) => (p.notes && p.notes[l]) || []);
      return Object.assign({}, p, { vec, traits: t, accords, noteSet: allNotes.map(norm), fragranticaUrl: p.fragranticaUrl || "https://www.fragrantica.es/buscar/?query=" + encodeURIComponent(p.brand + " " + p.name) });
    });
  }

  /* ---------- Perfil del usuario ---------- */
  function buildProfile(answers, QUIZ) {
    const U = Object.fromEntries(FAMILIES.map((f) => [f, 0]));
    const R = Object.fromEntries(FAMILIES.map((f) => [f, 0]));
    const loved = [];
    const add = (obj, f, x) => { obj[f] += x; };
    for (const q of QUIZ) {
      const a = answers[q.id];
      if (a == null || (Array.isArray(a) && !a.length)) continue;
      const ids = Array.isArray(a) ? a : [a];
      for (const id of ids) {
        const o = q.options && q.options.find((x) => x.id === id);
        if (!o) continue;
        if (o.add) for (const [f, w] of Object.entries(o.add)) add(U, f, w);
        if (o.avoid) for (const [f, w] of Object.entries(o.avoid)) add(R, f, w);
        if (o.notes) loved.push(...o.notes);
      }
    }
    // Contradicciones: lo rechazado explícitamente anula lo "gustado" de esa familia.
    return { U, R, loved: loved.map(norm), favorite: answers.favorite || null, ctx: answers };
  }

  function cosine(a, b) {
    let d = 0, na = 0, nb = 0;
    for (const f of FAMILIES) { d += a[f] * b[f]; na += a[f] * a[f]; nb += b[f] * b[f]; }
    return na && nb ? d / Math.sqrt(na * nb) : 0;
  }

  const CLIMATE = { frio: { heavyOK: true }, templado: {}, calido_seco: { light: true }, calido_humedo: { light: true, strict: true } };

  function score(p, prof, fav) {
    const U = {};
    for (const f of FAMILIES) U[f] = Math.max(0, prof.U[f] - prof.R[f]);
    if (fav) for (const f of FAMILIES) U[f] += 2 * fav.vec[f];
    const base = cosine(U, p.vec);
    let pen = 0, penMax = 0;
    for (const f of FAMILIES) { penMax += prof.R[f]; pen += prof.R[f] * p.vec[f]; }
    const penal = penMax ? pen / penMax : 0;
    const reasons = [];
    let adj = 0;
    const c = prof.ctx;
    const cl = CLIMATE[c.clima];
    if (cl) {
      if (cl.light) {
        if (p.traits.intensity === 3) adj -= cl.strict ? 0.15 : 0.08;
        else if (p.traits.intensity === 1) { adj += 0.06; reasons.push("Ligero y cómodo para tu clima"); }
      }
      if (cl.heavyOK && p.traits.intensity >= 2) { adj += 0.06; reasons.push("Tiene cuerpo para el frío"); }
    }
    const wantInt = { suave: 1, medio: 2, intenso: 3 }[c.intensidad];
    if (wantInt) {
      const d = Math.abs(wantInt - p.traits.intensity);
      adj += d === 0 ? 0.06 : d === 2 ? -0.08 : 0;
      if (d === 0) reasons.push("Intensidad como la quieres");
    }
    if (c.ocasion) {
      const night = c.ocasion === "noche" || c.ocasion === "especial";
      const day = c.ocasion === "diario";
      if (night && p.traits.nightish) { adj += 0.05; reasons.push("Ideal para la noche y ocasiones especiales"); }
      if (day && p.traits.dayish) { adj += 0.05; reasons.push("Perfecto para el día a día"); }
      if (day && p.traits.nightish) adj -= 0.05;
    }
    // Notas que ama explícitamente
    const matchedNotes = [];
    for (const l of prof.loved) {
      if (p.noteSet.some((n) => n.includes(l))) matchedNotes.push(l);
    }
    const uniqMatched = [...new Set(matchedNotes)];
    adj += Math.min(0.12, uniqMatched.length * 0.04);
    // Género
    if (c.para && c.para !== "cualquiera") {
      if (p.gender === c.para) adj += 0.03; else if (p.gender !== "unisex") adj -= 1;
    }
    const total = Math.max(0, base - 0.5 * penal + adj);
    return { total, base, penal, reasons, matchedNotes: uniqMatched };
  }

  function recommend(catalogP, answers, QUIZ, opts) {
    opts = opts || {};
    const prof = buildProfile(answers, QUIZ);
    const fav = answers.favorite ? catalogP.find((p) => p.id === answers.favorite) : null;
    let pool = catalogP.filter((p) => !opts.isAvailable || opts.isAvailable(p));
    const scored = pool.map((p) => {
      const s = score(p, prof, fav);
      if (fav && p.id === fav.id) s.total = 0; // no recomendar el mismo que ya tiene
      return { p, s };
    }).filter((x) => x.s.total > 0).sort((a, b) => b.s.total - a.s.total);
    if (!scored.length) return { prof, top: null, alts: [], all: [] };
    const top = scored[0];
    const dom = (x) => x.p.accords[0] && x.p.accords[0].family;
    const alts = [];
    const similar = scored.slice(1).find((x) => x.p.brand !== top.p.brand || true);
    if (similar) alts.push(Object.assign({ tag: "Muy parecido" }, similar));
    const diff = scored.slice(1).find((x) => x !== similar && dom(x) !== dom(top) && x.s.total >= top.s.total * 0.8);
    if (diff) alts.push(Object.assign({ tag: "Diferente, te puede gustar" }, diff));
    const third = scored.slice(1).find((x) => x !== similar && x !== diff);
    if (third && alts.length < 3) alts.push(Object.assign({ tag: "Otra opción" }, third));
    const unchosen = scored.find((x) => x.s.matchedNotes.length === 0 && FAMILIES.every((f) => !(prof.U[f] > 0 && x.p.vec[f] > 0.7)) && !alts.includes(x) && x !== top);
    if (unchosen && x_ok(unchosen, top)) alts.push(Object.assign({ tag: "Comodín: sal de lo habitual" }, unchosen));
    return { prof, top, alts: alts.slice(0, 3), all: scored, lowConfidence: top.s.total < 0.5 };
    function x_ok(a, b) { return a.s.total >= b.s.total * 0.6; }
  }

  /* Afinidad mostrada: redondeada a 5 y limitada; no es una probabilidad. */
  function displayMatch(total) {
    const pct = Math.round((50 + Math.min(1, total / 1.15) * 48) / 5) * 5;
    return Math.min(98, pct);
  }

  window.InaraEngine = { FAMILIES, FAMILY_LABEL, FAMILY_COLOR, norm, prepare, recommend, displayMatch, deriveVector, matchFamilies };
})();
