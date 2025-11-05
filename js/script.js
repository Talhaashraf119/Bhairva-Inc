// ===============================
// GLOBAL CART & PRODUCT HANDLING
// ===============================

// Animate progress bars when #quality-section is in view (if exists)
const qualitySection = document.querySelector("#quality-section");
if (qualitySection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = document.querySelectorAll(".fill");
        fills.forEach(fill => {
          fill.style.width = fill.getAttribute("data-percentage") + "%";
        });
      }
    });
  }, { threshold: 0.4 });

  observer.observe(qualitySection);
}

// === GLOBAL ELEMENTS ===
const productCards = document.querySelectorAll(".product-card");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.querySelector(".cart-total");
const cartIcon = document.getElementById("cartIcon");

// === LOAD EXISTING CART ===
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartDisplay();

// === REDIRECT CART ICON TO CART PAGE ===
if (cartIcon) {
  cartIcon.addEventListener("click", () => {
    window.location.href = "addtocart.html";
  });
}

// === PRODUCT CARD LOGIC ===
if (productCards.length > 0) {
  productCards.forEach(card => {
    const img = card.querySelector(".product-img").src;
    const name = card.querySelector(".product-name").textContent;
    const price = card.querySelector(".price").textContent;

    // Click card → go to detail page
    card.addEventListener("click", e => {
      if (e.target.classList.contains("add-btn")) return;
      const product = { img, name, price };
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "detailpage.html";
    });

    // Click Add To Cart button
    const addBtn = card.querySelector(".add-btn");
    if (addBtn) {
      addBtn.addEventListener("click", e => {
        e.stopPropagation();
        addToCart({ img, name, price });
      });
    }
  });
}

// === ADD TO CART FUNCTION ===
function addToCart(product) {
  let existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartDisplay();
}

// === SAVE CART ===
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// === UPDATE NAVBAR CART ICON & TOTAL ===
function updateCartDisplay() {
  if (!cartCount || !cartTotal) return;

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    const priceNum = parseFloat(item.price.replace("$", ""));
    const qty = item.quantity || 1;
    totalItems += qty;
    totalPrice += priceNum * qty;
  });

  cartCount.textContent = totalItems;
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}
// === FILTER PRODUCTS BASED ON CATEGORY IN URL ===

  

