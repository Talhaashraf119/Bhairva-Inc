// === PRODUCT DATA ===
const products = [
  { name: "21st Century Vitamin C 500 250 Tabs", price: 9.00, category: "Health & Household", img: "images/21cen.jpg" },
  { name: "6 Years Korean Red Ginseng 365 Stick", price: 6.00, category: "Health & Household", img: "images/6year.jpg" },
  { name: "ACR RapidDitch Bag", price: 25.00, category: "Marine Supplies", img: "images/ACR.jpg" },
  { name: "Argentyn 23 Professional Bio-Active Silver Hydrosol", price: 9.00, category: "Health & Household", img: "images/Argent.jpg" },
  { name: "Attwood Emergency Telescoping", price: 21.00, category: "Marine Supplies", img: "images/Attwood.jpg" },
  { name: "Aulief Topical Pain Relief Cream by China-Gel", price: 17.00, category: "Health & Household", img: "images/Aulief.jpg" },
  { name: "Blue Sea Systems 8214 Black 60 Label Set", price: 12.00, category: "Marine Supplies", img: "images/BlueSea.jpg" },
  { name: "Burt’s Bees Shimmer Lip Tint Set", price: 19.00, category: "Beauty Products", img: "images/Burtbees.jpg" },
  { name: "Burt’s Bees Very Volumizing Pomegranate Shampoo", price: 29.00, category: "Beauty Products", img: "images/Burt.jpg" },
  { name: "CANMAKE Tokyo Mermaid Skin Gel Sunscreen", price: 30.00, category: "Beauty Products", img: "images/Canmake.jpg" },
  { name: "Carmex Comfort Care Lip Balm Stick", price: 13.00, category: "Beauty Products", img: "images/canmax-comfort.webp" },
  { name: "COVERGIRL & Olay Simply Ageless Instant", price: 13.00, category: "Beauty Products", img: "images/coverage.jpg" },
  { name: "COVERGIRL Advanced Radiance Liquid Makeup", price: 9.00, category: "Beauty Products", img: "images/coverage-p.jpg" },
  { name: "Crystal Light Citrus On-The-Go Powdered Drink", price: 18.00, category: "Other Products", img: "images/crystallight.jpg" },
  { name: "Downy Ultra Laundry Fabric Softener Liquid", price: 48.00, category: "Health & Household", img: "images/downry.jpg" },
  { name: "Dr. Bronner’s – All-One Toothpaste", price: 22.00, category: "Health & Household", img: "images/dr.jpg" },
  { name: "Natural Path Silver Wings Colloidal Silver Liquid", price: 25.00, category: "Health & Household", img: "images/natural.jpg" },
  { name: "Leatherique Leather Rejuvenator/Prestine Clean Pair 8 Oz", price: 17.00, category: "Health & Household", img: "images/leat.jpg" },
  { name: "Durvet High Level Vitamin B Complex Injectable", price: 17.00, category: "Health & Household", img: "images/durvat.jpg" },
  { name: "Purell Hand Sanitizer with Aloe, 2 Fl Oz (Pack of 6)", price: 50.00, category: "Health & Household", img: "images/natural.jpg" },
  { name: "Prilosec OTC Acid Reducer, Delayed-Release Tablets, 2 Pack-84 Count", price: 25.00, category: "Health & Household", img: "images/pedag.jpg" },
  { name: "Nature Made CoQ10 Naturally Orange 200 mg", price: 47.00, category: "Health & Household", img: "images/natural-made.jpg" },
  { name: "21st Century Vitamin C 500 250 Tabs", price: 9.00, category: "Health & Household", img: "images/21-cen.jpg" }
];


// === FUNCTION TO DISPLAY PRODUCTS ===
function displayProducts(category = null) {
  const container = document.querySelector('.products-container');
  container.innerHTML = ''; // Clear old content

const filtered = category
  ? products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()))
  : products;


  filtered.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="product-img">
      <p class="category">${p.category}</p>
      <h3 class="product-name">${p.name}</h3>
      <p class="price">$${p.price.toFixed(2)}</p>
      <button class="add-btn">Add To Cart</button>
    `;
    container.appendChild(card);
  });

  attachProductEvents();
}

// === HANDLE PRODUCT INTERACTIONS ===
function attachProductEvents() {
  const productCards = document.querySelectorAll('.product-card');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.querySelector('.cart-total');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartDisplay();

  document.getElementById('cartIcon').addEventListener('click', () => {
    window.location.href = 'addtocart.html';
  });

  productCards.forEach(card => {
    const img = card.querySelector('.product-img').src;
    const name = card.querySelector('.product-name').textContent;
    const price = card.querySelector('.price').textContent;

    // Redirect to detail page
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-btn')) return;
      const product = { img, name, price };
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = 'detailpage.html';
    });

    // Add to cart
    const addBtn = card.querySelector('.add-btn');
    addBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart({ img, name, price });
    });
  });

  function addToCart(product) {
    let existing = cart.find(item => item.name === product.name);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }

  function updateCartDisplay() {
    let totalItems = 0, totalPrice = 0;
    cart.forEach(item => {
      const priceNum = parseFloat(item.price.replace('$', ''));
      const qty = item.quantity || 1;
      totalItems += qty;
      totalPrice += priceNum * qty;
    });
    cartCount.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  }
}

// === FILTER BY CATEGORY IN URL ===
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  displayProducts(category);
});
// === Show Category Title & Hide Shop Title ===
const productsPerPage = 8;
let currentPage = 1;
let filteredProducts = [];
let currentCategory = null;

function displayProducts(category = null, page = 1) {
  const container = document.querySelector('.products-container');
  currentCategory = category; // store current category globally
  container.classList.add('fade-out'); // start fade-out

  setTimeout(() => {
    container.innerHTML = ''; // clear old content

    // Filter products
    filteredProducts = category
      ? products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()))
      : products;

    // Pagination
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = filteredProducts.slice(start, end);

    // Render products
    productsToShow.forEach(p => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}" class="product-img">
        <p class="category">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="price">$${p.price.toFixed(2)}</p>
        <button class="add-btn">Add To Cart</button>
      `;
      container.appendChild(card);
    });

    attachProductEvents(); // attach add-to-cart & click events

    // Update pagination info
    document.getElementById('pageInfo').textContent = `Page ${page} of ${totalPages}`;
    document.getElementById('prevBtn').disabled = page === 1;
    document.getElementById('nextBtn').disabled = page === totalPages;

    container.classList.remove('fade-out'); // fade-in

  }, 300); // delay 0.3s for smooth transition
}
document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts(currentCategory, currentPage); // pass current category
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts(currentCategory, currentPage); // pass current category
  }
});
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  displayProducts(category, currentPage);
});
