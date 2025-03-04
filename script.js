// Tempo de inatividade em milissegundos (3 segundos)
const INACTIVITY_TIME = 3000;

// Seleciona os elementos que serão ocultados
const footer = document.getElementById("footer");
const buttons = document.getElementById("buttons");

// Verifica se os elementos existem antes de aplicar ações
if (footer && buttons) {
    // Função para ocultar os elementos
    function hideElements() {
        footer.style.opacity = "0";  // Torna o rodapé transparente
        footer.style.visibility = "hidden"; // Oculta o rodapé
        buttons.style.opacity = "0"; // Torna os botões transparentes
        buttons.style.visibility = "hidden"; // Oculta os botões
    }

    // Função para mostrar os elementos
    function showElements() {
        footer.style.opacity = "1";  // Torna o rodapé visível
        footer.style.visibility = "visible"; // Mostra o rodapé
        buttons.style.opacity = "1"; // Torna os botões visíveis
        buttons.style.visibility = "visible"; // Mostra os botões
    }

    // Função para reiniciar o temporizador de inatividade
    function resetTimer() {
        showElements(); // Mostra os elementos ao interagir

        // Limpa o temporizador anterior
        clearTimeout(window.inactivityTimer);

        // Inicia um novo temporizador para ocultar os elementos
        window.inactivityTimer = setTimeout(hideElements, INACTIVITY_TIME);
    }

    // Eventos para detectar interação do usuário (incluindo toques para celular)
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("touchstart", resetTimer); // Para detectar toques na tela
    window.addEventListener("touchmove", resetTimer); // Para detectar deslizar na tela
    window.addEventListener("touchend", resetTimer); // Para detectar o fim do toque

    // Inicia o temporizador ao carregar a página
    resetTimer();
} else {
    console.error("Elementos #footer ou #buttons não encontrados no DOM.");
}