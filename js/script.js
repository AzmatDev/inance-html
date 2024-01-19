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



document.addEventListener("DOMContentLoaded", function() {
    // Get the button and phone number data attribute by ID
    var contactButton = document.getElementById("contactButton");

    // Vérifier si l'utilisateur consulte la page sur un téléphone
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Ajouter un événement de clic
    contactButton.addEventListener("click", function(event) {
        // Prevent the default button behavior (in this case, following a link)
        event.preventDefault();

        // Get the phone number from the data attribute
        var phoneNumber = contactButton.getAttribute("data-phone-number");

        // Si c'est un téléphone, rediriger vers l'application de téléphone
        if (isMobile) {
            window.location.href = "tel:" + phoneNumber;
        } else {
            // Sinon, mettre à jour le texte du bouton pour afficher le numéro
            contactButton.textContent = phoneNumber;
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            expandDescription(box);
        });

        box.addEventListener('mouseleave', () => {
            collapseDescription(box);
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            expandDescription(box);
        });

        box.addEventListener('mouseleave', () => {
            collapseDescription(box);
        });
    });
});

function expandDescription(box) {
    const description = box.querySelector('.detail-box p');
    description.style.maxHeight = description.scrollHeight + 'px';
    description.style.opacity = 1;
}

function collapseDescription(box) {
    const description = box.querySelector('.detail-box p');
    description.style.maxHeight = 0;
    description.style.opacity = 0;
}




