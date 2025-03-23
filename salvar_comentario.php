<?php
// Configurações do banco de dados
$host = 'localhost'; // Endereço do servidor MySQL
$dbname = 'portfolio'; // Nome do banco de dados
$user = 'root@localhost'; // Usuário do MySQL
$password = ''; // Senha do MySQL

try {
    // Conecta ao banco de dados usando PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verifica se os dados foram enviados
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Captura os dados do formulário
        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $comentario = $_POST['comentario'];

        // Prepara a query para inserir os dados
        $sql = "INSERT INTO comentarios (nome, email, comentario) VALUES (:nome, :email, :comentario)";
        $stmt = $pdo->prepare($sql);

        // Executa a query com os dados do formulário
        $stmt->execute([
            ':nome' => $nome,
            ':email' => $email,
            ':comentario' => $comentario
        ]);

        // Redireciona de volta para a página principal após salvar o comentário
        header("Location: index.php"); // Altere para index.html se necessário
        exit();
    } else {
        echo "Método de requisição inválido.";
    }
} catch (PDOException $e) {
    // Em caso de erro, exibe a mensagem
    echo "Erro ao salvar o comentário: " . $e->getMessage();
}
?>