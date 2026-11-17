# Benchmark de quizzes de recomendación de fragancias

Proyecto: quiz de fragancias de Inara by Alma (cosmética botánica, Colombia).
Fecha de la investigación: 2026-11-16. Método: WebSearch y WebFetch sobre páginas públicas.

## 0. Alcance y límites de la verificación (leer primero)

Varios sitios bloquearon la lectura automática (HTTP 403: Scentbird blog, Macy's, Notino, The Perfume Shop, Marionnaud, Sephora) o muestran el quiz solo tras interactuar con JavaScript. Por eso:

- **Verificado con detalle (preguntas y resultado leídos en la fuente):** Scentbird (vía reseña de terceros), Snif, Brown Thomas, Lavanila, Fiole (vía Typeform), Les Senteurs, Pinrose (vía blog de Outgrow).
- **Verificado solo en parte (se sabe cómo funciona, no el listado de preguntas):** Douglas/Nocibé, Experimental Perfume Club, Noteworthy, Scento, Glasshouse, Dossier, Sephora.
- **No pude verificar nada específico:** Le Labo, Byredo, Fragrantica/Parfumo, Boy Smells, Perfumer H, Maison Francis Kurkdjian, Sillage/Nose, Scent Split, Aromatics International, Jazmin Saraï, Olfactif, Glossier You, Zara, Mercado Libre, Notino (solo existe una página "Fragrance Finder", sin contenido legible). En las búsquedas no apareció un quiz propio de Boy Smells, MFK ni de Perfumer H, y Jo Malone solo se menciona de pasada como marca "que tiene un quiz", sin detalle. **No los incluyo en la tabla como si los hubiera analizado.**
- Las cifras de conversión (completitud, opt-in) vienen de blogs de proveedores de software de quizzes (Octane AI) y de las propias marcas. Son marketing: úsalas como orden de magnitud, no como verdad.
- Las secciones marcadas **[Inferencia]** son criterio de diseño mío, no un hallazgo de las fuentes.

## 1. Tabla comparativa

| Marca / retailer | Nº preguntas | Tipo de pregunta | Resultado | Captura de lead | Estado de verificación | Fuente |
|---|---|---|---|---|---|---|
| Scentbird | 5 | Binarias de texto: masculino/femenino, cálido/fresco, sofisticado/divertido, atrevido/suave, y cómo quieres sentirte (5 opciones) | 12 fragancias, cada una con notas y descripción corta | Pide crear cuenta después de las preguntas, sin obligación de comprar | Reseña de terceros, 2022; el quiz puede haber cambiado | https://www.mysubscriptionaddiction.com/2022/04/scentbird-fragrance-quiz.html |
| Pinrose (también en Sephora) | 4 | Visuales, elección entre dos imágenes (piña o burbujas doradas; cielo nublado o planta; alga o miel) y una de género musical | Una fragancia personalizada | Pide nombre al inicio y recoge email para retargeting | Blog de Outgrow, no el sitio; el origen con Sephora viene de prensa antigua | https://outgrow.co/blog/?p=61028 y https://www.retaildive.com/ex/mobilecommercedaily/sephora-wafts-up-fragrance-sales-by-introducing-personalized-scent-mobile-quiz |
| Snif | 3 | Familia de aroma (7 opciones con descripción), rasgos de personalidad, "cita ideal" (7 escenarios, uno por familia) | Familia dominante (la más elegida) y lista de productos por familia | El quiz no tiene paso de email; hay suscripción aparte en el pie de página | Leído directamente | https://snif.co/blogs/news/perfume-quiz |
| Brown Thomas | 7 | Personalidad, estilo, género de cine, plan ideal, tiempo libre, olor que te alegra, cómo quieres que te haga sentir. 5 opciones cada una | Una familia (floral, ámbar, fresco, cítrico, amaderado) con descripción, notas típicas, ejemplos y enlace a tienda | No se observó | Leído directamente. No explica cómo mapea respuestas a familia | https://www.brownthomas.com/perfume-quiz |
| Lavanila | 15 | Estilo de vida/psicográficas, 4 opciones A-D; una de notas (hasta 2), intensidad, momento de uso, estación | Una de 4 fragancias según la letra más elegida | No se observó | Leído directamente. No explica desempates | https://www.lavanila.com/blogs/blog/perfume-quiz |
| Fiole | No indicado | Visuales, elegir entre dos descripciones de familia olfativa con foto ("cítricos frescos" o "maderas cálidas") | Combinación de familias favoritas, que lleva a una caja de muestras ciegas | Lleva a compra de muestras | Vía artículo de Typeform | https://www.typeform.com/blog/fioles-quiz-signature-scent |
| Les Senteurs | 1 paso (buscador) | Escribes un perfume que ya te gusta | Hasta 5 sugerencias de su catálogo (no clones), basadas en ingredientes, pirámide y perfil | Si no está en su base, ofrece pedir recomendación por email | Leído directamente | https://www.lessenteurs.com/pages/fragrance-finder |
| Douglas / Nocibé | No indicado | Criterios de aroma y perfumes favoritos | Perfil olfativo por notas y recomendaciones filtrables por grupo o marca; luego prueba en tienda | No indicado | Artículo de prensa; sin métricas del tool | https://www.horizont.net/marketing/nachrichten/digitale-transformation-warum-bei-douglas-jetzt-eine-ki-die-richtigen-duefte-erschnuppert-196745 |
| Noteworthy | No indicado ("3 a 5 minutos") | Datos personales, vacaciones ideales, tipos de aroma, cuándo usas fragancia | Kit de 4 muestras (incluye una "comodín") | No indicado | Marketing. El 89 % de éxito es autodeclarado; no encontré metodología publicada | https://www.mic.com/shopping/noteworthy-scents-valentines-promotion y https://noteworthy-scents.gorgias.help/en-US/articles/fragrance-finder-quiz-105327 |
| Experimental Perfume Club | No indicado (4 pasos) | No indicado | Set de descubrimiento personalizado de 5 fragancias; se puede repetir el quiz | No indicado | Parcial | https://experimentalperfumeclub.com/pages/fragrance-finder-sample-set |
| Scento | 9 (también dice "5 minutos") | Aromas y estados de ánimo, notas favoritas, ocasiones, estilo | "Perfil olfativo" y perfumes a juego. Sin % de afinidad indicado | No indicado | Parcial y con inconsistencia interna en la duración | https://www.scento.com/quiz |
| Dossier | No indicado | No indicado | No indicado | Solo suscripción general de newsletter | Solo la página de entrada: se describe como "corto" y hecho por expertos | https://dossier.co/pages/quiz |
| Glasshouse Fragrances | No indicado | Preferencias, "momentos", notas | Perfiles y perfumes | Banner "$10 de descuento en tu primera compra" con email. No consta si es requisito para ver el resultado | Parcial | https://glasshousefragrances.com/pages/find-your-fragrance-quiz |
| The Perfume Shop (UK) | No indicado | No indicado | Notas en común, **porcentaje de coincidencia** y precio por recomendación | No indicado | Solo un fragmento de búsqueda; la página dio 403. No explican cómo calculan el % | https://theperfumeshop.com/blog/expertise/find-your-perfect-perfume-with-the-fragrance-finder |
| Marionnaud (CH) | No indicado | Opción de partir de un perfume parecido a tu "signature" | No verificado | No verificado | Solo fragmento | https://www.marionnaud.ch/blog/exklusives/ueber-den-duftfinder |

## 2. Hallazgos

### 2.1 Número de preguntas
- El rango observado va de 1 (Les Senteurs, a partir de un perfume conocido) a 15 (Lavanila). Los casos verificados: 3 (Snif), 4 (Pinrose), 5 (Scentbird), 7 (Brown Thomas), 9 (Scento), 15 (Lavanila).
- La guía de Octane AI recomienda 5 a 8 preguntas como punto óptimo y dice que cada pregunta debe mejorar la recomendación o generar inversión emocional. Otra guía de terceros que apareció en la búsqueda habla de 4 a 7. Son recomendaciones de vendedores de herramientas, no estudios independientes. Fuente: https://octaneai.com/blog/quiz-questions-that-convert
- Un quiz largo (Lavanila, 15) usa preguntas de "personalidad" (película, playlist, vacaciones) con 4 resultados posibles. Esas preguntas reparten a la persona en pocos cajones pero aportan poca información olfativa real.

### 2.2 Tipos de pregunta que aparecen
- **Visuales / binarias por imagen:** Pinrose y Fiole. Octane AI afirma que las preguntas visuales obtienen 23 % más engagement que las de solo texto (dato del proveedor). Fiole destaca que hablar en lenguaje llano ("flores frescas") evita las asociaciones negativas de la palabra "floral". Fuente: Typeform arriba.
- **Psicográficas (personalidad, estilo, cine, tiempo libre):** Brown Thomas, Lavanila, Snif. Son entretenidas, pero el mapeo respuesta a familia es arbitrario y no está justificado en ninguna fuente.
- **Cómo quieres sentirte:** aparece en Scentbird, Brown Thomas y Lavanila. Es la pregunta de intención más repetida.
- **Notas gustadas:** Lavanila (hasta 2), Noteworthy, Scento. **Notas rechazadas:** no encontré un quiz verificado que pregunte explícitamente por notas que se rechazan. Es una oportunidad.
- **Ocasión / momento de uso:** Lavanila, Scento, Noteworthy.
- **Intensidad:** solo vi explícita en Lavanila.
- **Estación:** Lavanila (estación que te energiza). **[Inferencia]** En Colombia casi no hay estaciones; sirve más preguntar por clima o ciudad.
- **Perfumes que ya usa:** Les Senteurs, Douglas, Marionnaud. Es un camino rápido y muy específico para quien ya sabe lo que le gusta.
- **Presupuesto y género:** género aparece en Scentbird (primera pregunta). No encontré presupuesto como pregunta del quiz en las fuentes legibles, aunque la guía de Octane lo lista entre los tipos de pregunta de quiz en general.

### 2.3 Lógica de puntuación (lo que se pudo ver)
- **Conteo de la letra más elegida:** Lavanila (A, B, C, D, cada una es un producto). No explica empates. Snif: la familia más elegida. Simple y poco matizado.
- **Familia dominante a lista de productos:** Snif y Brown Thomas. El mapeo de respuesta a familia no se explica.
- **Perfil de notas + filtros:** Douglas arma un perfil por notas y deja filtrar por grupo o marca.
- **Similitud por ingredientes y pirámide:** Les Senteurs recomienda por ingredientes, pirámide y perfil global, y avisa de que no son clones.
- **Manejo de contradicciones:** Fiole dice que su backend hace preguntas de seguimiento cuando las respuestas se contradicen, porque la gente cambia de opinión.
- **% de afinidad:** solo The Perfume Shop lo muestra, y no explican el cálculo. No pude confirmar cómo lo hace ninguna marca.
- **Elemento exploratorio:** Noteworthy incluye un "comodín" en el kit, según reseñas.

### 2.4 UX
- Progreso: Octane AI recomienda indicador de progreso y empezar con preguntas atractivas, dejando lo personal para el final. Brown Thomas usa un botón "Siguiente pregunta" por pantalla. No pude evaluar microinteracciones ni comportamiento en móvil de ningún quiz (no hay datos verificables; las páginas se cargan con JavaScript).
- Hacer que todas las opciones se sientan positivas (Octane AI).
- Permitir repetir el quiz (Brown Thomas y Experimental Perfume Club lo ofrecen).

### 2.5 Captura de lead
- Scentbird pide crear cuenta tras responder, antes de ver los 12 resultados según la reseña.
- Pinrose pide nombre al inicio y recoge email. Snif no integra email en el quiz.
- Octane AI recomienda pedir el email justo antes del resultado y explicar qué gana la persona. Cifras de opt-in contradictorias en sus propios materiales: 29 % (promedio en su blog) y 42 % (otra publicación de ellos en la búsqueda). Casos de clientes: Kinvara 76 % de finalización y 43 % de opt-in; Eversio Wellness 86 % y 70 %; Bariatric Fusion 44 % de finalización. Todos autodeclarados.
- No encontré ningún caso verificado de captura por WhatsApp. **[Inferencia]** En Colombia WhatsApp es el canal natural de venta, pero no tengo una fuente que lo cuantifique.

### 2.6 Formato del resultado
- Patrones observados: una sola familia con explicación (Brown Thomas, Snif), una sola fragancia (Pinrose), lista larga (Scentbird, 12), lista corta (Les Senteurs, hasta 5; Experimental Perfume Club, 5), kit de muestras (Noteworthy, 4; Fiole).
- Brown Thomas incluye descripción de la familia, notas típicas, ejemplos y enlace a tienda, un buen modelo de resultado explicado.
- Scentbird muestra notas y descripción por cada fragancia.
- Solo The Perfume Shop muestra % de coincidencia, notas en común y precio.
- La muestra de bajo costo es una salida frecuente (Fiole, Noteworthy, Experimental Perfume Club). Fiole reporta ~25 % de conversión de muestra a producto completo frente a 0,5-1 % "estándar de la industria" (autodeclarado).

### 2.7 Errores comunes (observados o recogidos de las fuentes)
1. Mapear respuestas de personalidad a una familia sin lógica olfativa (Brown Thomas, Lavanila; no explican el mapeo).
2. Resultado de una sola etiqueta ("eres floral") sin producto concreto ni alternativas.
3. Sin manejo de empates o contradicciones (Lavanila no explica empates).
4. Quiz demasiado largo (15 preguntas) con poca información olfativa.
5. Usar jerga ("floral", "oriental", "amaderado") sin explicación; Fiole advierte de la carga negativa de ciertos términos.
6. No preguntar qué se rechaza (ninguna fuente verificada lo hace).
7. Cifras de "precisión" sin metodología (Noteworthy 89 %; no hay validación publicada que haya podido encontrar).
8. Capturar email sin decir qué se gana a cambio (Octane AI).

## 3. Mejores prácticas que se desprenden
- 6 a 9 preguntas, una por pantalla, con barra de progreso.
- Mezclar pocas preguntas visuales con otras de texto corto y evitar jerga.
- Preguntar por lo que gusta **y** por lo que se rechaza.
- Resultado con producto concreto, 2 alternativas, explicación del "por qué" y notas.
- Pedir contacto antes del resultado, con beneficio claro, y permitir saltarlo si se quiere cuidar la confianza **[Inferencia]**.
- Ofrecer una salida de bajo riesgo (muestra, decant o prueba en tienda).

---

## 4. Recomendación de diseño para el quiz de Inara

Principio: el quiz sirve al **equipo y a clientes**; debe dar el mismo resultado si lo responde la clienta o una asesora por ella, y debe ser explicable. Todo lo de abajo es propuesta mía **[Inferencia]** apoyada en los hallazgos; los precios y los perfumes del catálogo de Inara son datos que el equipo debe aportar (no los conozco).

### 4.1 Las 8 preguntas

Eje de scoring: 8 familias/acordes: `FLORAL`, `VERDE_HERBAL`, `CITRICO`, `AMADERADO`, `AMBAR_ESPECIADO`, `GOURMAND_VAINILLA`, `ACUATICO_FRESCO`, `MUSK_POLVO` (almizcle/limpio). Los nombres que ve la persona son en lenguaje llano.

**P1. ¿Para quién es? (filtro, no puntúa)**
Para mí / Para regalar a una mujer / Para regalar a un hombre / Unisex, me da igual.
Si es regalo, el resto se responde pensando en la otra persona.

**P2. ¿Qué te gusta oler? (visual, elige hasta 3 tarjetas con foto y texto)**
- Flores frescas de jardín (FLORAL)
- Hierbas, hojas y té recién cortado (VERDE_HERBAL)
- Cáscara de naranja, limón o bergamota (CITRICO)
- Madera, tierra húmeda e incienso (AMADERADO)
- Canela, resinas y especias tibias (AMBAR_ESPECIADO)
- Vainilla, café, coco o postre (GOURMAND_VAINILLA)
- Mar, lluvia y aire fresco (ACUATICO_FRESCO)
- Ropa limpia, piel, talco (MUSK_POLVO)

**P3. ¿Qué NO soportas? (rechazo, elige hasta 2, o "Ninguno")**
Lo mismo que P2 con redacción negativa: "Muy dulce", "Muy floral", "Muy cítrico/ácido", "Muy amaderado/ahumado", "Muy especiado", "Muy fresco/acuático", "Muy polvoso". Resta puntos fuerte (ver 4.2).

**P4. ¿Cómo quieres sentirte? (texto, una opción)**
Fresca y despierta / Tranquila y envolvente / Sensual y misteriosa / Alegre y juguetona / Elegante y segura / Natural y conectada con la tierra (este último refuerza el lado botánico de Inara).

**P5. ¿Cuándo lo usarás más? (una opción)**
Día a día y trabajo / Salidas de noche / Ocasiones especiales / Casa y descanso / Ejercicio y planes al aire libre.

**P6. ¿Cómo es tu clima habitual? (una opción)**
Frío (tipo Bogotá, Tunja) / Templado (Medellín, Eje Cafetero) / Cálido seco (Cali, Cúcuta) / Cálido húmedo (Barranquilla, Cartagena, costa).
Reemplaza a "estación", que en Colombia no discrimina. Calor y humedad penalizan fragancias densas.

**P7. ¿Qué tan intenso lo quieres? (una opción)**
Suave, solo para mí / Se nota a poca distancia / Que se note y deje estela.

**P8. ¿Ya tienes un perfume favorito? (opcional, texto con buscador o "no tengo/omitir")**
Si el perfume está en la tabla interna del equipo, aporta su vector de familias como ajuste suave. Si no está, se ignora.

**Paso final (no es pregunta de scoring): contacto**
"Te enviamos tu resultado y tus notas por WhatsApp o email" con nombre y un solo canal obligatorio de dos; consentimiento explícito de contacto (Ley 1581 de 2012 de protección de datos personales en Colombia, a validar con asesoría legal). Mostrar un beneficio concreto (por ejemplo muestra o guía), a definir por la marca. Colocarlo antes de la pantalla de resultado, como recomienda Octane AI, pero con opción "Ver resultado sin guardar" **[Inferencia]** para no frenar la finalización.

Presupuesto: no lo incluyo como pregunta porque añade fricción y Inara puede filtrar por catálogo; si el equipo lo necesita, se añade como P9 opcional con rangos en COP definidos por la marca.

### 4.2 Algoritmo de scoring propuesto

**Datos.** Cada perfume del catálogo (los carga el equipo) tiene un vector `F` de 8 valores de 0 a 1 (peso de cada familia), más metadatos: `intensidad` (1-3), `clima` (frío, templado, cálido, humedo: marcado como apto o no), `genero` (f, m, unisex), `ocasion` (lista), `mood` (lista), `notas` (salida, corazón, fondo) y `activo` (stock).

**Vector del usuario `U`** (8 valores, inicia en 0):
1. P2: +3 a cada familia elegida (máximo 3).
2. P4: suma un perfil predefinido por emoción, por ejemplo Fresca y despierta = CITRICO +2, VERDE_HERBAL +1, ACUATICO +1; Tranquila = MUSK +2, FLORAL +1, GOURMAND +1; Sensual = AMBAR +2, GOURMAND +1, AMADERADO +1; Alegre = CITRICO +1, FLORAL +1, GOURMAND +1; Elegante = FLORAL +1, AMADERADO +1, MUSK +1; Natural = VERDE +2, AMADERADO +1. (Tabla inicial a calibrar con el equipo.)
3. P5: ajuste de +1 a familias típicas de la ocasión (noche: AMBAR, GOURMAND; día: CITRICO, VERDE, FLORAL; etc.).
4. P8: si el perfume se reconoce, sumar +2 × su vector.
5. P3: restar 4 a cada familia rechazada (el rechazo pesa más que el gusto para evitar la peor mala experiencia).
6. Normalizar `U` a longitud 1 después de recortar negativos a 0 (guardar los negativos como `R` para penalizar).

**Afinidad de cada perfume:**
```
base      = cosine(U, F)                    # 0 a 1
penaliz   = suma(R[familia] * F[familia])   # rechazos que el perfume contiene
ajuste    = + 0.08 si clima del perfume encaja con P6
            - 0.15 si el clima desentona (p. ej. fondo denso en costa húmeda)
            + 0.05 si intensidad |perfume - P7| = 0; -0.05 si diferencia = 2
            + 0.05 si ocasión coincide con P5
            filtro duro: genero (P1) y activo
afinidad  = clamp(base - 0.5*penaliz + ajuste, 0, 1)
```
Los coeficientes son un punto de partida **[Inferencia]**: hay que calibrarlos con 20 a 30 casos de prueba hechos por el equipo (la asesora dice qué perfume recomendaría para cada perfil y se ajustan pesos hasta que coincidan).

**Resultado.** Ordenar por `afinidad`. Top 1 = ganador. Alternativas: 2 más, aplicando diversidad (la segunda debe diferir en la familia dominante, o ser la mejor de otra familia). Un "comodín" opcional como el de Noteworthy: el perfume con mejor afinidad entre las familias que la persona **no** eligió ni rechazó.
Empates (diferencia < 0.02): desempata el que tenga mayor coincidencia en P2, luego mayor stock.
Contradicciones (misma familia en P2 y P3): se marca la familia como "ambigua" y se muestra la pregunta de aclaración "¿Dulce, pero no empalagoso?" antes de continuar, siguiendo la idea de Fiole.
Si la mejor afinidad es menor a 0.5: mostrar mensaje de baja certeza y derivar a asesora por WhatsApp.

**Sobre el "% de afinidad":** mostrarlo como "Coincidencia alta/media" o como porcentaje redondeado al 5. Como el número no es una probabilidad real, no lo presentaría como "precisión" ni como tasa de éxito (las marcas que lo hacen no publican metodología).

### 4.3 Estructura de la pantalla de resultado

1. **Cabecera:** nombre de la persona y frase corta: "Tu familia: Verde fresca con toques cítricos".
2. **Perfume ganador (tarjeta grande):** foto, nombre, afinidad ("Coincidencia 92 %"), precio, botón principal "Pedir por WhatsApp" y secundario "Quiero una muestra" (si Inara la ofrece).
3. **El porqué (3 viñetas, generadas desde las reglas):** "Elegiste hierbas y cítricos"; "Lo quieres suave y para el día"; "Evitamos lo muy dulce, que marcaste como rechazo"; "Apto para clima cálido".
4. **Pirámide olfativa:** notas de salida, corazón y fondo con íconos; resaltar en negrita las que coinciden con lo que eligió. Incluir los ingredientes botánicos de Inara como diferencial.
5. **Dos alternativas (tarjetas pequeñas):** una "parecida" y una "diferente pero te puede gustar", con una línea de por qué y su afinidad.
6. **Rasgos:** barra de intensidad y ocasión recomendada.
7. **Compartir y repetir:** enviar resultado por WhatsApp/email, "Repetir el quiz", "Hablar con una asesora".
8. **Modo equipo (interno):** misma pantalla con un panel plegable que muestra el vector `U`, `R` y la puntuación por perfume, para auditar y calibrar (útil porque el quiz también es herramienta del equipo).

### 4.4 UX
- Una pregunta por pantalla, barra de progreso "3 de 8", botón Atrás, tarjetas grandes táctiles (móvil primero; en Colombia es lo habitual **[Inferencia]**, sin fuente verificada).
- Foto o ilustración botánica en P2 y P3; microanimación breve al elegir. Textos en español colombiano neutro, sin jerga olfativa.
- Guardar progreso localmente por si se interrumpe.
- Medir desde el día 1: inicio, finalización por pregunta, opt-in, clic a WhatsApp y compra, para contrastar con las cifras de proveedores, que no he podido verificar de forma independiente.

### 4.5 Pendientes para el equipo
- Catálogo con vectores `F`, intensidad, clima y notas de cada perfume.
- Textos y beneficio del paso de contacto, y revisión legal de la autorización de tratamiento de datos.
- Fotos para P2 y P3.
- Casos de prueba para calibrar los coeficientes.
