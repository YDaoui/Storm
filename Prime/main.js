// main.js – Interaktionen
console.log("Energiezukunft – Seite geladen");

document.addEventListener("DOMContentLoaded", function () {
    // Menü-Links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("mouseenter", () => {
            console.log(`Menü: ${link.textContent}`);
        });
    });

    // Buttons (Demo)
    const btns = document.querySelectorAll(".btn, .btn-secondary");
    btns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Funktion folgt in Kürze.");
        });
    });
});