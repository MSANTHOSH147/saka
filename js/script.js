// ==========================================
// SAKA FOOD DELIVERY
// script.js
// General Website Functions
// ==========================================

// ==============================
// Active Navigation Link
// ==============================

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage || (currentPage === "" && href === "index.html")) {

        link.classList.add("active");

    } else {

        link.classList.remove("active");

    }

});

// ==============================
// Smooth Scroll
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ==============================
// Navbar Background on Scroll
// ==============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.background = "rgba(10,10,10,0.97)";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.4)";

    } else {

        header.style.background = "rgba(15,15,15,.88)";
        header.style.boxShadow = "none";

    }

});

// ==============================
// Counter Animation
// ==============================

const counters = document.querySelectorAll(".stat-card h2, .stat-box h2");

const animateCounter = (counter) => {

    const text = counter.innerText;

    const number = parseInt(text.replace(/\D/g, ""));

    if (isNaN(number)) return;

    let count = 0;

    const increment = Math.ceil(number / 100);

    const update = () => {

        count += increment;

        if (count >= number) {

            counter.innerText = text;

        } else {

            const suffix = text.replace(/[0-9]/g, "");

            counter.innerText = count + suffix;

            requestAnimationFrame(update);

        }

    };

    update();

};

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => observer.observe(counter));

// ==============================
// Reveal on Scroll
// ==============================

const revealElements = document.querySelectorAll(

    ".category-card, .service-card, .restaurant-card, .dish-card, .offer-box, .mission-card, .why-card, .goal-card, .achievement-card"

);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.15

});

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "all .6s ease";

    revealObserver.observe(element);

});

// ==============================
// Newsletter Form
// ==============================

const newsletterForm = document.querySelector(".newsletter form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = this.querySelector("input").value.trim();

        if (email === "") {

            alert("Please enter your email.");

            return;

        }

        alert("🎉 Thank you for subscribing to SAKA!");

        this.reset();

    });

}

// ==============================
// Order Buttons
// ==============================

const orderButtons = document.querySelectorAll(

    ".order-btn, .order-btn-card, .primary-btn"

);

orderButtons.forEach(button => {

    button.addEventListener("click", () => {

        console.log("Order button clicked");

    });

});