<?php
// Configurações do banco de dados
$host = 'localhost';
$dbname = 'portfolio';
$user = 'root@localhost';
$password = '';

try {
    // Conecta ao banco de dados
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Busca todos os comentários
    $sql = "SELECT nome, email, comentario, data FROM comentarios ORDER BY data DESC";
    $stmt = $pdo->query($sql);
    $comentarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Erro ao buscar comentários: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comentários</title>
    <style>
        .comentario {
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
        }
        .comentario h3 {
            margin: 0;
        }
        .comentario p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <h1>Comentários</h1>
    <?php if (!empty($comentarios)): ?>
        <?php foreach ($comentarios as $comentario): ?>
            <div class="comentario">
                <h3><?= htmlspecialchars($comentario['nome']) ?></h3>
                <p><strong>E-mail:</strong> <?= htmlspecialchars($comentario['email']) ?></p>
                <p><strong>Comentário:</strong> <?= htmlspecialchars($comentario['comentario']) ?></p>
                <p><small>Data: <?= $comentario['data'] ?></small></p>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <p>Nenhum comentário encontrado.</p>
    <?php endif; ?>
</body>
</html>