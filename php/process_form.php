<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createMutable(__DIR__ . '/..');
$dotenv->load();

function envoie_mail($from_firstname,$from_lastname,$from_email,$subject,$message){
    $mail = new PHPMailer();
    $mail->SMTPDebug = 2; // Activer la sortie de débogage détaillée
    $mail->SMTPSecure = 'ssl'; // Activer la sortie de débogage détaillée
    $mail->isSMTP(); // Envoi via SMTP
    $mail->Host       = 'smtp.gmail.com'; // Adresse du serveur SMTP
    $mail->SMTPAuth   = true; // Activation de l'authentification SMTP
    $mail->Username   = $_ENV['SMTP_USERNAME']; // Nom d'utilisateur SMTP
    $mail->Password   = $_ENV['SMTP_PASSWORD']; // Mot de passe SMTP
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Activation du chiffrement TLS implicite
    $mail->Port       = 587;

    $mail->setFrom($from_email,"$from_lastname $from_firstname");
    $mail->addAddress('groupentservices@gmail.com','nt-services');
    $mail->isHTML(true); // Définir le format de l'e-mail en HTML
    $mail->Subject = 'Devis Installation';
    $mail->Body    = $message;

    try {
        $mail->send();
        header("Location: /confirmation.html");
        exit();
    } catch (Exception) {
        return "Erreur de messagerie : {$mail->ErrorInfo}";
    }


}
$result = envoie_mail($_POST['prenom'], $_POST['nom'], $_POST['email'], $_POST['subject'], $_POST['description']);

if ($result === true) {
    echo 'Le message a été envoyé';
} else {
    echo "Une erreur s'est produite : $result";
}




