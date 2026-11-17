/* Definición del quiz (8 preguntas + favorito opcional). Basado en docs/BENCHMARK.md §4.1.
   add: suma a familias | avoid: resta | notes: notas explícitas que ama. */
window.INARA_QUIZ = [
  { id: "para", type: "single", icon: "person", title: "¿Para quién es el perfume?", hint: "Si es un regalo, responde pensando en esa persona.",
    options: [
      { id: "women", label: "Para ella", icon: "face_3" },
      { id: "men", label: "Para él", icon: "face_6" },
      { id: "cualquiera", label: "Sin etiquetas, me da igual", icon: "all_inclusive" }
    ] },
  { id: "gusta", type: "multi", max: 3, icon: "favorite", title: "¿Qué te gusta oler?", hint: "Elige hasta 3.",
    options: [
      { id: "floral", label: "Flores de jardín", sub: "rosa, jazmín, peonía", icon: "local_florist", add: { FLORAL: 3 }, notes: ["rosa", "jazmin", "peonia"] },
      { id: "verde", label: "Hierbas, hojas y té", sub: "recién cortado", icon: "grass", add: { VERDE: 3 }, notes: ["lavanda", "menta", "te "] },
      { id: "citrico", label: "Cáscara de cítricos", sub: "naranja, limón, bergamota", icon: "nutrition", add: { CITRICO: 3 }, notes: ["bergamota", "limon", "naranja"] },
      { id: "madera", label: "Madera, tierra e incienso", sub: "sándalo, cedro, pachulí", icon: "park", add: { AMADERADO: 3 }, notes: ["sandalo", "cedro", "pachuli"] },
      { id: "especias", label: "Especias y resinas tibias", sub: "canela, ámbar, pimienta", icon: "local_fire_department", add: { AMBAR: 3 }, notes: ["canela", "ambar", "pimienta"] },
      { id: "dulce", label: "Vainilla, café o postre", sub: "coco, caramelo, frutas", icon: "cake", add: { GOURMAND: 3 }, notes: ["vainilla", "cafe", "coco", "caramelo"] },
      { id: "mar", label: "Mar, lluvia y aire fresco", sub: "brisa marina, ozono", icon: "waves", add: { ACUATICO: 3 }, notes: ["marin", "ozon"] },
      { id: "limpio", label: "Ropa limpia y piel suave", sub: "almizcle, talco", icon: "dry_cleaning", add: { MUSK: 3 }, notes: ["almizcle", "musk"] }
    ] },
  { id: "evita", type: "multi", max: 2, none: true, icon: "block", title: "¿Qué NO soportas?", hint: "Elige hasta 2, o ninguno. Lo que rechazas pesa más que lo que te gusta.",
    options: [
      { id: "no-dulce", label: "Muy dulce, empalagoso", icon: "cake", avoid: { GOURMAND: 4 } },
      { id: "no-floral", label: "Muy floral", icon: "local_florist", avoid: { FLORAL: 4 } },
      { id: "no-citrico", label: "Muy cítrico o ácido", icon: "nutrition", avoid: { CITRICO: 4 } },
      { id: "no-madera", label: "Muy amaderado o ahumado", icon: "park", avoid: { AMADERADO: 4 } },
      { id: "no-especias", label: "Muy especiado", icon: "local_fire_department", avoid: { AMBAR: 4 } },
      { id: "no-fresco", label: "Muy fresco o acuático", icon: "waves", avoid: { ACUATICO: 4 } },
      { id: "no-polvo", label: "Muy polvoso", icon: "dry_cleaning", avoid: { MUSK: 4 } }
    ] },
  { id: "sentir", type: "single", icon: "mood", title: "¿Cómo quieres sentirte?", hint: "Elige la que más te represente hoy.",
    options: [
      { id: "fresca", label: "Fresca y despierta", icon: "wb_sunny", add: { CITRICO: 2, VERDE: 1, ACUATICO: 1 } },
      { id: "tranquila", label: "Tranquila y envolvente", icon: "spa", add: { MUSK: 2, FLORAL: 1, GOURMAND: 1 } },
      { id: "sensual", label: "Sensual y misteriosa", icon: "nightlife", add: { AMBAR: 2, GOURMAND: 1, AMADERADO: 1 } },
      { id: "alegre", label: "Alegre y juguetona", icon: "celebration", add: { CITRICO: 1, FLORAL: 1, GOURMAND: 1 } },
      { id: "elegante", label: "Elegante y segura", icon: "diamond", add: { FLORAL: 1, AMADERADO: 1, MUSK: 1 } },
      { id: "natural", label: "Natural y conectada con la tierra", icon: "eco", add: { VERDE: 2, AMADERADO: 1 } }
    ] },
  { id: "ocasion", type: "single", icon: "event", title: "¿Cuándo lo usarás más?", hint: "",
    options: [
      { id: "diario", label: "Día a día y trabajo", icon: "work" },
      { id: "noche", label: "Salidas de noche", icon: "nightlife" },
      { id: "especial", label: "Ocasiones especiales", icon: "celebration" },
      { id: "casa", label: "Casa y descanso", icon: "weekend", add: { MUSK: 1, GOURMAND: 1 } },
      { id: "aire", label: "Planes al aire libre", icon: "hiking", add: { CITRICO: 1, ACUATICO: 1, VERDE: 1 } }
    ] },
  { id: "clima", type: "single", icon: "thermostat", title: "¿Cómo es tu clima habitual?", hint: "El calor y la humedad cambian cómo se siente un perfume.",
    options: [
      { id: "frio", label: "Frío", sub: "Bogotá, Tunja, Pasto", icon: "ac_unit" },
      { id: "templado", label: "Templado", sub: "Medellín, Eje Cafetero", icon: "partly_cloudy_day" },
      { id: "calido_seco", label: "Cálido seco", sub: "Cali, Cúcuta, Neiva", icon: "wb_sunny" },
      { id: "calido_humedo", label: "Cálido húmedo", sub: "Barranquilla, Cartagena, Santa Marta", icon: "water_drop" }
    ] },
  { id: "intensidad", type: "single", icon: "graphic_eq", title: "¿Qué tan intenso lo quieres?", hint: "",
    options: [
      { id: "suave", label: "Suave, solo para mí", icon: "volume_mute" },
      { id: "medio", label: "Se nota a poca distancia", icon: "volume_down" },
      { id: "intenso", label: "Que se note y deje estela", icon: "volume_up" }
    ] },
  { id: "favorite", type: "search", optional: true, icon: "search", title: "¿Ya tienes un perfume favorito?", hint: "Opcional. Si está en nuestro catálogo, afinamos el resultado." }
];
