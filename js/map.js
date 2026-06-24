document.addEventListener("DOMContentLoaded", function () {

    const mapDiv = document.getElementById("map");

    if (!mapDiv) return;

    // Chennai
    const map = L.map("map").setView([13.0827, 80.2707], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

        attribution: "&copy; OpenStreetMap contributors"

    }).addTo(map);

    L.marker([13.0827,80.2707])

        .addTo(map)

        .bindPopup("<b>🍔 SAKA Food Delivery</b><br>Chennai")

        .openPopup();

});