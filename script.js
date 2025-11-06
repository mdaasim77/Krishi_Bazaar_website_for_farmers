document.querySelector(".login_form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("password").value;

  if (email === "khanaasim9910@gmail.com" && password === "Aasim62@") {
    alert("Login Successful!");
    window.location.href = "home.html";
  } else {
    alert("Invalid email or password!");
  }
});

// signup code

document
  .querySelector(".register_form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("number").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password2").value;

    // Simple validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("Please fill all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Registration Successful!");
    window.location.href = "home.html";
  });

// buy page code

// Handle quantity +/-
document.querySelectorAll(".buy_card").forEach((card, index) => {
  const plusBtn = card.querySelectorAll(".count_btn")[1];
  const minusBtn = card.querySelectorAll(".count_btn")[0];
  const countSpan = card.querySelector(".cow_count");

  plusBtn.addEventListener("click", () => {
    let count = parseInt(countSpan.textContent);
    countSpan.textContent = count + 1;
  });

  minusBtn.addEventListener("click", () => {
    let count = parseInt(countSpan.textContent);
    if (count > 1) countSpan.textContent = count - 1;
  });

  // Handle Add to Cart
  const addToCartBtn = card.querySelector(".add_tocart_btn");
  addToCartBtn.addEventListener("click", () => {
    const animalName = card.querySelector(".cow_name").textContent;
    const imgSrc = card.querySelector("img").getAttribute("src");
    const quantity = parseInt(countSpan.textContent);

    // Create cart item
    const item = {
      name: animalName,
      image: imgSrc,
      quantity: quantity,
    };

    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if already in cart
    const existingIndex = cart.findIndex((i) => i.name === item.name);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push(item);
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${item.name} added to cart!`);
  });
});

// cart page code

if (window.location.pathname.includes("cart.html")) {
  const cartContainer = document.querySelector(".cart");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;

  cartItems.forEach((item) => {
    total += item.quantity;

    const itemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="details">
                    <h3>${item.name}</h3>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <button class="remove">Remove</button>
            </div>
        `;
    cartContainer.insertAdjacentHTML("beforeend", itemHTML);
  });

  cartContainer.insertAdjacentHTML(
    "beforeend",
    `
        <div class="cart-total">
            <h3>Total Items: ${total}</h3>
            <button class="checkout">Proceed to Checkout</button>
        </div>
    `
  );

  // Remove button logic
  document.querySelectorAll(".remove").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.location.reload();
    });
  });
}
