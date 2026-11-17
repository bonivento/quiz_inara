# Quiz de fragancias — Inara by Alma

Sitio estático (HTML + JS, Tailwind CDN) con la identidad de `inara_web`. Se despliega tal cual en Vercel.

## Cómo funciona
- 8 preguntas (+ perfume favorito opcional) diseñadas según `docs/BENCHMARK.md`.
- `assets/js/engine.js`: deriva 8 familias olfativas por perfume desde su pirámide de notas, puntúa por coseno + rechazos + clima/intensidad/ocasión/notas amadas, y devuelve ganador + alternativas con diversidad.
- Resultado: afinidad, "por qué", acordes, pirámide, WhatsApp y enlace a la ficha de Fragrantica.
- `?asesor=1` en la URL muestra el panel interno con vectores y puntajes para calibrar.

## Datos (importante)
Fragrantica bloquea el acceso automático (403), así que **no se copiaron datos de allí**. Las notas salen de fuentes públicas (campo `source` por perfume) y los **acordes se derivan** de las notas. Cada resultado enlaza a Fragrantica (búsqueda) para consultar su ficha oficial.
- Fuentes: `data/raw/*.json` → `node scripts/build-catalog.mjs` → `assets/js/catalog.js` (generado).
- Para añadir perfumes: edita/crea un JSON en `data/raw/` con el esquema existente y vuelve a ejecutar el script.
- Si tienes un export legítimo de acordes de Fragrantica, puedes añadir un campo `vec` por perfume (8 valores 0–1) y el motor lo usará en lugar del derivado.
- `node scripts/smoke.mjs` corre casos de prueba del motor.

## Fase 2: solo lo que hay en existencia
1. Crea en Supabase: `create table inventario (perfume_id text primary key, cantidad int not null default 0);` con lectura pública (RLS `select` para `anon`).
2. `perfume_id` debe ser el `id` del catálogo (p. ej. `dior-sauvage`).
3. Rellena `supabaseUrl` y `supabaseAnonKey` en `assets/js/config.js`. Con eso el quiz solo recomienda `cantidad > 0`. Si falla la lectura, vuelve al catálogo completo.
4. Pendiente: sincronizar la tabla desde la base de existencias de la marca.

## Desplegar
`vercel --prod` desde esta carpeta (sin build). Pendiente: calibrar los pesos con 20–30 casos de la asesora; textos legales si se capturan datos (Ley 1581).
