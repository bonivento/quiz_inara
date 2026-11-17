import fs from "node:fs"; import vm from "node:vm";
const ctx = { window: {}, console }; ctx.window = ctx; vm.createContext(ctx);
for (const f of ["assets/js/catalog.js","assets/js/engine.js","assets/js/questions.js"]) vm.runInContext(fs.readFileSync(f,"utf8"), ctx);
const E = ctx.InaraEngine, Q = ctx.INARA_QUIZ, C = E.prepare(ctx.INARA_CATALOG);
const cases = {
 "fresco-calido": { para:"men", gusta:["citrico","mar"], evita:["no-dulce"], sentir:"fresca", ocasion:"diario", clima:"calido_humedo", intensidad:"suave" },
 "noche-dulce": { para:"cualquiera", gusta:["dulce","especias"], evita:["no-citrico"], sentir:"sensual", ocasion:"noche", clima:"frio", intensidad:"intenso" },
 "verde-natural": { para:"cualquiera", gusta:["verde","madera"], evita:[], sentir:"natural", ocasion:"diario", clima:"templado", intensidad:"medio" },
};
for (const [k,a] of Object.entries(cases)) { const r = E.recommend(C,a,Q); console.log(k, "=>", [r.top,...r.alts].map(x=>x.p.name+" "+E.displayMatch(x.s.total)+"% ["+x.p.accords.slice(0,2).map(c=>c.family)+"]").join(" | ")); }
const z = C.filter(p=>p.accords.length<2).map(p=>p.id); console.log("perfumes con <2 acordes:", z);
for (const [k,a] of Object.entries(cases)) { const r = E.recommend(C,a,Q); console.log(k, r.all.slice(0,6).map(x=>x.s.total.toFixed(2)).join(" "), "...", r.all[r.all.length-1].s.total.toFixed(2)); }
