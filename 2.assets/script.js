// const images = ["/Images/beautiful-woman-dress-isolated-white-background.jpg", "/Images/WhatsApp Image 2026-01-31 at 9.19.25 PM.jpeg"];
// let index = 0;

// setInterval(() => {
//     const image = document.getElementById("hero-image");

//     index = (index + 1) % images.length;
//     image.src = images[index];
// }, 2100);



// const images = [
// "/Images/beautiful-woman-dress-isolated-white-background.jpg",
// "/Images/WhatsApp Image 2026-01-31 at 9.19.25 PM.jpeg"
// ];

// // Preload
// images.forEach(src => {
//     const img = new Image();
//     img.src = src;
// });

// let index = 0;
// const image = document.getElementById("hero-image");

// setInterval(() => {
//     index = (index + 1) % images.length;
//     image.src = images[index];
// }, 3000);

// Image Change Code
const images = [
    "Images/herogirl.jpg",
    "Images/heroboy.jpeg"
];

let index = 0;
const image = document.getElementById("hero-image");

if (image) {

    function changeImage() {
        index = (index + 1) % images.length;
        image.src = images[index];
    }

    setInterval(changeImage, 3000);
}



// SEARCH ICON 


// const searchIcon = document.getElementById("searchIcon");
// const searchBox = document.getElementById("searchBox");
// const searchInput = document.getElementById("searchInput");

// searchIcon.addEventListener("click", () => {
//     searchBox.style.display =
//         searchBox.style.display === "block" ? "none" : "block";
// });
const searchIcon = document.getElementById("searchIcon");
const searchBox = document.getElementById("searchBox");

if (searchIcon && searchBox) {
    searchIcon.addEventListener("click", () => {

        if (searchBox.style.display === "block") {
            searchBox.style.display = "none";
        } else {
            searchBox.style.display = "block";
        }

    });
}



// SEARCH ONLY WHEN ENTER PRESS
searchInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        let filter = searchInput.value.toLowerCase().trim();
        let products = document.querySelectorAll(".product-card");
        let found = false;

        products.forEach(product => {
            let title = product.querySelector(".card-title").innerText.toLowerCase();

            if (title.includes(filter)) {
                product.parentElement.style.display = "block";
                found = true;
            } else {
                product.parentElement.style.display = "none";
            }
        });

        if (!found && filter !== "") {
            alert("Search Not Found");
        }

    }

});



// ADD TO CART WORKING JS
document.addEventListener("DOMContentLoaded", function () {

    // GET CART
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartIcon = document.getElementById("cartIcon");
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const orderNowBtn = document.getElementById("orderNow");
    const cartTotal = document.getElementById("cartTotal");

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCart() {

        if (cartCount) {
            cartCount.innerText = cart.length;
        }

        if (!cartItems) return;

        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {

            total += item.price;

            const div = document.createElement("div");

            div.className =
                "d-flex align-items-center justify-content-between mb-3 border-bottom pb-2";

            div.innerHTML = `
                <div class="d-flex align-items-center gap-3">
                    <img src="${item.image}" width="60" height="60" style="object-fit:cover;">
                    <div>
                        <strong>${item.name}</strong><br>
                        ₹${item.price}
                    </div>
                </div>

                <button class="btn btn-sm btn-danger remove-btn">
                    Remove
                </button>
            `;

            div.querySelector(".remove-btn").addEventListener("click", () => {
                cart.splice(index, 1);
                saveCart();
                updateCart();
            });

            cartItems.appendChild(div);
        });

        if (cartTotal) {
            cartTotal.innerText = total;
        }
    }

    // ADD TO CART
    document.addEventListener("click", function (e) {

        if (e.target.classList.contains("add-btn")) {

            const button = e.target;

            const name = button.dataset.name;
            const price = parseInt(button.dataset.price);
            const image = button.dataset.image;

            cart.push({ name, price, image });

            saveCart();
            updateCart();
        }
    });

    // OPEN MODAL
    if (cartIcon) {
        cartIcon.addEventListener("click", function () {

            const modalEl = document.getElementById("cartModal");
            if (!modalEl) return;

            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        });
    }

    // ORDER
    if (orderNowBtn) {
        orderNowBtn.addEventListener("click", function () {

            if (cart.length === 0) {
                alert("Your cart is empty ❌");
                return;
            }

            alert("Order placed successfully 🎉");

            cart = [];
            saveCart();
            updateCart();

            const modalEl = document.getElementById("cartModal");
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl);
                modal.hide();
            }
        });
    }

    updateCart();
});

// UI/UX DYNAMIC ENHANCEMENTS (AOS & NAVBAR)
document.addEventListener("DOMContentLoaded", function () {
    // 1. Add AOS CSS dynamically
    const aosCSS = document.createElement("link");
    aosCSS.rel = "stylesheet";
    aosCSS.href = "https://unpkg.com/aos@2.3.4/dist/aos.css";
    document.head.appendChild(aosCSS);

    // 2. Add AOS JS dynamically
    const aosScript = document.createElement("script");
    aosScript.src = "https://unpkg.com/aos@2.3.4/dist/aos.js";
    document.body.appendChild(aosScript);

    aosScript.onload = function () {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50
        });
    };

    // 3. Add AOS attributes to elements dynamically to avoid HTML changes
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", (index % 4) * 100);
    });

    const headings = document.querySelectorAll("h1, h2, h3");
    headings.forEach(heading => {
        heading.setAttribute("data-aos", "fade-right");
    });

    // 4. Sticky Navbar Scroll Effect
    window.addEventListener("scroll", function () {
        const nav = document.querySelector("nav");
        if (nav) {
            nav.classList.toggle("scrolled", window.scrollY > 50);
        }
    });
});