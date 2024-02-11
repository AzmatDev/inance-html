
/* Code pour l'animation des prestations */
document.addEventListener("DOMContentLoaded", function() {
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
});

/* Code pour la couleur orange sur les li*/
document.addEventListener("DOMContentLoaded", function() {
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
});




/* Code pour l'envoi de la demande */

document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.getElementById("sendButton");
    const modal = document.getElementById("myModal");
    const closeModal = document.querySelector(".close");
    const sendEmailButton = document.getElementById("sendEmail");

    sendButton.addEventListener("click", function() {
    modal.style.display = "block";
    });


    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});



/* Code Pour le numéro de téléphone */
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

/* Code Pour la description avec l'effet déroulante */
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


// Sélectionnez le bouton "Envoyer"
const sendEmailButton = document.getElementById('sendEmail');

// Sélectionnez le modal
const modal = document.getElementById('myModal');

// Sélectionnez le contenu d'informations supplémentaires
const additionalInfo = document.getElementById('additionalInfo');

// Lorsque vous cliquez sur le bouton "Envoyer"
sendEmailButton.addEventListener('click', function() {
    // Vérifiez si une description a été ajoutée
    const problemDescription = document.getElementById('problemDescription').value.trim();
    if (problemDescription !== '') {
        // Faire pivoter le modal
        modal.style.transform = 'rotateY(360deg)';
        // Afficher les informations supplémentaires
        additionalInfo.style.display = 'block';
        // Retarder l'ouverture de la boîte de messagerie pour montrer l'animation de rotation
        setTimeout(function() {
            // Simuler l'envoi de l'e-mail en redirigeant l'utilisateur vers une adresse e-mail (dans cet exemple, vers Outlook)
            const recipient = 'mailto:groupentservices@example.com';
            const subject = 'Demande de service';
            const mailtoLink = `${recipient}?subject=${subject}&body=${problemDescription}`;
            window.location.href = mailtoLink;
        }, 1000); // Choisissez la durée appropriée pour votre animation
    } else {
        alert('Veuillez fournir une description de votre problème.');
    }
});






