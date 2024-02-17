document.addEventListener("DOMContentLoaded", function() {
    /* Code pour les formulaires */
    function validateEmail() {
        var email = document.getElementById("email").value;
        var emailRegex = /.*@.*/;   // Vérifie la présence du caractère "@"

        if (!emailRegex.test(email)) {
            alert("Veuillez entrer une adresse e-mail valide.");
            return false;
        }
        return true;
    }

    /* Code pour l'animation des prestations */
    const prestationsList = document.querySelector(".prestations-list");
    const produitsList = document.querySelector(".produits-list");

    const observerPrestations = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                prestationsList.querySelectorAll("li").forEach((li, index) => {
                    setTimeout(() => {
                        li.classList.add("animate");
                    }, index * 100); // Ajoute un délai pour créer un effet d'entrée graduelle
                });
                observerPrestations.disconnect();
            }
        });
    });

    const observerProduits = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                produitsList.querySelectorAll("li").forEach((li, index) => {
                    setTimeout(() => {
                        li.classList.add("animate");
                    }, index * 100);
                });
                observerProduits.disconnect();
            }
        });
    });

    observerPrestations.observe(prestationsList);
    observerProduits.observe(produitsList);

    /* Code pour la couleur orange sur les li*/
    const prestationsListItems = document.querySelectorAll(".prestations-list li");
    const produitsListItems = document.querySelectorAll(".produits-list li");

    prestationsListItems.forEach(item => {
        item.addEventListener("click", function() {
            toggleBackgroundColor(this);
        });
    });

    produitsListItems.forEach(item => {
        item.addEventListener("click", function() {
            toggleBackgroundColor(this);
        });
    });

    function toggleBackgroundColor(element) {
        const orangeColor = "#ff8a1d";

        // Vérifie si la couleur actuelle est la couleur par défaut
        if (element.style.backgroundColor === "white" || element.style.backgroundColor === "") {
            element.style.backgroundColor = orangeColor;
        } else {
            element.style.backgroundColor = "white";
        }
    }

    /* Code Pour le numéro de téléphone */
    const contactButton = document.getElementById("contactButton");
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    contactButton.addEventListener("click", function(event) {
        event.preventDefault();
        const phoneNumber = contactButton.getAttribute("data-phone-number");

        if (isMobile) {
            window.location.href = "tel:" + phoneNumber;
        } else {
            if (contactButton.textContent === phoneNumber) {
                window.location.href = "tel:" + phoneNumber;
            } else {
                contactButton.textContent = phoneNumber;
            }
        }
    });

    /* Code Pour la description avec l'effet déroulante */
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            expandDescription(box);
        });

        box.addEventListener('mouseleave', () => {
            collapseDescription(box);
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

    /* Code pour le curseur */
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    const colors = [
        "#d1e3ff",
        "#c1d9fc",
        "#b2ccf8",
        "#a2c1f4",
        "#93b6f0",
        "#83a9ec",
        "#749de8",
        "#6491e4",
        "#5485e0",
        "#4578dc",
        "#356cd8",
        "#2660d4",
        "#0355cc"
    ];
    circles.forEach(function (circle, index) {
        circle.x = 0;
        circle.y = 0;
        circle.style.backgroundColor = colors[index % colors.length];
    });

    window.addEventListener("mousemove", function(e){
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
            circle.style.left = x - 12 + "px";
            circle.style.top = y - 12 + "px";

            circle.style.scale = (circles.length - index) / circles.length;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();

    /* Code pour le modal et la sélection des éléments de liste */
    const btnEnvoyer = document.getElementById("envoyer");
    const btnEnvoyerDemande = document.getElementById("envoyerDemande");
    const modal = document.getElementById("modal");
    const btnCloseModal = document.querySelector(".close");
    const selectedItems = []; // Tableau pour stocker les éléments sélectionnés

    btnEnvoyerDemande.addEventListener("click", function() {
        modal.style.display = "block";
    });

    btnCloseModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    btnEnvoyer.addEventListener("click", function() {
        const nom = document.getElementById("nom").value;
        const prenom = document.getElementById("prenom").value;
        const email = document.getElementById("email").value;
        const telephone = document.getElementById("telephone").value;
        const adresse = document.getElementById("adresse").value;
        const ville = document.getElementById("ville").value;
        const codePostal = document.getElementById("codePostal").value;
        const description = document.getElementById("description").value;

        // Récupérer les éléments sélectionnés
        console.log("Éléments sélectionnés:", selectedItems);

        // Ici, vous pouvez utiliser les valeurs récupérées pour envoyer un e-mail ou effectuer toute autre action nécessaire
        console.log("Nom:", nom);
        console.log("Prénom:", prenom);
        console.log("Email:", email);
        console.log("Téléphone:", telephone);
        console.log("Adresse:", adresse);
        console.log("Ville:", ville);
        console.log("Code postal:", codePostal);
        console.log("Description:", description);

        // Fermer le modal après l'envoi des informations
        modal.style.display = "none";
    });

    prestationsListItems.forEach(item => {
        item.addEventListener("click", function() {
            toggleSelection(item);
        });
    });

    produitsListItems.forEach(item => {
        item.addEventListener("click", function() {
            toggleSelection(item);
        });
    });

    function toggleSelection(element) {
        const orangeColor = "#ff8a1d";

        // Vérifie si l'élément a une classe qui le marque comme sélectionné
        const isSelected = element.classList.contains("selected");

        // Si l'élément est sélectionné, le désélectionne
        if (isSelected) {
            element.classList.remove("selected"); // Supprime la classe "selected"
            const index = selectedItems.indexOf(element.textContent);
            if (index !== -1) {
                selectedItems.splice(index, 1); // Retire l'élément du tableau des éléments sélectionnés
            }
        } else {
            // Sinon, sélectionne l'élément
            element.classList.add("selected"); // Ajoute la classe "selected"
            selectedItems.push(element.textContent); // Ajoute le texte de l'élément au tableau des éléments sélectionnés
        }

        console.log(selectedItems); // Affiche le tableau des éléments sélectionnés dans la console (pour le débogage (f12))
    }

});

document.addEventListener("DOMContentLoaded", function() {
    const btnEnvoyerDemande = document.getElementById("envoyerDemande");
    const modal = document.getElementById("modal");
    const btnCloseModal = document.querySelector(".close");

    btnEnvoyerDemande.addEventListener("click", function() {
        modal.classList.add("active"); // Ajoute la classe 'active' pour rendre le modal visible
    });

    btnCloseModal.addEventListener("click", function() {
        modal.classList.remove("active"); // Retire la classe 'active' pour masquer le modal
    });
});
