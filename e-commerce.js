/**
 * LUXE E-commerce Engine v2.0
 * Professional Class-based Architecture
 */

class Store {
    constructor() {
        // State Management
        this.products = [
            { id: 1, name: "Pro Headphones", price: 299, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", category: "Audio" },
            { id: 2, name: "Smart Watch", price: 199, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", category: "Wearables" },
            { id: 3, name: "Leather Bag", price: 150, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", category: "Accessories" },
            { id: 4, name: "Running Shoes", price: 120, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", category: "Footwear" },
            { id: 5, name: "Minimal Camera", price: 899, img: "https://images.unsplash.com/photo-1526170315870-ef68a6f3dd39?w=400", category: "Electronics" },
            { id: 6, name: "Bluetooth Speaker", price: 80, img: "https://images.unsplash.com/photo-1608156639585-34054e815962?w=400", category: "Audio" },
            { id: 7, name: "Designer Glasses", price: 250, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", category: "Accessories" },
            { id: 8, name: "Phone Case", price: 45, img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400", category: "Mobile" },
            { id: 9, name: "Wireless Mouse", price: 60, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400", category: "Computing" },
            { id: 10, name: "Gaming Keyboard", price: 130, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400", category: "Computing" }
        ];

        // Load cart from LocalStorage
        this.cart = JSON.parse(localStorage.getItem('luxe_cart')) || [];
        this.init();
    }

    init() {
        this.renderProducts();
        this.updateCartBadge();
        this.setupEventListeners();
        console.log("Luxe Store Initialized...");
    }

    // 1. Render Products to UI
    renderProducts() {
        const grid = document.getElementById('product-list');
        if (!grid) return;

        grid.innerHTML = this.products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="badge-container">
                    ${product.price > 500 ? '<span class="badge">Premium</span>' : ''}
                </div>
                <img src="${product.img}" alt="${product.name}" loading="lazy">
                <div class="card-content">
                    <small>${product.category}</small>
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price}</p>
                    <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    // 2. Cart Management
    addToCart(name, price) {
        const item = { name, price, date: new Date().toISOString() };
        this.cart.push(item);
        this.saveCart();
        this.updateCartBadge();
        this.showNotification(`${name} added to your collection!`);
    }

    saveCart() {
        localStorage.setItem('luxe_cart', JSON.stringify(this.cart));
    }

    updateCartBadge() {
        const badge = document.getElementById('cart-count');
        if (badge) badge.innerText = this.cart.length;
    }

    // 3. UI Feedbacks
    showNotification(msg) {
        const toast = document.getElementById('toast');
        toast.innerText = msg;
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 2500);
    }

    // 4. Dark Mode Logic
    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        document.getElementById('theme-toggle').innerText = newTheme === 'dark' ? "☀️" : "🌙";
        localStorage.setItem('luxe_theme', newTheme);
    }

    // 5. Event Listeners (Professional Way: Delegation)
    setupEventListeners() {
        // Theme Toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Add to Cart (Delegated)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const { name, price } = e.target.dataset;
                this.addToCart(name, price);
            }
        });

        // Check for saved theme
        const savedTheme = localStorage.getItem('luxe_theme');
        if (savedTheme === 'dark') this.toggleTheme();
    }
}

// Start the App
const LuxeStore = new Store();