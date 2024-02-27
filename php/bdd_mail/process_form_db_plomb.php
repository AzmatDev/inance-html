<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once '../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createMutable(__DIR__ . '/../../../inance-html');
$dotenv->load();

$body = file_get_contents(__DIR__ . '/../../confirmation_email.html');

// Connexion à la base de données
$servername = "localhost"; // ou l'adresse IP de votre serveur MySQL
$username = "root"; // votre nom d'utilisateur MySQL
$password = ""; // laisser le champ du mot de passe vide
$dbname = "Nt-service"; // le nom de votre base de données

$body = file_get_contents(__DIR__ . '/../../confirmation_email.html');

// Vérification si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $email = $_POST['email'];
    $telephone = $_POST['telephone'];
    $adresse = $_POST['adresse'];
    $ville = $_POST['ville'];
    $codePostal = $_POST['codePostal'];
    $description = $_POST['description'];


    // Création de la connexion
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Vérification de la connexion
    if ($conn->connect_error) {
        die("La connexion à la base de données a échoué : " . $conn->connect_error);
    }

    // Préparation de la requête SQL pour insérer les données dans la table client
    $sql_client = "INSERT INTO client (nom, prenom, email, telephone, adresse, ville, codePostal) 
            VALUES ('$nom', '$prenom', '$email', '$telephone', '$adresse', '$ville', '$codePostal')";

    // Préparation de la requête SQL pour insérer les données dans la table demande
    $sql_demande = "INSERT INTO demande (id_client, description, date_demande) 
        VALUES (LAST_INSERT_ID(), '$description', NOW())";


    if ($conn->query($sql_client) === TRUE && $conn->query($sql_demande) === TRUE) {

        // Configuration de PHPMailer
        $mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USERNAME'];
        $mail->Password = $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Paramètres du message
        $mail->addReplyTo($email, $prenom . ' ' . $nom);
        $mail->addAddress('groupentservices@gmail.com', 'GroupNtService');
        $mail->setFrom($email);
        $mail->isHTML(true);
        $mail->Subject = 'Demande de Devis - Plomberie';
        $mail->Body = "Nom : $nom<br>
                    Prénom : $prenom<br>
                    Adresse E-mail : $email<br>
                    Numéro de téléphone : $telephone<br>
                    Adresse : $adresse<br>
                    Code Postal : $codePostal<br>
                    Ville : $ville<br>
                    Description du problème : $description";


        // Envoi du message
        try {
            $mail->send();
            // Envoi du message de confirmation au client
            $confirmationMail = new PHPMailer(true);
            $confirmationMail->CharSet = 'UTF-8';
            $confirmationMail->isSMTP();
            $confirmationMail->Host = 'smtp.gmail.com';
            $confirmationMail->SMTPAuth = true;
            $confirmationMail->Username = $_ENV['SMTP_USERNAME'];
            $confirmationMail->Password = $_ENV['SMTP_PASSWORD'];
            $confirmationMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $confirmationMail->Port = 587;

            $confirmationMail->setFrom('groupentservices@gmail.com', 'GroupNtService');
            $confirmationMail->addAddress($email, $prenom . ' ' . $nom);
            $confirmationMail->isHTML(true);
            $confirmationMail->Subject = "Merci d'avoir fait confiance à Nt-service";
            $confirmationMail->Body = $body;

            $confirmationMail->send();
            /*header("Location: /../../confirmation.html");
            exit();*/
        } catch (Exception $e) {
            echo "Une erreur s'est produite : {$mail->ErrorInfo}";
        }

        header("Location: /../../confirmation.html");
        exit();
    }

    // Fermeture de la connexion à la base de données
    $conn->close();
}
