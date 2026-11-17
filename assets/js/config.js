/* Configuración del quiz — editar aquí. */
window.INARA_CONFIG = {
  whatsapp: "573052470590",
  instagram: "https://www.instagram.com/inarabyalma",

  /* DISPONIBILIDAD (fase 2). Mientras supabaseUrl esté vacío se recomienda TODO el catálogo de mercado.
     Para activar el filtro por existencias: llena estos 3 campos y crea la tabla (ver README, sección "Inventario").
     La tabla debe tener: perfume_id (text, = id del catálogo) y cantidad (int). */
  supabaseUrl: "",
  supabaseAnonKey: "",
  stockTable: "inventario"
};
