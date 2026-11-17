/* Adaptador de disponibilidad.
   Fase 1: sin configuración => todo el catálogo está "disponible".
   Fase 2: con Supabase configurado => solo perfumes con cantidad > 0 en la tabla de inventario. */
window.InaraStock = (function () {
  let ids = null; // null = sin filtro
  let mode = "mercado";

  async function load() {
    const c = window.INARA_CONFIG || {};
    if (!c.supabaseUrl || !c.supabaseAnonKey) return { mode, count: null };
    try {
      const url = `${c.supabaseUrl.replace(/\/$/, "")}/rest/v1/${encodeURIComponent(c.stockTable || "inventario")}?select=perfume_id,cantidad&cantidad=gt.0`;
      const r = await fetch(url, { headers: { apikey: c.supabaseAnonKey, Authorization: "Bearer " + c.supabaseAnonKey } });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const rows = await r.json();
      ids = new Set(rows.map((x) => x.perfume_id));
      mode = "inventario";
    } catch (e) {
      console.warn("[stock] No se pudo leer el inventario; se usa el catálogo completo.", e);
      ids = null; mode = "mercado";
    }
    return { mode, count: ids && ids.size };
  }

  return { load, isAvailable: (p) => !ids || ids.has(p.id), get mode() { return mode; } };
})();
