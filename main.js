/**
 * MC LASHES AND BEAUTY - Main JavaScript
 * =======================================
 * Multi-vendor version (FINAL CLEAN)
 */

/* =========================
   VARIABLES GLOBALES
========================= */

let currentFilter = 'all';
let cartItems = [];
let allItems = [];

/* =========================
   VENDEDOR DINÁMICO (MULTI)
========================= */

function getVendorFromURL() {
    const params = new URLSearchParams(window.location.search);
    const vendorId = params.get("vendor") || "mayra";

    if (window.VENDORS && window.VENDORS[vendorId]) {
        return window.VENDORS[vendorId];
    }

    return window.VENDORS?.mayra || null;
}

window.VENDOR = getVendorFromURL();

/* =========================
   INICIALIZACIÓN
========================= */

document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initFilters();
    initNavbar();

    loadCartFromStorage();
    updateCartDisplay();

    applyVendorData();

    /* =========================
       🔥 WHATSAPP GLOBAL SYSTEM
    ========================= */
    initWhatsAppSystem();
});

/* =========================
   GALERÍA
========================= */

function initGallery() {
    allItems = window.GALLERY_ITEMS || [];
    renderGallery(currentFilter);
}

function renderGallery(filter = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    const filteredItems = filter === 'all'
        ? allItems
        : allItems.filter(item => item.category === filter);

    galleryGrid.innerHTML = '';

    filteredItems.forEach((item, index) => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 col-sm-12';
        col.style.animationDelay = `${index * 0.1}s`;

        col.innerHTML = `
            <div class="gallery-item" onclick="openImageModal(${item.id})">
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <div class="gallery-tags">
                        ${item.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        galleryGrid.appendChild(col);
    });
}

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {

            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFilter = btn.dataset.filter;

            const galleryGrid = document.getElementById('galleryGrid');
            if (!galleryGrid) return;

            galleryGrid.style.opacity = '0';

            setTimeout(() => {
                renderGallery(currentFilter);
                galleryGrid.style.opacity = '1';
            }, 250);
        });
    });
}

function openImageModal(itemId) {
    const item = allItems.find(i => i.id === itemId);
    if (!item) return;

    let modal = document.getElementById('imageModal');

    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'imageModal';

        modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <img class="img-fluid w-100 rounded">
                    <div class="modal-description mt-3"></div>
                </div>
            </div>
        </div>`;
        document.body.appendChild(modal);
    }

    modal.querySelector('.modal-title').textContent = item.title;
    modal.querySelector('img').src = item.image;

    modal.querySelector('.modal-description').innerHTML = `
        <p><strong>Categoría:</strong> ${item.category}</p>
        <p>${item.description}</p>
    `;

    new bootstrap.Modal(modal).show();
}






/* =========================
   CARRITO
========================= */

function addToCart(name, price, code) {

    const existing = cartItems.find(i => i.name === name && i.code === code);

    if (existing) {
        existing.quantity += 1;
    } else {
        cartItems.push({
            name,
            price,
            code,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartDisplay();
    showNotification('Agregado', `${name} agregado al carrito`, 'success');
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    saveCartToStorage();
    updateCartDisplay();
}

function changeQty(index, change) {
    if (!cartItems[index]) return;

    cartItems[index].quantity += change;

    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }

    saveCartToStorage();
    updateCartDisplay();
}

/* =========================
   UI CARRITO
========================= */

function updateCartDisplay() {

    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItems');

    const cartSubtotalEl = document.getElementById('cartSubtotal');
    const cartShippingEl = document.getElementById('cartShipping');
    const cartTotalEl = document.getElementById('cartTotal');

    const totalItems = cartItems.reduce((a, b) => a + b.quantity, 0);

    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems ? 'flex' : 'none';
    }

    if (cartItemsContainer) {

        if (!cartItems.length) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart text-center p-4">
                    <i class="fas fa-shopping-bag fa-2x mb-3"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
        } else {

            cartItemsContainer.innerHTML = cartItems.map((item, i) => `
                <div class="cart-item d-flex justify-content-between align-items-center mb-3">

                    <div>
                        <h6>${item.name}</h6>
                        <small><strong>Código:</strong> ${item.code}</small><br>
                        <small>$${item.price} c/u</small>
                    </div>

                    <div class="d-flex align-items-center gap-2">

                        <button onclick="changeQty(${i}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${i}, 1)">+</button>

                        <button onclick="removeFromCart(${i})">
                            <i class="fas fa-trash"></i>
                        </button>

                    </div>

                </div>
            `).join('');
        }
    }

    /* 🔥 CÁLCULOS */
    const subtotal = cartItems.reduce(
        (a, b) => a + (b.price * b.quantity),
        0
    );

    const shipping = subtotal > 0 ? 140 : 0;

    const total = subtotal + shipping;

    /* 🔥 UI */
    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartShippingEl) cartShippingEl.textContent = `$${shipping.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;
}





function toggleCartExpand() {
    document.getElementById('cartSidebar')
        .classList.toggle('expanded');
}

/* =========================
   STORAGE
========================= */

function toggleCart() {
    document.getElementById('cartSidebar')?.classList.toggle('active');
    document.getElementById('cartOverlay')?.classList.toggle('active');
}

function getCartStorageKey() {
    const vendorId =
        new URLSearchParams(window.location.search).get("vendor")
        || "mayra";

    return `mcLashesCart_${vendorId}`;
}

function saveCartToStorage() {
    localStorage.setItem(
        getCartStorageKey(),
        JSON.stringify(cartItems)
    );
}

function loadCartFromStorage() {
    const saved = localStorage.getItem(getCartStorageKey());

    cartItems = saved ? JSON.parse(saved) : [];
}

/* =========================
   WHATSAPP CHECKOUT (CORREGIDO)
========================= */
/* =========================
   WHATSAPP CHECKOUT
   + LIMPIAR CARRITO DESPUÉS DE ENVIAR
========================= */

function checkoutWhatsApp() {

    const v = window.VENDOR;
    if (!v) return;

    if (!cartItems.length) return;

    let msg = 'Hola! quiero hacer pedido:\n\n';

    cartItems.forEach(i => {
        msg += `• ${i.name}\n`;
        msg += `  Código: ${i.code}\n`;
        msg += `  Cantidad: ${i.quantity}\n`;
        msg += `  Subtotal: $${i.price * i.quantity}\n\n`;
    });

    /* SUBTOTAL */
    const subtotal = cartItems.reduce(
        (a, b) => a + (b.price * b.quantity),
        0
    );

    /* ENVÍO */
    const shipping = subtotal > 0 ? 140 : 0;

    /* TOTAL */
    const total = subtotal + shipping;

    msg += `Subtotal: $${subtotal}\n`;
    msg += `Envío: $${shipping}\n`;
    msg += `TOTAL: $${total}\n`;

    msg += `\n🎉 Recuerda: que puedes tener hasta un 30% de descuento si te afilias a argento.`;

    /* =========================
       ABRIR WHATSAPP
    ========================= */
    const phone = String(v.whatsapp).trim();

const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
window.open(url, "_blank");

    /* =========================
       LIMPIAR CARRITO DESPUÉS DE ENVIAR
    ========================= */

    cartItems = [];

    saveCartToStorage();   // borra localStorage del carrito
    updateCartDisplay();   // refresca UI
}


/* =========================
   NAVBAR
========================= */

function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (!navbar) return;

        navbar.style.boxShadow =
            window.scrollY > 50
                ? '0 4px 30px rgba(255,105,180,0.2)'
                : '0 2px 20px rgba(255,105,180,0.1)';
    });
}

/* =========================
   NOTIFICACIÓN
========================= */

function showNotification(title, message, type = 'info') {
    const div = document.createElement('div');

    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#ff69b4'
    };

    div.style = `
        position:fixed;
        top:100px;
        right:20px;
        background:${colors[type]};
        color:white;
        padding:15px;
        border-radius:10px;
        z-index:9999;
    `;

    div.innerHTML = `<strong>${title}</strong><br>${message}`;

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 3000);
}



function applyVendorData() {

    const v = window.VENDOR;
    if (!v) return;


    /* =========================
       FOTO DE LA VENDEDORA
    ========================= */

    const vendorPhoto = document.getElementById("vendor-photo");

    if (vendorPhoto) {
        vendorPhoto.src = v.photo || "imagenes/default.webp";
        vendorPhoto.alt = v.businessName;
    }
    /* =========================
       PAGE TITLE (SEO)
    ========================= */

    const title = document.getElementById("page-title");

    if (title) {
        title.textContent = `${v.businessName} | ${v.title || ""}`;
    }


    
    /* =========================
       TEXT BINDINGS
    ========================= */

    setText("[data-bind='businessName']", v.businessName);
    setText("[data-bind='address']", v.address);
    setText("[data-bind='phone']", v.phone);
    setText("[data-bind='owner']", v.owner);
    setText("[data-bind='deliveryZone']", v.deliveryZone);

    /* =========================
       WHATSAPP (TODOS LOS BOTONES)
    ========================= */

    document.querySelectorAll("[data-whatsapp]").forEach(el => {

        if (v.whatsapp) {
            el.href = `https://wa.me/${v.whatsapp}`;
            el.target = "_blank";
            el.rel = "noopener noreferrer";
        } else {
            el.style.display = "none";
        }

    });

    /* =========================
       WHATSAPP FLOAT BUTTON
    ========================= */

    document.querySelectorAll("[data-whatsapp-float]").forEach(el => {

        if (v.whatsapp) {
            el.href = `https://wa.me/${v.whatsapp}`;
            el.target = "_blank";
            el.rel = "noopener noreferrer";
        } else {
            el.style.display = "none";
        }

    });

    /* =========================
       PHONE CALL
    ========================= */

    document.querySelectorAll("[data-phone-link]").forEach(el => {

        if (v.phone) {
            el.href = `tel:${v.phone}`;
        } else {
            el.style.display = "none";
        }

    });

    /* =========================
       INSTAGRAM
    ========================= */

    document.querySelectorAll("[data-instagram]").forEach(el => {

        if (v.instagram) {
            el.href = v.instagram;
            el.target = "_blank";
            el.rel = "noopener noreferrer";
        } else {
            el.style.display = "none";
        }

    });

    /* =========================
       FACEBOOK
    ========================= */

    document.querySelectorAll("[data-facebook]").forEach(el => {

        if (v.facebook) {
            el.href = v.facebook;
            el.target = "_blank";
            el.rel = "noopener noreferrer";
        } else {
            el.style.display = "none";
        }

    });

    /* =========================
       TIKTOK
    ========================= */

    document.querySelectorAll("[data-tiktok]").forEach(el => {

        if (v.tiktok) {
            el.href = v.tiktok;
            el.target = "_blank";
            el.rel = "noopener noreferrer";
        } else {
            el.style.display = "none";
        }

    });

    /* =========================
       GOOGLE MAPS
    ========================= */

    const mapFrame = document.getElementById("map-frame");

    if (mapFrame && v.mapsEmbed) {
        mapFrame.src = v.mapsEmbed;
    }

    const mapsLink = document.getElementById("maps-link");

    if (mapsLink && v.mapsUrl) {
        mapsLink.href = v.mapsUrl;
        mapsLink.target = "_blank";
    }
}

/* =========================
   HELPER
========================= */

function setText(selector, value) {

    document.querySelectorAll(selector).forEach(el => {
        el.textContent = value || "";
    });

}
function openImage(src){

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");

    modal.style.display = "flex";
    modalImg.src = src;
}

document.getElementById("imageModal").onclick = function(){

    this.style.display = "none";

}













/* =========================================
   🧠 SISTEMA DE CARRITO MULTI-CLIENTE
   - Sin login
   - Sin backend
   - Cada cliente = carrito independiente
   - Cada vendedor = carrito independiente
========================================= */

/* =========================
   1. SESSION ID (CLIENTE ÚNICO)
========================= */

function getSessionId() {
    let id = sessionStorage.getItem("session_id");

    if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem("session_id", id);
    }

    return id;
}

/* =========================
   2. LLAVE ÚNICA DEL CARRITO
   (vendor + cliente)
========================= */

function getCartKey() {

    const vendor =
        new URLSearchParams(window.location.search)
            .get("vendor")
            ?.toLowerCase() || "default";

    const sessionId = getSessionId();

    return `cart_${vendor}_${sessionId}`;
}

/* =========================
   3. GUARDAR CARRITO
========================= */

function saveCartToStorage() {
    localStorage.setItem(
        getCartKey(),
        JSON.stringify(cartItems)
    );
}

/* =========================
   4. CARGAR CARRITO
========================= */

function loadCartFromStorage() {
    const saved = localStorage.getItem(getCartKey());
    cartItems = saved ? JSON.parse(saved) : [];
}

/* =========================
   5. LIMPIAR CARRITO
========================= */

function clearCart() {
    cartItems = [];
    localStorage.removeItem(getCartKey());
    updateCartDisplay();
}

/* =========================================
   FIN DEL SISTEMA
========================================= */


