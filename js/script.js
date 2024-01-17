document.addEventListener("DOMContentLoaded", function() {
    const prestationsList = document.querySelector(".prestations-list");
    const produitsList = document.querySelector(".produits-list");

    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
    prestationsList.querySelectorAll("li").forEach((li, index) => {
    setTimeout(() => {
    li.classList.add("animate");
}, index * 100); // Ajoute un délai pour créer un effet d'entrée graduelle
});

    produitsList.querySelectorAll("li").forEach((li, index) => {
    setTimeout(() => {
    li.classList.add("animate");
}, index * 100);
});

    observer.disconnect();
}
});
});

    observer.observe(prestationsList);
});