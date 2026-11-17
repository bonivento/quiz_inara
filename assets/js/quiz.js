/* UI del quiz — Inara by Alma */
(function () {
  const E = window.InaraEngine, QUIZ = window.INARA_QUIZ, CFG = window.INARA_CONFIG;
  const $app = document.getElementById("app");
  const STAFF = new URLSearchParams(location.search).has("asesor");
  const KEY = "inara-quiz-v1";
  let CATALOG = [];
  let state = { step: -1, answers: {}, name: "" }; // -1 = portada

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (n, cls) => `<span class="material-symbols-outlined ${cls || ""}" aria-hidden="true">${n}</span>`;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };
  const load = () => { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.answers) state = s; } catch (e) {} };
  const go = (step) => { state.step = step; save(); render(); window.scrollTo({ top: 0, behavior: "smooth" }); };

  /* ---------- Portada ---------- */
  function renderIntro() {
    const resume = state.step > 0 && state.step < QUIZ.length;
    $app.innerHTML = `
    <section class="step-enter text-center max-w-2xl mx-auto py-10 md:py-16">
      <img src="assets/brand/flor-dorado.png" alt="" class="h-16 mx-auto mb-6" width="64" height="64">
      <p class="font-label text-label-md uppercase text-secondary mb-4">Quiz de fragancias</p>
      <h1 class="font-headline text-headline-xl-mobile md:text-headline-xl text-on-surface mb-5">Encuentra el aroma que te cuenta</h1>
      <p class="text-body-lg text-on-surface-variant mb-8">Responde ${QUIZ.length} preguntas breves, sin jerga. Te recomendamos un perfume, sus notas y dos alternativas, y te explicamos por qué.</p>
      <label class="block text-left max-w-sm mx-auto mb-6">
        <span class="font-label text-label-md uppercase text-on-surface-variant">Tu nombre (opcional)</span>
        <input id="name" value="${esc(state.name)}" maxlength="40" autocomplete="given-name" class="mt-2 w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md" placeholder="¿Cómo te llamas?">
      </label>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button id="start" class="bg-primary text-on-primary font-label text-label-lg uppercase px-8 py-4 rounded-xl hover:bg-primary-container transition">Empezar</button>
        ${resume ? `<button id="resume" class="border border-primary text-primary font-label text-label-lg uppercase px-8 py-4 rounded-xl hover:bg-primary-fixed transition">Continuar (${state.step + 1}/${QUIZ.length})</button>` : ""}
      </div>
      <p class="mt-6 text-body-sm text-outline">Toma ~2 minutos. No guardamos tus respuestas en ningún servidor.</p>
    </section>`;
    document.getElementById("start").onclick = () => { state.name = document.getElementById("name").value.trim(); state.answers = {}; go(0); };
    const r = document.getElementById("resume");
    if (r) r.onclick = () => { state.name = document.getElementById("name").value.trim(); go(state.step); };
  }

  /* ---------- Pregunta ---------- */
  function renderQuestion() {
    const q = QUIZ[state.step];
    const a = state.answers[q.id];
    const pct = Math.round((state.step / QUIZ.length) * 100);
    const canNext = q.optional || (Array.isArray(a) ? a.length > 0 : a != null);
    let body = "";
    if (q.type === "single") {
      body = `<div class="grid gap-3 ${q.options.length > 4 ? "sm:grid-cols-2" : ""}" role="radiogroup" aria-label="${esc(q.title)}">` + q.options.map((o) =>
        `<button class="opt" role="radio" aria-checked="${a === o.id}" data-id="${o.id}">${icon(o.icon, "opt-icon")}<span><span class="block text-body-md font-medium">${esc(o.label)}</span>${o.sub ? `<span class="block text-body-sm text-on-surface-variant">${esc(o.sub)}</span>` : ""}</span></button>`).join("") + `</div>`;
    } else if (q.type === "multi") {
      const sel = a || [];
      body = `<div class="grid gap-3 sm:grid-cols-2">` + q.options.map((o) =>
        `<button class="opt" aria-pressed="${sel.includes(o.id)}" data-id="${o.id}">${icon(o.icon, "opt-icon")}<span><span class="block text-body-md font-medium">${esc(o.label)}</span>${o.sub ? `<span class="block text-body-sm text-on-surface-variant">${esc(o.sub)}</span>` : ""}</span></button>`).join("") + `</div>` +
        (q.none ? `<button class="chip mt-4" aria-pressed="${Array.isArray(a) && a.length === 0 && state.noneEvita}" id="none">Ninguna, soy flexible</button>` : "") +
        `<p class="mt-3 text-body-sm text-outline" aria-live="polite">${sel.length}/${q.max} elegidas</p>`;
    } else if (q.type === "search") {
      const fav = a && CATALOG.find((p) => p.id === a);
      body = `<input id="fav" type="search" placeholder="Busca por nombre o marca…" autocomplete="off" class="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md" aria-label="Buscar perfume">
        <div id="favres" class="mt-3 grid gap-2" role="listbox"></div>
        ${fav ? `<p class="mt-4 text-body-md">Seleccionado: <strong>${esc(fav.brand)} — ${esc(fav.name)}</strong> <button id="favclear" class="underline text-secondary ml-2">quitar</button></p>` : ""}`;
    }
    $app.innerHTML = `
    <section class="step-enter max-w-2xl mx-auto py-6 md:py-10">
      <div class="flex items-center justify-between mb-3 font-label text-label-md uppercase text-on-surface-variant"><span>Pregunta ${state.step + 1} de ${QUIZ.length}</span><span>${pct}%</span></div>
      <div class="h-1 bg-surface-container-high rounded-full mb-8 overflow-hidden" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill h-full bg-gold" style="width:${pct}%"></div></div>
      <h2 class="font-headline text-headline-lg-mobile md:text-headline-lg mb-2">${esc(q.title)}</h2>
      ${q.hint ? `<p class="text-body-md text-on-surface-variant mb-6">${esc(q.hint)}</p>` : '<div class="mb-6"></div>'}
      ${body}
      <div class="flex items-center justify-between mt-10">
        <button id="back" class="font-label text-label-lg uppercase text-on-surface-variant hover:text-primary flex items-center gap-1">${icon("arrow_back")} Atrás</button>
        <button id="next" ${canNext ? "" : "disabled"} class="bg-primary text-on-primary font-label text-label-lg uppercase px-8 py-4 rounded-xl hover:bg-primary-container transition disabled:opacity-40 disabled:cursor-not-allowed">${state.step === QUIZ.length - 1 ? (a ? "Ver mi perfume" : "Omitir y ver resultado") : "Siguiente"}</button>
      </div>
    </section>`;

    $app.querySelectorAll(".opt").forEach((el) => el.addEventListener("click", () => {
      const id = el.dataset.id;
      if (q.type === "single") { state.answers[q.id] = id; save(); setTimeout(() => go(state.step + 1), 180); return; }
      let sel = state.answers[q.id] || [];
      state.noneEvita = false;
      if (sel.includes(id)) sel = sel.filter((x) => x !== id);
      else if (sel.length < q.max) sel = sel.concat(id);
      else { sel = sel.slice(1).concat(id); }
      state.answers[q.id] = sel; save(); renderQuestion();
    }));
    const none = document.getElementById("none");
    if (none) none.onclick = () => { state.answers[q.id] = []; state.noneEvita = true; save(); renderQuestion(); };
    // "Ninguna" cuenta como respuesta válida
    if (q.none && state.noneEvita) document.getElementById("next").disabled = false;
    document.getElementById("back").onclick = () => go(state.step === 0 ? -1 : state.step - 1);
    document.getElementById("next").onclick = () => go(state.step + 1);

    if (q.type === "search") {
      const input = document.getElementById("fav"), res = document.getElementById("favres");
      input.oninput = () => {
        const t = E.norm(input.value);
        if (t.length < 2) { res.innerHTML = ""; return; }
        const hits = CATALOG.filter((p) => E.norm(p.brand + " " + p.name).includes(t)).slice(0, 6);
        res.innerHTML = hits.length ? hits.map((p) => `<button class="opt" role="option" data-pid="${p.id}"><span><span class="block font-medium">${esc(p.name)}</span><span class="block text-body-sm text-on-surface-variant">${esc(p.brand)}</span></span></button>`).join("") : `<p class="text-body-sm text-outline">No está en nuestro catálogo todavía. Puedes omitir esta pregunta.</p>`;
        res.querySelectorAll("button").forEach((b) => b.onclick = () => { state.answers.favorite = b.dataset.pid; save(); renderQuestion(); });
      };
      const c = document.getElementById("favclear");
      if (c) c.onclick = () => { delete state.answers.favorite; save(); renderQuestion(); };
    }
  }

  /* ---------- Resultado ---------- */
  function noteLine(label, arr, matched) {
    if (!arr || !arr.length) return "";
    return `<div class="flex gap-3 py-2 border-b border-outline-variant/50"><span class="font-label text-label-sm uppercase text-secondary w-20 shrink-0 pt-1">${label}</span><span class="text-body-md">${arr.map((n) => { const hit = matched.some((m) => E.norm(n).includes(m)); return `<span class="${hit ? "font-semibold text-primary underline decoration-gold" : ""}">${esc(n)}</span>`; }).join(", ")}</span></div>`;
  }
  function accordBars(p) {
    return p.accords.map((a, i) => `<div class="bar" style="width:${Math.max(28, a.value * 100)}%;background:${E.FAMILY_COLOR[a.family]};animation-delay:${i * 90}ms">${E.FAMILY_LABEL[a.family]}</div>`).join('<div class="h-1.5"></div>');
  }
  function reasonsFor(r, prof) {
    const out = [];
    const likes = (state.answers.gusta || []).map((id) => QUIZ[1].options.find((o) => o.id === id)?.label).filter(Boolean);
    const topFam = r.p.accords.slice(0, 2).map((a) => E.FAMILY_LABEL[a.family].toLowerCase().replace(" y gourmand", "").replace(" y polvo", ""));
    if (likes.length) out.push(`Elegiste «${likes.slice(0, 2).join("» y «")}» y este perfume es sobre todo ${topFam.join(" y ")}.`);
    if (r.s.matchedNotes.length) out.push(`Incluye notas que te gustan: ${r.s.matchedNotes.slice(0, 4).join(", ")}.`);
    const av = (state.answers.evita || []);
    if (av.length && r.s.penal < 0.15) out.push("Evita lo que marcaste como rechazo.");
    out.push(...r.s.reasons);
    return [...new Set(out)].slice(0, 4);
  }
  function waLink(p) {
    const who = state.name ? `Hola, soy ${state.name}. ` : "Hola. ";
    const msg = `${who}Hice el quiz de fragancias de Inara y me salió ${p.brand} ${p.name}. ¿Lo tienen disponible o me recomiendan algo similar?`;
    return `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(msg)}`;
  }
  function renderResult() {
    const res = E.recommend(CATALOG, state.answers, QUIZ, { isAvailable: window.InaraStock.isAvailable });
    if (!res.top) {
      $app.innerHTML = `<section class="step-enter max-w-xl mx-auto text-center py-16"><h2 class="font-headline text-headline-lg mb-4">Necesitamos conocerte mejor</h2><p class="mb-6 text-on-surface-variant">No encontramos una coincidencia clara. Escríbenos y una asesora te ayuda.</p><a class="inline-block bg-whatsapp text-white px-8 py-4 rounded-xl font-label uppercase text-label-lg" href="https://wa.me/${CFG.whatsapp}">Hablar con una asesora</a></section>`;
      return;
    }
    const t = res.top, p = t.p, m = t.s.matchedNotes;
    const prof = res.prof;
    const domFam = p.accords[0] ? E.FAMILY_LABEL[p.accords[0].family] : "";
    $app.innerHTML = `
    <section class="step-enter max-w-4xl mx-auto py-8 md:py-12">
      <p class="font-label text-label-md uppercase text-secondary text-center mb-2">${state.name ? esc(state.name) + ", tu" : "Tu"} fragancia ideal</p>
      <h2 class="font-headline text-headline-lg-mobile md:text-headline-xl text-center mb-8">Familia ${esc(domFam.toLowerCase())}</h2>
      ${res.lowConfidence ? `<div class="bg-secondary-container text-on-secondary-container rounded-xl p-4 mb-6 text-body-md">Tus respuestas son muy variadas y la coincidencia es media. Una asesora puede afinar la recomendación contigo.</div>` : ""}
      <article class="bg-surface-container-lowest rounded-2xl shadow-card p-6 md:p-10 grid md:grid-cols-2 gap-8">
        <div>
          <div class="aspect-[4/5] rounded-xl bg-gradient-to-br from-primary-fixed to-secondary-container flex flex-col items-center justify-center text-center p-6 mb-4">
            <img src="assets/brand/flor-oliva.png" alt="" class="h-12 mb-4 opacity-80" width="48" height="48">
            <p class="font-label text-label-md uppercase text-secondary">${esc(p.brand)}</p>
            <p class="font-headline text-headline-md mt-2">${esc(p.name)}</p>
            <p class="text-body-sm text-on-surface-variant mt-2">${esc(p.concentration || "")}${p.year ? " · " + p.year : ""}</p>
          </div>
          <div class="flex items-center justify-between"><span class="font-label text-label-md uppercase text-on-surface-variant">Afinidad</span><span class="font-headline text-headline-md text-primary">${E.displayMatch(t.s.total)}%</span></div>
          <div class="h-1.5 bg-surface-container-high rounded-full mt-1"><div class="h-full bg-gold rounded-full" style="width:${E.displayMatch(t.s.total)}%"></div></div>
        </div>
        <div>
          <h3 class="font-label text-label-md uppercase text-secondary mb-3">Por qué te lo recomendamos</h3>
          <ul class="space-y-2 mb-6">${reasonsFor(t, prof).map((r) => `<li class="flex gap-2 text-body-md">${icon("check_circle", "text-primary text-[20px]")}<span>${esc(r)}</span></li>`).join("")}</ul>
          <h3 class="font-label text-label-md uppercase text-secondary mb-3">Acordes principales</h3>
          <div class="mb-6">${accordBars(p)}</div>
          <h3 class="font-label text-label-md uppercase text-secondary mb-1">Pirámide olfativa</h3>
          ${noteLine("Salida", p.notes.top, m)}${noteLine("Corazón", p.notes.middle, m)}${noteLine("Fondo", p.notes.base, m)}
          <p class="text-body-sm text-outline mt-3">En negrita, las notas que dijiste que te gustan.</p>
        </div>
        <div class="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
          <a href="${waLink(p)}" target="_blank" rel="noopener" class="flex-1 text-center bg-whatsapp text-white font-label text-label-lg uppercase px-6 py-4 rounded-xl hover:opacity-90 transition">Preguntar por WhatsApp</a>
          <a href="${esc(p.fragranticaUrl)}" target="_blank" rel="noopener noreferrer" class="flex-1 text-center border border-primary text-primary font-label text-label-lg uppercase px-6 py-4 rounded-xl hover:bg-primary-fixed transition">Ver en Fragrantica</a>
        </div>
      </article>

      ${res.alts.length ? `<h3 class="font-headline text-headline-md mt-12 mb-5">Otras opciones para ti</h3>
      <div class="grid gap-4 md:grid-cols-${Math.min(3, res.alts.length)}">${res.alts.map((x) => `
        <article class="bg-surface-container-lowest rounded-2xl shadow-soft p-5 flex flex-col">
          <span class="font-label text-label-sm uppercase text-secondary mb-2">${esc(x.tag)}</span>
          <p class="font-label text-label-sm uppercase text-on-surface-variant">${esc(x.p.brand)}</p>
          <h4 class="font-headline text-headline-sm mb-1">${esc(x.p.name)}</h4>
          <p class="text-body-sm text-on-surface-variant mb-3">${x.p.accords.slice(0, 3).map((a) => E.FAMILY_LABEL[a.family].toLowerCase()).join(" · ")}</p>
          <p class="text-body-sm mb-4">Notas: ${esc([...(x.p.notes.top || []).slice(0, 2), ...(x.p.notes.middle || []).slice(0, 2), ...(x.p.notes.base || []).slice(0, 2)].join(", "))}</p>
          <div class="mt-auto flex items-center justify-between"><span class="font-headline text-primary">${E.displayMatch(x.s.total)}%</span>
          <span class="flex gap-3 text-body-sm"><a class="underline text-whatsapp-dark" style="color:#128c4a" href="${waLink(x.p)}" target="_blank" rel="noopener">WhatsApp</a><a class="underline text-secondary" href="${esc(x.p.fragranticaUrl)}" target="_blank" rel="noopener noreferrer">Fragrantica</a></span></div>
        </article>`).join("")}</div>` : ""}

      <div class="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
        <button id="again" class="border border-primary text-primary font-label text-label-lg uppercase px-8 py-4 rounded-xl hover:bg-primary-fixed transition">Repetir el quiz</button>
        <button id="copy" class="border border-outline-variant text-on-surface-variant font-label text-label-lg uppercase px-8 py-4 rounded-xl hover:bg-surface-container transition">Copiar resumen</button>
      </div>
      <p class="mt-6 text-center text-body-sm text-outline">La afinidad es una estimación basada en las notas del perfume y tus respuestas, no una garantía. Notas y acordes derivados de fuentes públicas; ${window.InaraStock.mode === "inventario" ? "mostramos solo lo disponible en Inara." : "el catálogo incluye fragancias del mercado, no necesariamente disponibles en Inara."}</p>
      ${STAFF ? staffPanel(res) : ""}
    </section>`;
    document.getElementById("again").onclick = () => { state = { step: -1, answers: {}, name: state.name }; save(); render(); };
    document.getElementById("copy").onclick = async (ev) => {
      const txt = `Quiz Inara — ${state.name || "cliente"}\n1) ${p.brand} ${p.name} (${E.displayMatch(t.s.total)}%)\n` + res.alts.map((x, i) => `${i + 2}) ${x.p.brand} ${x.p.name} (${E.displayMatch(x.s.total)}%)`).join("\n");
      try { await navigator.clipboard.writeText(txt); ev.target.textContent = "¡Copiado!"; } catch (e) { ev.target.textContent = "No se pudo copiar"; }
    };
  }
  function staffPanel(res) {
    const f = (o) => E.FAMILIES.map((k) => `${k}:${(o[k] || 0).toFixed(1)}`).join(" ");
    return `<details class="mt-8 bg-surface-container rounded-xl p-4 text-body-sm"><summary class="cursor-pointer font-label uppercase text-label-md">Modo asesora</summary>
      <p class="mt-3"><b>U</b> ${f(res.prof.U)}</p><p><b>R</b> ${f(res.prof.R)}</p>
      <table class="mt-3 w-full text-left"><tr><th>#</th><th>Perfume</th><th>total</th><th>coseno</th><th>penal.</th></tr>${res.all.slice(0, 15).map((x, i) => `<tr><td>${i + 1}</td><td>${esc(x.p.brand + " " + x.p.name)}</td><td>${x.s.total.toFixed(2)}</td><td>${x.s.base.toFixed(2)}</td><td>${x.s.penal.toFixed(2)}</td></tr>`).join("")}</table></details>`;
  }

  function render() {
    if (state.step < 0) renderIntro();
    else if (state.step >= QUIZ.length) renderResult();
    else renderQuestion();
  }

  async function init() {
    load();
    CATALOG = E.prepare(window.INARA_CATALOG || []);
    await window.InaraStock.load();
    if (!CATALOG.length) { $app.innerHTML = '<p class="text-center py-20">El catálogo aún no está cargado.</p>'; return; }
    if (state.step >= QUIZ.length) state.step = QUIZ.length - 1;
    render();
  }
  init();
})();
