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
        if (window.inactivityTimer) {
            clearTimeout(window.inactivityTimer);
        }

        // Inicia um novo temporizador para ocultar os elementos
        window.inactivityTimer = setTimeout(hideElements, INACTIVITY_TIME);
    }

    // Eventos para detectar interação do usuário (incluindo toques para celular)
    const events = [
        "mousemove",   // Movimento do mouse (desktop)
        "mousedown",   // Clique do mouse (desktop)
        "keypress",    // Teclas pressionadas (desktop)
        "scroll",      // Rolagem da página (desktop e mobile)
        "touchstart",  // Toque na tela (mobile)
        "touchmove",   // Deslizar na tela (mobile)
        "touchend",    // Fim do toque (mobile)
        "click",       // Clique (desktop e mobile)
    ];

    // Adiciona os eventos de interação
    events.forEach(event => {
        window.addEventListener(event, resetTimer);
    });

    // Inicia o temporizador ao carregar a página
    resetTimer();
} else {
    console.error("Elementos #footer ou #buttons não encontrados no DOM.");
}