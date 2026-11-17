// Une data/raw/*.json en assets/js/catalog.js (validando esquema). Uso: node scripts/build-catalog.mjs
import fs from "node:fs";
import path from "node:path";

const dir = "data/raw";
const out = [];
const seen = new Set();
const problems = [];
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json"))) {
  let arr;
  try { arr = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); } catch (e) { problems.push(`${f}: JSON inválido`); continue; }
  for (const p of arr) {
    const n = p.notes || {};
    const total = ["top", "middle", "base"].reduce((a, l) => a + (n[l] || []).length, 0);
    if (!p.id || !p.brand || !p.name || total < 3) { problems.push(`${f}: ${p.id || p.name} incompleto`); continue; }
    if (seen.has(p.id)) { problems.push(`${f}: id duplicado ${p.id}`); continue; }
    if (!["women", "men", "unisex"].includes(p.gender)) p.gender = "unisex";
    seen.add(p.id);
    out.push({ id: p.id, brand: p.brand, name: p.name, concentration: p.concentration || "", year: p.year || null, gender: p.gender,
      notes: { top: n.top || [], middle: n.middle || [], base: n.base || [] }, source: p.source || "" });
  }
}
out.sort((a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));
fs.writeFileSync("assets/js/catalog.js", "/* GENERADO por scripts/build-catalog.mjs — no editar a mano. */\nwindow.INARA_CATALOG = " + JSON.stringify(out, null, 1) + ";\n");
console.log(`${out.length} perfumes -> assets/js/catalog.js`);
if (problems.length) console.log("Avisos:\n - " + problems.join("\n - "));
