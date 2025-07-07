
let loggedIn = false;

let registeredUsers = [
    { email: "lakshya@gmail.com", password: "123" },
    { email: "sandeep@gmail.com", password: "123" },
    { email: "sahil@gamil.com", password: "123" }
];

const products = [
    { id: 1, name: "Shoes", price: 29, image: "SHOES.jpeg", promoEligible: true },
    { id: 2, name: "Sunglass", price: 19, image: "sunglass.jpeg", promoEligible: false },
    { id: 3, name: "Watches", price: 49, image: "WATCHES.jpeg", promoEligible: true },
    { id: 4, name: "T-shirt", price: 68, image: "shirt.jpeg", promoEligible: true },
    { id: 5, name: "Belt", price: 20, image: "BELT.jpeg", promoEligible: false }
];
let cart = [];


document.getElementById("register-btn").addEventListener("click", () => {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    // Check if user already exists
    const exists = registeredUsers.some(user => user.email === email);
    if (exists) {
        alert("User already exists!");
        return;
    }

    registeredUsers.push({ email, password });
    alert("Registration successful! Please login.");
    
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
});
document.getElementById("show-register").addEventListener("click", () => {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("register-section").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", () => {
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
});

// Authentication - Simple Login
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

   const user = registeredUsers.find(u => u.email === email && u.password === password);
if (user) {
    alert('Login successful!');
    loggedIn = true;

    // Show sections
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('catalog-section').style.display = 'block';

    // ✅ Show the navbar links
    document.getElementById('nav-links').style.display = 'flex';

    loadProductCatalog();
}
 else {
        alert('Invalid email or password');
    }
});

// Load Product Catalog
function loadProductCatalog() {
    const catalog = document.getElementById('product-catalog');
    catalog.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button class="button add-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        catalog.appendChild(productDiv);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    alert(`${product.name} added to cart!`);

    // Show cart section immediately
    document.getElementById('catalog-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'block';
    updateCart();
}


// Update Cart
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        cartItems.appendChild(itemElement);
        total += item.price;
    });

    document.getElementById('total-price').innerText = `Total: $${total.toFixed(2)}`;
}

// Apply Promo Code
document.getElementById('apply-promo').addEventListener('click', () => {
    const promoCode = document.getElementById('promo-code').value;
    let discount = 0;

    if (promoCode === 'DISCOUNT10') {
        discount = cart.reduce((sum, item) => item.promoEligible ? sum + (item.price * 0.10) : sum, 0);
        alert('Promo code applied!');
    } else {
        alert('Invalid promo code.');
    }

    const totalPriceElement = document.getElementById('total-price');
    const currentTotal = parseFloat(totalPriceElement.innerText.replace('Total: $', ''));
    totalPriceElement.innerText = `Total: $${(currentTotal - discount).toFixed(2)}`;
});
document.getElementById('bu').addEventListener('click', () => {
    alert('order successfully');
})


document.getElementById('bu').addEventListener('click', () => {
    // Hide cart, show bill
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('bill-section').style.display = 'block';

    const billItems = document.getElementById('bill-items');
    const billTotal = document.getElementById('bill-total');
    billItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        billItems.appendChild(li);
        total += item.price;
    });

    billTotal.textContent = `Total Amount: $${total.toFixed(2)}`;
});


document.getElementById('done-button').addEventListener('click', () => {
    const mode = document.getElementById('payment-mode').value;
    alert(`Order placed successfully!\nPayment Mode: ${mode}`);

    // Clear cart after order
    cart = [];

    // Hide bill section, show catalog
    document.getElementById('bill-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('catalog-section').style.display = 'block';

    loadProductCatalog(); // Optional: reload catalog
});



document.getElementById('home-link').addEventListener('click', () => {
    // Hide all sections
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('bill-section').style.display = 'none';

    // Show product catalog
    document.getElementById('catalog-section').style.display = 'block';

    // Optionally re-load products
    loadProductCatalog();
});


document.getElementById('cart-link').addEventListener('click', (e) => {
    e.preventDefault();

    if (!loggedIn) {
        alert("Please login first.");
        return;
    }

    document.getElementById('catalog-section').style.display = 'none';
    document.getElementById('bill-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'block';
    updateCart();
});

document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();

    // Clear session
    loggedIn = false;
    cart = [];

    // Reset UI
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('catalog-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('bill-section').style.display = 'none';
    document.getElementById('nav-links').style.display = 'none';

    alert("You have been logged out.");
});
