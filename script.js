// Product Categories and Products
const categories = [
    'Smartphones', 'Laptops', 'Accessories', 'Audio', 'Wearables'
];

const products = [
    // Smartphones
    {
        id: 1,
        name: 'Flagship Smartphone',
        price: 999.99,
        category: 'Smartphones',
        image: './image/smartphone.jpeg'
    },
    {
        id: 2,
        name: 'Mid-range Smartphone',
        price: 499.99,
        category: 'Smartphones',
        image: './image/smartphone2.jpeg'
    },
    // Laptops
    {
        id: 3,
        name: 'Ultra-light Laptop',
        price: 1299.99,
        category: 'Laptops',
        image: './image/laptop.jpeg'
    },
    {
        id: 4,
        name: 'Gaming Laptop',
        price: 1799.99,
        category: 'Laptops',
        image: './image/laptop2.jpeg'
    },
    // Accessories
    {
        id: 5,
        name: 'Wireless Charger',
        price: 49.99,
        category: 'Accessories',
        image: './image/charger.jpeg'
    },
    {
        id: 6,
        name: 'Phone Case',
        price: 29.99,
        category: 'Accessories',
        image: './image/case.jpeg'
    },
    // Audio
    {
        id: 7,
        name: 'Noise-Cancelling Headphones',
        price: 299.99,
        category: 'Audio',
        image: './image/headphone.jpeg'
    },
    {
        id: 8,
        name: 'Bluetooth Speaker',
        price: 149.99,
        category: 'Audio',
        image: './image/speaker.jpeg'
    },
    // Wearables
    {
        id: 9,
        name: 'Smartwatch Pro',
        price: 249.99,
        category: 'Wearables',
        image: './image/smartwatch.jpeg'
    },
    {
        id: 10,
        name: 'Fitness Tracker',
        price: 99.99,
        category: 'Wearables',
        image: './image/tracker.jpeg'
    }
];

let cart = [];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts();
    setupEventListeners();
});

// Render Categories
function renderCategories() {
    const categoryDropdown = document.getElementById('category-dropdown');
    categoryDropdown.innerHTML = categories.map(category => `
        <a href="#" onclick="filterProducts('${category}')">${category}</a>
    `).join('');
}

// Render Products
function renderProducts(productsToRender = products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart Modal Toggle
    document.querySelector('.cart-icon').addEventListener('click', openCartModal);
    document.querySelector('.close-cart').addEventListener('click', closeCartModal);

    // Checkout Button
    document.querySelector('.checkout-btn').addEventListener('click', processCheckout);
}

// Filter Products by Category
function filterProducts(category) {
    const filteredProducts = products.filter(p => p.category === category);
    renderProducts(filteredProducts);
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCartCount();
    updateCartModal();
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update Cart Modal
function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-actions">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Update Quantity
function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = Math.max(1, cartItem.quantity + change);
        
        if (cartItem.quantity === 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartModal();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartModal();
}

// Process Checkout
function processCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // In a real application, this would integrate with a payment gateway
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Simulated checkout process
    alert(`Checkout Complete!\n\nTotal: $${total.toFixed(2)}\n\nThank you for your purchase!`);
    
    // Clear the cart after checkout
    cart = [];
    updateCartCount();
    updateCartModal();
    closeCartModal();
}

// Open Cart Modal
function openCartModal() {
    const cartModal = document.getElementById('cart-modal');
    updateCartModal();
    cartModal.style.display = 'flex';
}

// Close Cart Modal
function closeCartModal() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
}



// Hot Deals
const deals = [
    {
        id: 11,
        name: 'Budget Smartphone',
        originalPrice: 299.99,
        price: 199.99,
        discountPercentage: 33,
        category: 'Smartphones',
        image: './image/smartphone2.jpeg'
    },
    {
        id: 12,
        name: 'Wireless Earbuds',
        originalPrice: 149.99,
        price: 89.99,
        discountPercentage: 40,
        category: 'Audio',
        image: './image/earbud.jpeg'
    },
    {
        id: 13,
        name: 'Portable Power Bank',
        originalPrice: 79.99,
        price: 49.99,
        discountPercentage: 38,
        category: 'Accessories',
        image: './image/powerbank.jpeg'
    }
];

// Render Deals
function renderDeals() {
    const dealsGrid = document.getElementById('deals-grid');
    dealsGrid.innerHTML = deals.map(deal => `
        <div class="deal-card" data-category="${deal.category}">
            <span class="discount-badge">${deal.discountPercentage}% OFF</span>
            <img src="${deal.image}" alt="${deal.name}">
            <div class="deal-card-content">
                <h3>${deal.name}</h3>
                <div class="deal-pricing">
                    <span class="original-price">$${deal.originalPrice.toFixed(2)}</span>
                    <span class="discounted-price">$${deal.price.toFixed(2)}</span>
                </div>
                <button onclick="addToCart(${deal.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Add deals to the main products array so they can be added to cart
    deals.forEach(deal => {
        if (!products.find(p => p.id === deal.id)) {
            products.push({
                id: deal.id,
                name: deal.name,
                price: deal.price,
                category: deal.category,
                image: deal.image
            });
        }
    });
}

// Update DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts();
    renderDeals();  // New line to render deals
    setupEventListeners();
});





// Add product details and reviews to the existing products
const productsWithDetails = products.map(product => ({
    ...product,
    description: `Experience the cutting-edge technology of the ${product.name}. Designed to meet all your tech needs with superior performance and sleek design.`,
    specifications: [
        'High-performance processor',
        'Advanced battery technology',
        'Sleek and modern design',
        'Multi-functional capabilities'
    ],
    rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1-5
    reviews: [
        {
            user: 'TechEnthusiast87',
            rating: 5,
            text: 'Absolutely amazing product! Exceeded all my expectations.'
        },
        {
            user: 'GadgetGuru',
            rating: 4,
            text: 'Great value for money. Performs really well in everyday use.'
        }
    ]
}));

// Open Product Details Modal
function openProductDetailsModal(productId) {
    const product = productsWithDetails.find(p => p.id === productId);
    if (!product) return;

    const modalContainer = document.getElementById('product-details-container');
    
    // Generate star rating
    const renderStars = (rating) => {
        return Array(5).fill().map((_, index) => 
            `<i class="fas fa-star ${index < rating ? 'text-yellow-500' : 'text-gray-300'}"></i>`
        ).join('');
    };

    // Generate reviews HTML
    const renderReviews = (reviews) => {
        return reviews.map(review => `
            <div class="review">
                <div class="review-header">
                    <span class="review-user">${review.user}</span>
                    <div class="review-rating">
                        ${renderStars(review.rating)}
                    </div>
                </div>
                <p class="review-text">${review.text}</p>
            </div>
        `).join('');
    };

    // Generate specifications HTML
    const renderSpecifications = (specs) => {
        return specs.map(spec => `<li>${spec}</li>`).join('');
    };

    modalContainer.innerHTML = `
        <div class="product-details">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="product-rating">
                    ${renderStars(product.rating)}
                    <span class="ml-2">(${product.reviews.length} reviews)</span>
                </div>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                
                <h3 class="mt-4 mb-2">Key Specifications:</h3>
                <ul class="product-specifications">
                    ${renderSpecifications(product.specifications)}
                </ul>
                
                <div class="product-actions">
                    <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="wishlist-btn">
                        <i class="fas fa-heart"></i> Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
        <div class="reviews-section">
            <h3>Customer Reviews</h3>
            <div class="reviews-container">
                ${renderReviews(product.reviews)}
            </div>
            <button class="write-review-btn">Write a Review</button>
        </div>
    `;

    // Show the modal
    const modal = document.getElementById('product-details-modal');
    modal.style.display = 'block';

    // Close modal functionality
    const closeModal = document.querySelector('.close-modal');
    closeModal.onclick = () => {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Modify the renderProducts function to add click event for product details
function renderProducts(productsToRender = products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" onclick="openProductDetailsModal(${product.id})">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Newsletter Subscription
function setupNewsletterSubscription() {
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (emailInput.value.trim() === '') {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate newsletter subscription
        alert(`Thank you for subscribing with ${emailInput.value}!`);
        emailInput.value = ''; // Clear the input
    });
}

// Update DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts();
    renderDeals();
    setupEventListeners();
    setupNewsletterSubscription(); // New line to set up newsletter subscription
});

// Add wishlist functionality
const wishlist = [];

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    // Check if product is already in wishlist
    if (wishlist.some(item => item.id === productId)) {
        alert('This product is already in your wishlist!');
        return;
    }

    wishlist.push(product);
    alert(`${product.name} added to wishlist!`);
    updateWishlistCount();
}

function updateWishlistCount() {
    // You can add a wishlist count display similar to cart count if desired
    console.log(`Wishlist now has ${wishlist.length} items`);
}


