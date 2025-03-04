// Tempo de inatividade em milissegundos (3 segundos)
const INACTIVITY_TIME = 3000;

// Seleciona os elementos que serão ocultados
const footer = document.getElementById("footer");
const buttons = document.getElementById("buttons");

// Garante que os elementos existem antes de aplicar ações
if (footer && buttons) {
    // Função para ocultar os elementos
    function hideElements() {
        footer.style.opacity = "0"; // Torna invisível
        footer.style.transition = "opacity 0.5s ease"; // Suaviza o efeito
        buttons.style.opacity = "0";
        buttons.style.transition = "opacity 0.5s ease";
    }

    // Função para mostrar os elementos
    function showElements() {
        footer.style.opacity = "1"; // Torna visível
        buttons.style.opacity = "1";
    }

    // Reinicia o temporizador de inatividade
    function resetTimer() {
        showElements(); // Mostra os elementos ao interagir

        // Limpa o temporizador anterior
        clearTimeout(window.inactivityTimer);

        // Inicia um novo temporizador para ocultar os elementos
        window.inactivityTimer = setTimeout(hideElements, INACTIVITY_TIME);
    }

    // Eventos que reiniciam o temporizador ao detectar atividade do usuário
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);

    // Inicia o temporizador ao carregar a página
    resetTimer();
}
