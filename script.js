/*

// Tempo de inatividade em milissegundos (5 segundos)
const INACTIVITY_TIME = 3000;

// Seleciona o elemento do rodapé
const footer = document.getElementById("footer");

// Verifica se o rodapé existe antes de aplicar ações
if (footer) {
    // Função para ocultar o rodapé
    function hideFooter() {
        footer.style.opacity = "0";  // Torna o rodapé transparente
        footer.style.visibility = "hidden"; // Oculta o rodapé
    }

    // Função para mostrar o rodapé
    function showFooter() {
        footer.style.opacity = "1";  // Torna o rodapé visível
        footer.style.visibility = "visible"; // Mostra o rodapé
    }

    // Função para reiniciar o temporizador de inatividade
    function resetTimer() {
        showFooter(); // Mostra o rodapé ao interagir

        // Limpa o temporizador anterior
        if (window.inactivityTimer) {
            clearTimeout(window.inactivityTimer);
        }

        // Inicia um novo temporizador para ocultar o rodapé
        window.inactivityTimer = setTimeout(hideFooter, INACTIVITY_TIME);
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
    console.error("Elemento #footer não encontrado no DOM.");
}

*/

// Inicializa o mapa e define o centro e o nível de zoom
var map = L.map('map').setView([-23.5505, -46.6333], 13); // São Paulo como exemplo

 // Adiciona o tile layer do OpenStreetMap ao mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

 // Adiciona um marcador ao mapa
L.marker([-23.5505, -46.6333]).addTo(map)
    .bindPopup('São Paulo, Brasil')
    .openPopup();

// Função para mostrar/esconder o formulário e o overlay
function toggleForm() {
    const overlay = document.getElementById("overlay");
    const formContainer = document.getElementById("formContainer");

    overlay.classList.toggle("visible");
    formContainer.classList.toggle("visible");
}

// Garante que o botão não sobreponha o rodapé

document.addEventListener("scroll", function () {
    const button = document.querySelector(".toggle-form-button");
    const footer = document.querySelector("footer");
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (footerRect.top < windowHeight) {
        // O rodapé está visível, então levamos o botão para cima
        const overlap = windowHeight - footerRect.top;
        button.style.bottom = `${20 + overlap}px`;
    } else {
        // O rodapé não está visível, mantém o botão na posição padrão
        button.style.bottom = "20px";
    }
});
