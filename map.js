// ==========================================
// SAKA FOOD DELIVERY
// Contact Form Script
// ==========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validation
        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            subject === "" ||
            message === ""
        ) {
            alert("⚠ Please fill in all fields.");
            return;
        }

        // Email Validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("⚠ Enter a valid email address.");

            return;

        }

        // Submission Object
        const submission = {

            id: Date.now(),

            name,

            email,

            phone,

            subject,

            message,

            date: new Date().toLocaleString()

        };

        // Existing Data
        let submissions =
            JSON.parse(localStorage.getItem("sakaSubmissions")) || [];

        // Add New Submission
        submissions.push(submission);

        // Save
        localStorage.setItem(
            "sakaSubmissions",
            JSON.stringify(submissions)
        );

        // Success
        alert("✅ Message sent successfully!");

        // Reset Form
        contactForm.reset();

        // Redirect
        window.location.href = "submissions.html";

    });

}