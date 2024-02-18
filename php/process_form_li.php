<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createMutable(__DIR__ . '/..');
$dotenv->load();

error_reporting(E_ALL);
ini_set('display_errors', 1);


if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $nom = $_POST['nom'];
        $prenom = $_POST['prenom'];
        $email = $_POST['email'];
        $adresse = $_POST['adresse'];
        $telephone = $_POST['telephone'];
        $codePostal = $_POST['codePostal'];
        $ville = $_POST['ville'];
        $description = $_POST['description'];

        // Configuration de PHPMailer
    $mail = new PHPMailer(true);
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
    $mail->Subject = 'Demande de Devis';
    $mail->Body = "Nom : $nom<br>
                   Prénom : $prenom<br>
                   Adresse E-mail : $email<br>
                   Numéro de téléphone : $telephone<br>
                   Adresse : $adresse<br>
                   Code Postal : $codePostal<br>
                   Ville : $ville<br>
                   Description du problème : $description<br>
                   Élément(s) sélectionné(s) : ";

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
        $confirmationMail->Body = "Votre demande de devis a bien été reçue. Nous reviendrons vers vous dans les plus brefs délais.";

        $confirmationMail->send();

        header("Location: /confirmation.html");
        exit();
    } catch (Exception $e) {
        echo "Une erreur s'est produite {$mail->ErrorInfo}";
    }
}
