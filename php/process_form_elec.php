<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createMutable(__DIR__ . '/..');
$dotenv->load();

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
    $mail->Subject = 'Demande de Devis - Electricité';
    $mail->Body = "Nom : $nom<br>
                    Prénom : $prenom<br>
                    Adresse E-mail : $email<br>
                    Adresse : $adresse<br>
                    Numéro de téléphone : $telephone<br>
                    Code Postal : $codePostal<br>
                    Ville : $ville<br>
                    Description du problème : $description";

    // Envoi du message
    try {
        $mail->send();
        header("Location: /confirmation.html");
        exit();
    } catch (Exception $e) {
        echo "Une erreur s'est produite : {$mail->ErrorInfo}";
    }
}
