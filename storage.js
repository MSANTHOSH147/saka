// ==========================================
// SAKA FOOD DELIVERY
// storage.js
// Displays LocalStorage submissions
// ==========================================

const container = document.getElementById("submissionContainer");
const searchInput = document.getElementById("searchInput");
const clearAllBtn = document.getElementById("clearAllBtn");

// Load Data
let submissions =
    JSON.parse(localStorage.getItem("sakaSubmissions")) || [];

// =========================
// Render Function
// =========================

function renderData(data) {

    if (data.length === 0) {

        container.innerHTML = `
        <div class="submission-card">
            <h2>No Submissions Found</h2>
            <p>No customer messages are available.</p>
        </div>
        `;

        return;
    }

    container.innerHTML = "";

    data.forEach(item => {

        container.innerHTML += `

        <div class="submission-card">

            <h3>${item.name}</h3>

            <p><strong>Email:</strong> ${item.email}</p>

            <p><strong>Phone:</strong> ${item.phone}</p>

            <p><strong>Subject:</strong> ${item.subject}</p>

            <p><strong>Message:</strong></p>

            <p>${item.message}</p>

            <p><strong>Date:</strong> ${item.date}</p>

            <button onclick="deleteSubmission(${item.id})">

                Delete

            </button>

        </div>

        `;

    });

}

renderData(submissions);

// =========================
// Delete
// =========================

function deleteSubmission(id) {

    const confirmDelete =
        confirm("Delete this submission?");

    if (!confirmDelete) return;

    submissions = submissions.filter(item => item.id !== id);

    localStorage.setItem(
        "sakaSubmissions",
        JSON.stringify(submissions)
    );

    renderData(submissions);

}

// =========================
// Clear All
// =========================

clearAllBtn.addEventListener("click", () => {

    const confirmClear =
        confirm("Delete ALL submissions?");

    if (!confirmClear) return;

    localStorage.removeItem("sakaSubmissions");

    submissions = [];

    renderData(submissions);

});

// =========================
// Live Search
// =========================

searchInput.addEventListener("keyup", () => {

    const keyword =
        searchInput.value.toLowerCase();

    const filtered = submissions.filter(item =>

        item.name.toLowerCase().includes(keyword) ||

        item.email.toLowerCase().includes(keyword)

    );

    renderData(filtered);

});
