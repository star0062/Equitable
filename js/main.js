// Données des produits
const products = [
    {
        id: 1,
        name: "Café d'Éthiopie",
        description: "Ce café d'exception provient des hauts plateaux d'Éthiopie. Ses notes fruitées et florales en font un café rafraîchissant et complexe.",
        origin: "ethiopie",
        roast: "light",
        flavor: "fruity floral",
        details: {
            origin: "Éthiopie",
            roast: "Légère",
            notes: "Agrumes, jasmin, bergamote"
        },
        price: "14,90 €",
        image: "images/cafe1.jpg"
    },
    {
        id: 2,
        name: "Café de Colombie",
        description: "Notre café colombien est cultivé dans la région montagneuse de Huila. Il offre un équilibre parfait entre douceur et caractère.",
        origin: "colombie",
        roast: "medium",
        flavor: "nutty chocolate",
        details: {
            origin: "Colombie",
            roast: "Moyenne",
            notes: "Caramel, noisette, vanille"
        },
        price: "13,50 €",
        image: "images/cafe2.jpg"
    },
    {
        id: 3,
        name: "Café du Pérou",
        description: "Cultivé dans la vallée sacrée des Incas, ce café péruvien se distingue par ses notes chocolatées et sa richesse en bouche.",
        origin: "perou",
        roast: "dark",
        flavor: "chocolate spicy",
        details: {
            origin: "Pérou",
            roast: "Foncée",
            notes: "Chocolat noir, épices, caramel"
        },
        price: "12,90 €",
        image: "images/cafe3.jpg"
    },
    {
        id: 4,
        name: "Café du Guatemala",
        description: "Ce café d'Antigua au Guatemala est cultivé en altitude, ce qui lui confère une complexité aromatique remarquable.",
        origin: "guatemala",
        roast: "medium",
        flavor: "nutty chocolate",
        details: {
            origin: "Guatemala",
            roast: "Moyenne",
            notes: "Chocolat au lait, amande, miel"
        },
        price: "14,50 €",
        image: "images/cafe4.jpg"
    },
    {
        id: 5,
        name: "Café du Honduras",
        description: "Notre café hondurien provient de la région de Marcala. Il surprend par sa douceur et ses notes fruitées délicates.",
        origin: "honduras",
        roast: "light",
        flavor: "fruity floral",
        details: {
            origin: "Honduras",
            roast: "Légère",
            notes: "Pomme, miel, fleur d'oranger"
        },
        price: "13,90 €",
        image: "images/cafe5.jpg"
    },
    {
        id: 6,
        name: "Café Yirgacheffe",
        description: "Ce café d'exception provient de la région de Yirgacheffe en Éthiopie, réputée pour produire les meilleurs cafés du monde.",
        origin: "ethiopie",
        roast: "medium",
        flavor: "fruity floral",
        details: {
            origin: "Éthiopie (Yirgacheffe)",
            roast: "Moyenne",
            notes: "Agrumes, thé, fleurs"
        },
        price: "15,90 €",
        image: "images/cafe6.jpg"
    }
];

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser l'affichage des produits
    displayProducts();
    
    // Système de filtrage pour la page "Nos cafés"
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterProducts);
    }

    // Gestion du panier
    const cartIcon = document.getElementById('cart-icon');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');

    if (cartIcon && cartOverlay && closeCartBtn) {
        cartIcon.addEventListener('click', () => {
            cartOverlay.style.display = 'flex';
        });

        closeCartBtn.addEventListener('click', () => {
            cartOverlay.style.display = 'none';
        });

        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) {
                cartOverlay.style.display = 'none';
            }
        });
    }

    // Gestion du popup produit
    const popupOverlay = document.getElementById('product-popup-overlay');
    const closePopupBtn = document.getElementById('close-popup');

    if (closePopupBtn && popupOverlay) {
        closePopupBtn.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
            setTimeout(() => {
                popupOverlay.style.display = 'none';
            }, 300); // Correspond à la durée de l'animation
        });

        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('active');
                setTimeout(() => {
                    popupOverlay.style.display = 'none';
                }, 300);
            }
        });
    }

    // Animation douce pour les liens d'ancrage
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Menu mobile toggle
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            // Empêcher le défilement du body quand le menu est ouvert
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Fermer le menu quand on clique sur un lien
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Fermer le menu mobile quand on redimensionne l'écran
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Gestion du menu burger
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('nav').classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
});

/**
 * Affiche les produits dans la grille
 */
function displayProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-origin', product.origin);
        productCard.setAttribute('data-roast', product.roast);
        productCard.setAttribute('data-flavor', product.flavor);
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
        `;
        
        productCard.addEventListener('click', () => showProductDetails(product));
        container.appendChild(productCard);
    });
}

/**
 * Affiche les détails d'un produit dans le popup
 * @param {Object} product - Le produit à afficher
 */
function showProductDetails(product) {
    const popupContent = document.getElementById('popup-content');
    const popupOverlay = document.getElementById('product-popup-overlay');
    
    if (!popupContent || !popupOverlay) return;

    popupContent.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-details"><strong>Origine:</strong> ${product.details.origin}</p>
        <p class="product-details"><strong>Torréfaction:</strong> ${product.details.roast}</p>
        <p class="product-details"><strong>Notes:</strong> ${product.details.notes}</p>
        <p class="product-price">${product.price}</p>
        <button class="btn-secondary add-to-cart">Ajouter au panier</button>
    `;
    
    // Ajouter l'écouteur d'événement pour le bouton d'ajout au panier
    const addToCartBtn = popupContent.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêcher la propagation du clic
            addToCart(e, product);
        });
    }
    
    // Afficher le popup avec animation
    popupOverlay.style.display = 'flex';
    // Forcer un reflow pour que l'animation se déclenche
    void popupOverlay.offsetWidth;
    popupOverlay.classList.add('active');
}

/**
 * Ajoute un produit au panier
 * @param {Event} e - L'événement de clic
 * @param {Object} product - Le produit à ajouter
 */
function addToCart(e, product) {
    const button = e.target;
    
    // Simuler l'ajout au panier
    console.log(`Produit ajouté au panier: ${product.name} - ${product.price}`);
    
    // Changer temporairement le texte du bouton pour confirmer l'ajout
    const originalText = button.textContent;
    button.textContent = 'Ajouté !';
    button.disabled = true;
    
    // Rétablir le texte original après 2 secondes
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

/**
 * Filtre les produits selon les critères sélectionnés
 */
function filterProducts() {
    const originFilter = document.getElementById('origin').value;
    const roastFilter = document.getElementById('roast').value;
    const flavorFilter = document.getElementById('flavor').value;
    
    const filteredProducts = products.filter(product => {
        if (originFilter !== 'all' && product.origin !== originFilter) return false;
        if (roastFilter !== 'all' && product.roast !== roastFilter) return false;
        if (flavorFilter !== 'all' && !product.flavor.includes(flavorFilter)) return false;
        return true;
    });
    
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        const message = document.createElement('p');
        message.id = 'no-results-message';
        message.className = 'no-results';
        message.textContent = 'Aucun produit ne correspond à vos critères de recherche.';
        container.appendChild(message);
    } else {
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-origin', product.origin);
            productCard.setAttribute('data-roast', product.roast);
            productCard.setAttribute('data-flavor', product.flavor);
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
            `;
            
            productCard.addEventListener('click', () => showProductDetails(product));
            container.appendChild(productCard);
        });
    }
}
