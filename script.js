const products = [
  {
    id: 1,
    name: "Aurora Wireless Headphones",
    category: "electronics",
    price: 119,
    rating: 4.8,
    description: "Premium noise canceling with 30-hour battery life.",
    label: "Electronics"
  },
  {
    id: 2,
    name: "Canvas Smartwatch",
    category: "fitness",
    price: 89,
    rating: 4.5,
    description: "Track workouts and sleep with a sleek display.",
    label: "Fitness"
  },
  {
    id: 3,
    name: "Luma Lamp",
    category: "home",
    price: 45,
    rating: 4.7,
    description: "Adjustable desk lamp with warm light modes.",
    label: "Home"
  },
  {
    id: 4,
    name: "Voyage Travel Backpack",
    category: "fashion",
    price: 69,
    rating: 4.6,
    description: "Durable, water-resistant, and ready for every commute.",
    label: "Fashion"
  },
  {
    id: 5,
    name: "Nexa Smart Plug",
    category: "electronics",
    price: 25,
    rating: 4.4,
    description: "Voice-enabled control for lights and appliances.",
    label: "Electronics"
  },
  {
    id: 6,
    name: "Velvet Comfort Throw",
    category: "home",
    price: 39,
    rating: 4.3,
    description: "Soft, machine-washable blanket for lounging.",
    label: "Home"
  },
  {
    id: 7,
    name: "Pulse Runner Sneakers",
    category: "fashion",
    price: 129,
    rating: 4.9,
    description: "Lightweight performance shoes with responsive cushioning.",
    label: "Fashion"
  },
  {
    id: 8,
    name: "Zen Balance Yoga Mat",
    category: "fitness",
    price: 35,
    rating: 4.2,
    description: "Non-slip support for every stretch and flow.",
    label: "Fitness"
  },
  {
    id: 9,
    name: "Cedar Essence Diffuser",
    category: "home",
    price: 49,
    rating: 4.6,
    description: "Ultrasonic diffuser with subtle cedar scent.",
    label: "Home"
  },
  {
    id: 10,
    name: "Nova Portable Charger",
    category: "electronics",
    price: 59,
    rating: 4.7,
    description: "High-speed charging with 20,000mAh capacity.",
    label: "Electronics"
  },
  {
    id: 11,
    name: "AeroFit Resistance Bands",
    category: "fitness",
    price: 29,
    rating: 4.5,
    description: "Set of four bands for home strength training.",
    label: "Fitness"
  },
  {
    id: 12,
    name: "Luna Silk Scarf",
    category: "fashion",
    price: 55,
    rating: 4.4,
    description: "Soft silk blend scarf in a modern print.",
    label: "Fashion"
  },
  {
    id: 13,
    name: "Solstice Smart Air Purifier",
    category: "electronics",
    price: 1499,
    rating: 4.7,
    description: "HEPA filter purifier with auto air quality sensing.",
    label: "Electronics"
  },
  {
    id: 14,
    name: "Cove Knit Lounge Set",
    category: "fashion",
    price: 899,
    rating: 4.6,
    description: "Comfortable knit set with a relaxed silhouette.",
    label: "Fashion"
  },
  {
    id: 15,
    name: "Aurora Ceramic Cookware Set",
    category: "home",
    price: 1799,
    rating: 4.8,
    description: "Non-stick cookware set for everyday meal prep.",
    label: "Home"
  },
  {
    id: 16,
    name: "Pulse Fitness Tracker",
    category: "fitness",
    price: 1299,
    rating: 4.5,
    description: "Heart rate and sleep monitoring with guided workouts.",
    label: "Fitness"
  },
  {
    id: 17,
    name: "Pixel Touchscreen Speaker",
    category: "electronics",
    price: 799,
    rating: 4.4,
    description: "Smart speaker with voice assistant and ambient display.",
    label: "Electronics"
  },
  {
    id: 18,
    name: "Haven Scented Candle Set",
    category: "home",
    price: 549,
    rating: 4.3,
    description: "Hand-poured candles with floral and woodsy notes.",
    label: "Home"
  },
  {
    id: 19,
    name: "Stride Daypack",
    category: "fashion",
    price: 999,
    rating: 4.5,
    description: "Durable backpack with water-resistant finish.",
    label: "Fashion"
  },
  {
    id: 20,
    name: "Eclipse Wireless Charger",
    category: "electronics",
    price: 349,
    rating: 4.6,
    description: "Fast wireless charging with a minimalist design.",
    label: "Electronics"
  },
  {
    id: 21,
    name: "Harmony Yoga Block Set",
    category: "fitness",
    price: 249,
    rating: 4.2,
    description: "Grip-friendly foam blocks for deeper practice.",
    label: "Fitness"
  },
  {
    id: 22,
    name: "Oasis Bedding Bundle",
    category: "home",
    price: 1299,
    rating: 4.7,
    description: "Soft microfiber bed bundle with pillow and sheet set.",
    label: "Home"
  },
  {
    id: 23,
    name: "Nomad Travel Wallet",
    category: "fashion",
    price: 499,
    rating: 4.4,
    description: "Slim wallet with RFID protection and extra pockets.",
    label: "Fashion"
  },
  {
    id: 24,
    name: "Matrix Bluetooth Earbuds",
    category: "electronics",
    price: 1299,
    rating: 4.5,
    description: "Noise-isolating earbuds with long battery life.",
    label: "Electronics"
  }
];

const searchInput = document.querySelector('#searchInput');
const sortSelect = document.querySelector('#sortSelect');
const priceRange = document.querySelector('#priceRange');
const priceValue = document.querySelector('#priceValue');
const filterButtons = document.querySelectorAll('.filter-button');
const productGrid = document.querySelector('#productGrid');
const productTemplate = document.querySelector('#productCardTemplate');
const cartItemsContainer = document.querySelector('#cartItems');
const cartCount = document.querySelector('#cartCount');
const cartTotal = document.querySelector('#cartTotal');

let selectedCategory = 'all';
let currentSort = 'featured';
let maxPrice = Number(priceRange.value);
let searchTerm = '';
let cart = {};

function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(value);
}

function getRatingStars(rating) {
  return `${rating.toFixed(1)} ★`;
}

function getCartEntries() {
  return Object.entries(cart).map(([id, quantity]) => {
    const product = products.find(item => item.id === Number(id));
    return { ...product, quantity };
  });
}

function renderCart() {
  const entries = getCartEntries();
  const totalItems = entries.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = entries.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'} selected`;
  cartTotal.textContent = formatPrice(totalAmount);

  if (entries.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-state">Your cart is empty. Add products to see the total.</p>';
    return;
  }

  cartItemsContainer.innerHTML = entries.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <span>${item.quantity} × ${formatPrice(item.price)}</span>
      </div>
      <div>
        <span>${formatPrice(item.price * item.quantity)}</span>
      </div>
    </div>
  `).join('');
}

function addToCart(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  renderCart();
}

function renderProducts() {
  const filtered = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price <= maxPrice;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      if (currentSort === 'price-asc') return a.price - b.price;
      if (currentSort === 'price-desc') return b.price - a.price;
      if (currentSort === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });

  productGrid.innerHTML = '';

  if (filtered.length === 0) {
    productGrid.innerHTML = '<p class="empty-state">No products match your filters. Try adjusting the search or price range.</p>';
    return;
  }

  filtered.forEach(product => {
    const card = productTemplate.content.cloneNode(true);
    card.querySelector('.product-image').textContent = product.name.split(' ')[0];
    card.querySelector('.product-category').textContent = product.label;
    card.querySelector('.product-rating').textContent = getRatingStars(product.rating);
    card.querySelector('.product-name').textContent = product.name;
    card.querySelector('.product-description').textContent = product.description;
    card.querySelector('.product-price').textContent = formatPrice(product.price);
    const button = card.querySelector('.buy-button');
    button.addEventListener('click', () => addToCart(product.id));
    productGrid.appendChild(card);
  });
}

function updateCategory(category) {
  selectedCategory = category;
  filterButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.category === category);
  });
  renderProducts();
}

searchInput.addEventListener('input', event => {
  searchTerm = event.target.value.trim();
  renderProducts();
});

sortSelect.addEventListener('change', event => {
  currentSort = event.target.value;
  renderProducts();
});

priceRange.addEventListener('input', event => {
  maxPrice = Number(event.target.value);
  priceValue.textContent = `₹${maxPrice}`;
  renderProducts();
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => updateCategory(button.dataset.category));
});

renderProducts();
renderCart();
