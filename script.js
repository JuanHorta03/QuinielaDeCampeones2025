// --- CONFIGURACIÓN ---
const QUINIELA_COST = 25;
const WHATSAPP_NUMBER = '+524775670219'; // Tu número de WhatsApp (con el +)
const QUINIELA_TITLE = "QUINELA DEPORTIVA"; // Título principal (oculto si usas logo)

// ¡IMPORTANTE! Esta es la URL de tu Google Apps Script.
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqqiiilZFv8xsaKKecoZE9QpZs5Cxs9TvwCYFNcEl5SqQxBzeSgDLf5yaSrqbPuJPw/exec'; 

// Agrega el objeto 'logos' aquí
const logos = {
    // --- Logos actuales (asegúrate de que las URLs sean correctas) ---
    "MEXICO": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/mexico.png",
    "REP. DOMINICANA": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/rep-dominicana.png",
    "AL AHLY SC": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/al_ahly.png",
    "INTER MIAMI": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/inter-miami.png",
    "BAYERN MUNICH": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/bayernmunchen.png",
    "AUCKLAND CITY": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/auckland_city.png",
    "PSG": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/psg.png",
    "ATLETICO DE MADRID": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/atletico-madrid.png",
    "BOTAFOGO": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/botafogo.png",
    "SEATTLE SOUNDERS": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/seattle.png",
    "PALMEIRAS": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/palmeiras.png",
    "PORTO": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/porto.png",
    "CHELSEA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/chelsea.png",
    "LAFC": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/losangeles.png", 
    "FLAMENGO": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/flamengo.png",
    "ESPERANCE ST": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/esperance_sp_tunis.png",
    "BOCA JRS": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/boca.png",
    "HAITI": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/haiti.png",
    "ARABIA SAUDITA": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/arabiasaudita.png",
    "JUVENTUS": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/juventus.png",
    "BENFICA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/benfica.png",
    "BETIS": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/betis.png",
    "BRAGA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/braga.png",
    "CRUZ-AZUL": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/cruz-azul.png",
    "INTER-MILAN": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/inter-milan.png",
    "JAIBA-BRAVA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/jaiba-brava.png",
    "LAZIO": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/lazio.png",
    "LEONES-NEGROS": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/leones-negros.png",
    "MILAN": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/milan.png",
    "RB-LEIPZIG": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/rb-leipzig.png",
    "ROMA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/roma.png",
    "STUTTGART": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/stuttgart.png",
    "TIGRES": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/tigres.png",
    "GUATEMALA": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/guatemala.png",
    "PANAMA": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/panama.png",
    "FLUMINENSE": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/fluminense.png",
    "ULSAN HYUNDAI": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/ulsan_hyundai.png",
    "INTER MILAN": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/inter-milan.png",
    "URAWA RED DIAMONDS": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/urawa.png",
    "RIVER PLATE": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/river.png",
    "MONTERREY": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/monterrey.png",
    "HONDURAS": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/honduras.png",
    "EL SALVADOR": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/elsalvador.png",
    "REAL MADRID": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/realmadrid.png",
    "PACHUCA": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/pachuca.png",
    "RED BULL SALZBURGO": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/red_bull_salzburgo.png",
    "AL HILAL RIYADH": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/al_hilal.png",
    "ESTADOS UNIDOS": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/usa.png",
    "COSTA RICA": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/costa_rica.png",
    "WYDAD AC": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/wydad_ac.png",
    "MONTREAL": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/montreal.png",
    "NEW YORK CITY": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/newyorkcity.png",
    "ATLANTA UNITED": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/atlanta.png",
    "NEW ENGLAND": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/newengland.png",
    "COLORADO": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/colorado.png",
    "AUSTIN FC": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/austin.png",
    "CINCINNATI": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/cincinnati.png", 
    "PORTLAND TIMBERS": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/portland.png",
    "ST. LOUIS CITY": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/st_louis_city.png", 
    "LA GALAXY": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/losangelesgalaxy.png",
    "PHILADELPHIA": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/philadelphia.png", 
    "VANCOUVER WHITECAPS": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/vancouver.png",
    "ORLANDO CITY": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/orlando-city.png",
    "TORONTO FC": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/toronto.png",
    "HOUSTON DYNAMO": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/houstondynamo.png",
    "COLUMBUS CREW": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/columbus.png",
    "SJ EARTHQUAKES": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/sanjose.png"
};

const partidosData = [
    ["MONTREAL", "NEW YORK CITY"],
    ["INTER MIAMI", "ATLANTA UNITED"],
    ["NEW ENGLAND", "COLORADO"],
    ["ORLANDO CITY", "CINCINNATI"],
    ["TORONTO FC", "PORTLAND TIMBERS"],
    ["HOUSTON DYNAMO", "ST. LOUIS CITY"],
    ["SJ EARTHQUAKES", "LA GALAXY"],
    ["SEATTLE SOUNDERS", "AUSTIN FC"],
    ["COLUMBUS CREW", "PHILADELPHIA"],
    ["LAFC", "VANCOUVER WHITECAPS"] // Este es el partido de reserva (el décimo, índice 9)
];

// --- ELEMENTOS DEL DOM ---
const container = document.getElementById("partidos-container");
const resumen = document.getElementById("resumen");
const nombreInput = document.getElementById("nombre");
const telefonoInput = document.getElementById("telefono");
const totalQuinielasSpan = document.getElementById("totalQuinielasSpan");
const totalCostSpan = document.getElementById("totalCost");
const numQuinielasSpan = document.getElementById("numQuinielas");
const addedQuinielasList = document.querySelector("#addedQuinielasList ul");

// --- DATOS GLOBALES ---
let addedQuinielas = [];

// --- INICIALIZACIÓN DE LA QUINIELA ---
document.addEventListener('DOMContentLoaded', () => {
    if (!container) {
        console.error("Error: El elemento con ID 'partidos-container' no fue encontrado en el DOM.");
        return;
    }

    const primeros9Partidos = partidosData.slice(0, 9);
    const partidoDeReserva = partidosData.length > 9 ? partidosData[9] : null; 

    primeros9Partidos.forEach(([local, visitante], index) => {
        const div = document.createElement("div");
        div.className = "partido";
        div.setAttribute("data-index", index);
        div.innerHTML = `
            <div class="equipo">
                <img class="logo-equipo" src="${logos[local] || 'https://via.placeholder.com/40?text=Logo'}" alt="${local}" />
                <div class="nombre-equipo">${local}</div>
            </div>
            <div class="opciones">
                <button type="button" class="btn-opcion" data-valor="L">L</button>
                <button type="button" class="btn-opcion" data-valor="E">E</button>
                <button type="button" class="btn-opcion" data-valor="V">V</button>
            </div>
            <div class="equipo">
                <div class="nombre-equipo">${visitante}</div>
                <img class="logo-equipo" src="${logos[visitante] || 'https://via.placeholder.com/40?text=Logo'}" alt="${visitante}" />
            </div>
        `;
        container.appendChild(div);
    });

    if (partidoDeReserva) {
        const leyendaDiv = document.createElement("div");
        leyendaDiv.className = "leyenda";
        leyendaDiv.innerHTML = `⚠️ <b>Partido de Reserva:</b> Este partido solo se utilizará si alguno de los 9 partidos anteriores no se juega.`;
        container.appendChild(leyendaDiv);

        const [localReserva, visitanteReserva] = partidoDeReserva;
        const divReserva = document.createElement("div");
        divReserva.className = "partido";
        divReserva.setAttribute("data-index", 9);
        divReserva.innerHTML = `
            <div class="equipo">
                <img class="logo-equipo" src="${logos[localReserva] || 'https://via.placeholder.com/40?text=Logo'}" alt="${localReserva}" />
                <div class="nombre-equipo">${localReserva}</div>
            </div>
            <div class="opciones">
                <button type="button" class="btn-opcion" data-valor="L">L</button>
                <button type="button" class="btn-opcion" data-valor="E">E</button>
                <button type="button" class="btn-opcion" data-valor="V">V</button>
            </div>
            <div class="equipo">
                <div class="nombre-equipo">${visitanteReserva}</div>
                <img class="logo-equipo" src="${logos[visitanteReserva] || 'https://via.placeholder.com/40?text=Logo'}" alt="${visitanteReserva}" />
            </div>
        `;
        container.appendChild(divReserva);
    }

    updateResumen();
    updateOverallSummary();
});

// --- FUNCIONES ---
function getCurrentQuinielaSelection() {
    const partidos = document.querySelectorAll(".partido");
    let currentSelection = [];
    partidos.forEach(p => {
        const seleccion = p.querySelector(".btn-opcion.seleccionado");
        currentSelection.push(seleccion ? seleccion.dataset.valor : "_");
    });
    return currentSelection;
}

function updateResumen() {
    if (resumen) {
        const currentSelection = getCurrentQuinielaSelection();
        resumen.textContent = "Tu selección actual: " + currentSelection.join(" ").trim();
    }
}

function updateOverallSummary() {
    if (totalQuinielasSpan) totalQuinielasSpan.textContent = addedQuinielas.length;
    if (numQuinielasSpan) numQuinielasSpan.textContent = addedQuinielas.length;
    if (totalCostSpan) totalCostSpan.textContent = `$${addedQuinielas.length * QUINIELA_COST}`;
    renderAddedQuinielas();
}

function clearSelections() {
    document.querySelectorAll(".btn-opcion").forEach(btn => btn.classList.remove("seleccionado"));
    updateResumen();
}

function renderAddedQuinielas() {
    if (!addedQuinielasList) return; 

    addedQuinielasList.innerHTML = '';
    if (addedQuinielas.length === 0) {
        addedQuinielasList.style.display = 'none';
    } else {
        addedQuinielasList.style.display = 'block';
        addedQuinielas.forEach((q, index) => {
            const listItem = document.createElement('li');
            const quinielaText = document.createElement('span');
            quinielaText.textContent = `${q.name} (#${index + 1}): ${q.selections.join(' ')}`;
            listItem.appendChild(quinielaText);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-quiniela-btn');
            deleteButton.textContent = '❌';
            deleteButton.onclick = () => deleteQuiniela(index);
            listItem.appendChild(deleteButton);

            addedQuinielasList.appendChild(listItem);
        });
    }
}

function deleteQuiniela(index) {
    if (confirm(`¿Estás seguro de que quieres eliminar la quiniela #${index + 1}?`)) {
        addedQuinielas.splice(index, 1);
        updateOverallSummary();
        alert(`Quiniela #${index + 1} eliminada.`);
    }
}

function generateWhatsAppMessage(telefono) {
    let message = `¡Hola! Aquí están mis quinielas:\n\n`;

    addedQuinielas.forEach((q) => {
        message += `${q.name}: ${q.selections.join(' ')}\n`;
    });

    message += `\n📞 Teléfono: ${telefono}\n`; 
    message += `Total de quinielas: ${addedQuinielas.length}\n`;
    message += `Costo total a pagar: $${addedQuinielas.length * QUINIELA_COST}\n\n`;
    message += `¡Gracias!`;
    return message;
}

// --- EVENT LISTENERS ---
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-opcion")) {
        const opciones = e.target.parentElement.querySelectorAll(".btn-opcion");
        opciones.forEach(btn => btn.classList.remove("seleccionado"));
        e.target.classList.add("seleccionado");
        updateResumen();
    }
});

document.getElementById("btnBorrar")?.addEventListener("click", clearSelections);

document.getElementById("btnAzar")?.addEventListener("click", () => {
    document.querySelectorAll(".partido").forEach(p => {
        const opciones = p.querySelectorAll(".btn-opcion");
        opciones.forEach(o => o.classList.remove("seleccionado"));
        const rand = opciones[Math.floor(Math.random() * 3)];
        rand.classList.add("seleccionado");
    });
    updateResumen();
});

document.getElementById("btnAgregarQuiniela")?.addEventListener("click", () => {
    const nombre = nombreInput.value.trim();
    if (!nombre) {
        alert("Por favor escribe tu nombre primero.");
        nombreInput.focus();
        return;
    }

    const currentSelection = getCurrentQuinielaSelection();
    if (currentSelection.includes("_")) {
        alert("Selecciona todos los partidos antes de agregar la quiniela.");
        return;
    }

    addedQuinielas.push({ name: nombre, selections: currentSelection });
    clearSelections();
    updateOverallSummary();
});

const quinielaForm = document.getElementById("quinielaForm");
quinielaForm?.addEventListener("submit", async function(e) {
    e.preventDefault(); 

    if (addedQuinielas.length === 0) {
        alert("Agrega al menos una quiniela antes de enviar.");
        return;
    }

    const telefono = telefonoInput.value.trim();
    if (!telefono) {
        alert("Por favor ingresa tu número de teléfono.");
        telefonoInput.focus();
        return;
    }

    const rawWhatsAppMessage = generateWhatsAppMessage(telefono);
    const encodedWhatsAppMessage = encodeURIComponent(rawWhatsAppMessage);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedWhatsAppMessage}`;

    try {
        window.open(whatsappURL, "_blank");
        await new Promise(resolve => setTimeout(resolve, 500)); 
    } catch (openError) {
        console.warn("Error al abrir WhatsApp:", openError);
    }

    try {
        for (const quiniela of addedQuinielas) {
            await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', 
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: quiniela.name,
                    predicciones: quiniela.selections,
                    telefono: telefono,
                    costo: QUINIELA_COST
                })
            });
        }
        alert('¡Tus quinielas se guardaron con éxito! ¡SUERTE!');

    } catch (error) {
        console.error('Error al enviar datos a Google Sheets:', error);
        alert('Hubo un error al guardar en Google Sheets. Informa al organizador.');
    } finally { 
        addedQuinielas = [];
        clearSelections();
        if (nombreInput) nombreInput.value = ''; 
        if (telefonoInput) telefonoInput.value = ''; 
        updateOverallSummary();
    }
});
