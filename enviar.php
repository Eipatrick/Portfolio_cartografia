<?php
// Dados de conexão com o banco de dados
$host = 'localhost'; // Endereço do servidor
$dbname = 'fale_comigo'; // Nome do banco de dados
$username = 'root'; // Nome de usuário do banco de dados
$password = ''; // Senha do banco de dados

try {
    // Conexão com o banco de dados usando PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Coletar dados do formulário
        $nome = htmlspecialchars($_POST['nome']);
        $email = htmlspecialchars($_POST['email']);
        $mensagem = htmlspecialchars($_POST['mensagem']);

        // Inserir dados no banco de dados
        $sql = "INSERT INTO contatos (nome, email, mensagem) VALUES (:nome, :email, :mensagem)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['nome' => $nome, 'email' => $email, 'mensagem' => $mensagem]);

        // Redirecionar de volta ao formulário com uma mensagem de sucesso
        header("Location: index.html?status=success");
        exit();
    } else {
        // Redirecionar de volta ao formulário com uma mensagem de erro
        header("Location: index.html?status=error");
        exit();
    }
} catch (PDOException $e) {
    // Em caso de erro, redirecionar com uma mensagem de erro
    header("Location: index.html?status=error");
    exit();
}
?>