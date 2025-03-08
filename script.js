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

// Função para ajustar a posição do botão
function ajustarPosicaoBotao() {
    const botao = document.getElementById("toggleButton");
    const rodape = document.querySelector("footer");
    const alturaRodape = rodape.offsetHeight;

    // Calcula a posição do botão para que ele fique acima do rodapé
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const alturaJanela = window.innerHeight;
    const alturaDocumento = document.documentElement.scrollHeight;

    // Verifica se o usuário está no final da página
    if (scrollTop + alturaJanela >= alturaDocumento - alturaRodape) {
        botao.style.bottom = `${alturaRodape + 20}px`; // 20px de margem
    } else {
        botao.style.bottom = "130px"; // Posição inicial
    }
}

// Função para mostrar/esconder o formulário e o overlay
function toggleForm() {
    const overlay = document.getElementById("overlay");
    const formContainer = document.getElementById("formContainer");
    const toggleButton = document.getElementById("toggleButton");

    overlay.classList.toggle("visible");
    formContainer.classList.toggle("visible");

    // Move o ícone para cima ou para baixo
    if (formContainer.classList.contains("visible")) {
        toggleButton.classList.add("up");
    } else {
        toggleButton.classList.remove("up");
    }
}

// Adiciona o event listener ao botão
document.getElementById("toggleButton").addEventListener("click", toggleForm);

// Ajusta a posição do botão ao rolar a página
window.addEventListener("scroll", ajustarPosicaoBotao);
window.addEventListener("resize", ajustarPosicaoBotao);