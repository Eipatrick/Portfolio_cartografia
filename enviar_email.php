<?php
// Verifica se o formulário foi submetido
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validação e sanitização dos dados
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $assunto = filter_input(INPUT_POST, 'assunto', FILTER_SANITIZE_STRING);
    $mensagem = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_STRING);
    $data_envio = date('d/m/Y');
    $hora_envio = date('H:i:s');

    // Validação do email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("E-mail inválido");
    }

    // Compo E-mail
    $arquivo = "
        <html>
            <head>
                <title>Contato do Portfólio</title>
                <meta charset='utf-8'>
            </head>
            <body>
                <p><b>Nome: </b>$nome</p>
                <p><b>E-mail: </b>$email</p>
                <p><b>Assunto: </b>$assunto</p>
                <p><b>Mensagem: </b>".nl2br($mensagem)."</p>
                <p>Este e-mail foi enviado em <b>$data_envio</b> às <b>$hora_envio</b></p>
            </body>
        </html>
    ";
    
    // Emails para quem será enviado o formulário
    $destino = "paulopatrick@proton.me";
    $assunto_email = "Contato pelo Portfólio: ".$assunto;

    // Cabeçalhos do email
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: $nome <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/".phpversion();

    // Enviar email
    $enviado = mail($destino, $assunto_email, $arquivo, $headers);
    
    // Redirecionamento
    if ($enviado) {
        header('Location: obrigado.html');
    } else {
        header('Location: erro.html');
    }
    exit;
} else {
    // Se alguém tentar acessar diretamente o script
    header('Location: contato.html');
    exit;
}
?>