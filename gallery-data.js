/**
 * MC LASHES AND BEAUTY - Gallery Data
 * ====================================
 * SOLO DATOS (SIN VENDEDOR AQUÍ)
 */

/* =========================
   GALERÍA
========================= */

const GALLERY_ITEMS = [
    // ================= LASHES =================
    {
        id: 1,
        title: "Volume Lashes Classic",
        description: "Extensiones de pestañas voluminosas con efecto natural",
        category: "lashes",
        image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=1000&fit=crop",
        tags: ["volume", "classic", "natural"],
        isNew: true,
        isTrending: true
    },
    {
        id: 2,
        title: "Mega Volume Set",
        description: "Lashes dramáticas con máximo volumen para eventos especiales",
        category: "lashes",
        image: "https://images.unsplash.com/photo-1583001809237-c8f1094a4845?w=800&h=1000&fit=crop",
        tags: ["mega volume", "dramático", "fiesta"],
        isNew: true,
        isTrending: true
    },
    {
        id: 3,
        title: "Hybrid Lashes",
        description: "Combinación perfecta de volumen y longitud natural",
        category: "lashes",
        image: "https://images.unsplash.com/photo-1560426424-e9242d8acc53?w=800&h=1000&fit=crop",
        tags: ["híbrido", "elegante", "versátil"],
        isNew: false,
        isTrending: true
    },
    {
        id: 4,
        title: "Natural Lash Extensions",
        description: "Extensiones sutiles para uso diario",
        category: "lashes",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=1000&fit=crop",
        tags: ["natural", "diario", "sutil"],
        isNew: false,
        isTrending: false
    },

    // ================= NAILS =================
    {
        id: 5,
        title: "Diseño Halloween Naranja",
        description: "Uñas acrílicas con diseño temático de Halloween",
        category: "nails",
        image: "images/nails-sample-1.png",
        tags: ["halloween", "naranja", "creativo"],
        isNew: false,
        isTrending: false
    },
    {
        id: 6,
        title: "French Elegante",
        description: "Manicure francés con detalles finos",
        category: "nails",
        image: "images/nails-sample-1.png",
        tags: ["french", "elegante", "clásico"],
        isNew: true,
        isTrending: true
    },
    {
        id: 7,
        title: "Valentine Nails",
        description: "Diseño romántico con corazones rojos",
        category: "nails",
        image: "images/nails-sample-2.png",
        tags: ["valentine", "romántico", "rojo"],
        isNew: true,
        isTrending: true
    },
    {
        id: 8,
        title: "XOXO Love Design",
        description: "Uñas largas con arte de amor",
        category: "nails",
        image: "images/nails-sample-3.png",
        tags: ["amor", "creativo", "detallado"],
        isNew: false,
        isTrending: true
    },
    {
        id: 9,
        title: "Stiletto Red Glam",
        description: "Uñas stiletto rojas brillantes",
        category: "nails",
        image: "images/nails-sample-2.png",
        tags: ["stiletto", "rojo", "glam"],
        isNew: true,
        isTrending: true
    },
    {
        id: 10,
        title: "Pink Ombré Nails",
        description: "Degradado rosa suave",
        category: "nails",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=1000&fit=crop",
        tags: ["ombré", "rosa", "suave"],
        isNew: false,
        isTrending: false
    },

    // ================= MAKEUP =================
    {
        id: 13,
        title: "Soft Glam Makeup",
        description: "Maquillaje natural elegante",
        category: "makeup",
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=1000&fit=crop",
        tags: ["natural", "glam", "suave"],
        isNew: false,
        isTrending: true
    },
    {
        id: 14,
        title: "Bold Pink Glam",
        description: "Maquillaje rosa intenso",
        category: "makeup",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=1000&fit=crop",
        tags: ["rosa", "atrevido", "glam"],
        isNew: true,
        isTrending: true
    },

    // ================= HAIR =================
    {
        id: 19,
        title: "Romantic Curls",
        description: "Rizos suaves elegantes",
        category: "hair",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop",
        tags: ["rizos", "romántico", "elegante"],
        isNew: false,
        isTrending: true
    },
    {
        id: 20,
        title: "Sleek Ponytail",
        description: "Coleta alta pulida moderna",
        category: "hair",
        image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800&h=1000&fit=crop",
        tags: ["coleta", "moderno", "pulido"],
        isNew: true,
        isTrending: true
    }
];

/* =========================
   EXPORT GLOBAL
========================= */

window.GALLERY_ITEMS = GALLERY_ITEMS;