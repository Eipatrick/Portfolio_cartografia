// Função para buscar os changesets do usuário
async function fetchUserEdits(userId) {
    const url = `https://api.openstreetmap.org/api/0.6/changesets?display_name=${userId}`;
    const response = await fetch(url);
    const data = await response.text();
    return data;
}

// Função para exibir as edições no menu
function displayEdits(edits, map) {
    const editsList = document.getElementById("edits-list");
    editsList.innerHTML = ""; // Limpa a lista

    edits.forEach(edit => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = `Changeset #${edit.id} em ${edit.location} (${edit.date})`;
        link.href = "#"; // Remove o link externo
        link.dataset.lat = edit.lat; // Armazena a latitude
        link.dataset.lon = edit.lon; // Armazena a longitude
        li.appendChild(link);
        editsList.appendChild(li);
    });

    // Adiciona evento de clique aos links
    editsList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Impede o comportamento padrão do link
            const lat = parseFloat(link.dataset.lat);
            const lon = parseFloat(link.dataset.lon);
            map.setView([lat, lon], 15); // Centraliza o mapa nas coordenadas do changeset

            // Abre um popup no mapa com as informações do changeset
            L.popup()
                .setLatLng([lat, lon])
                .setContent(`Changeset: ${link.textContent}`)
                .openOn(map);
        });
    });
}

// Função principal
async function init() {
    const userId = "eipatrick"; // Seu nome de usuário no OpenStreetMap
    const editsData = await fetchUserEdits(userId);

    // Parse dos dados XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(editsData, "text/xml");
    const changesets = xmlDoc.getElementsByTagName("changeset");

    const edits = [];
    for (let i = 0; i < changesets.length; i++) {
        const changeset = changesets[i];
        const id = changeset.getAttribute("id");
        const date = new Date(changeset.getAttribute("created_at")).toLocaleDateString();
        const minLat = changeset.getAttribute("min_lat");
        const minLon = changeset.getAttribute("min_lon");
        const maxLat = changeset.getAttribute("max_lat");
        const maxLon = changeset.getAttribute("max_lon");

        // Calcula o centro da área do changeset
        const lat = (parseFloat(minLat) + parseFloat(maxLat)) / 2;
        const lon = (parseFloat(minLon) + parseFloat(maxLon)) / 2;
        const location = minLat && minLon ? `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}` : "Localização não disponível";

        edits.push({ id, date, location, lat, lon });
    }

    // Inicializa o mapa
    const map = L.map('map').setView([-15.7942, -47.8822], 4); // Coordenadas iniciais do Brasil
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Adiciona marcadores para cada changeset no mapa
    edits.forEach(edit => {
        if (edit.lat && edit.lon) {
            L.marker([edit.lat, edit.lon]).addTo(map)
                .bindPopup(`Changeset: ${edit.id}<br>Data: ${edit.date}<br>Local: ${edit.location}`);
        }
    });

    // Exibe as edições no menu
    displayEdits(edits, map);
}

// Inicializa o script
init();

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".progress").forEach(function(bar) {
        let width = bar.getAttribute("data-progress");
        bar.style.width = width + "%";
    });
});
