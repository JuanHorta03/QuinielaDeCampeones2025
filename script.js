// --- CONFIGURACIÓN ---
const QUINIELA_COST = 25;
const WHATSAPP_NUMBER = '+524775670219'; // Tu número de WhatsApp (con el +)
const QUINIELA_TITLE = "QUINELA DEPORTIVA"; // Título principal (oculto si usas logo)

// ¡IMPORTANTE! Esta es la URL de tu Google Apps Script que me proporcionaste.
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXSM-7Jtt0N-TpWZ3cp5BgcHrhM08x1NWtSHPiDFyAOOOe6q4-VXVLvYLdPustMNwm/exec'; // URL corregida (solo un ejemplo, asegúrate de que sea la tuya)

// Horarios de bloqueo/apertura eliminados. La quiniela estará siempre activa.

const partidosData = [
    ["MEXICO", "REP. DOMINICANA"],
    ["AL AHLY SC", "INTER MIAMI"],
    ["BAYERN MUNICH", "AUCKLAND CITY"],
    ["PSG", "ATLETICO DE MADRID"],
    ["BOTAFOGO", "SEATTLE SOUNDERS"],
    ["PALMEIRAS", "PORTO"],
    ["CHELSEA", "LOS ANGELES FC"],
    ["FLAMENGO", "ESPERANCE ST"],
    ["BOCA JRS", "BENFICA"],
    ["HAITI", "ARABIA SAUDITA"] // Partido de reserva
];

const logos = {
    "MEXICO": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/mexico.png",
    "REP. DOMINICANA": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/rep-dominicana.png", // CORREGIDO
    "AL AHLY SC": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/al_ahly.png",
    "INTER MIAMI": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/inter-miami.png",
    "BAYERN MUNICH": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/bayernmunchen.png", // CORREGIDO (y arreglado el error de sintaxis anterior)
    "AUCKLAND CITY": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/auckland_city.png", // CORREGIDO
    "PSG": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/psg.png",
    "ATLETICO DE MADRID": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/atletico-madrid.png",
    "BOTAFOGO": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/botafogo.png",
    "SEATTLE SOUNDERS": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/seattle.png", // CORREGIDO
    "PALMEIRAS": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/palmeiras.png",
    "PORTO": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/porto.png", // CORREGIDO (y arreglado el error de sintaxis anterior)
    "CHELSEA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/chelsea.png",
    "LOS ANGELES FC": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/aston-villa.png", // CORREGIDO
    "FLAMENGO": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/flamengo.png",
    "ESPERANCE ST": "https://raw.githubusercontent.com/JuanHorta03/QuinielaDeCampeones2025/main/logos/esperance_sp_tunis.png", // CORREGIDO
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
    "ORLANDO-CITY": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/orlando-city.png",
    "RB-LEIPZIG": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/rb-leipzig.png",
    "ROMA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/roma.png",
    "STUTTGART": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/stuttgart.png",
    "TIGRES": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/tigres.png"
};

// --- ELEMENTOS DEL DOM ---
const container = document.getElementById("partidos-container");
const resumen = document.getElementById("resumen");
const nombreInput = document.getElementById("nombre");
const totalQuinielasSpan = document.getElementById("totalQuinielasSpan");
const currentCostSpan = document.getElementById("currentCost");
const totalCostSpan = document.getElementById("totalCost");
const numQuinielasSpan = document.getElementById("numQuinielas");
const addedQuinielasList = document.querySelector("#addedQuinielasList ul");

// --- DATOS GLOBALES ---
let addedQuinielas = [];

// --- INICIALIZACIÓN DE LA QUINIELA ---
document.addEventListener('DOMContentLoaded', () => {
    partidosData.forEach(([local, visitante], index) => {
        const div = document.createElement("div");
        div.className = "partido";
        div.setAttribute("data-index", index);
        div.innerHTML = `
            <div class="equipo">
                <img class="logo-equipo" src="${logos[local] || ''}" alt="${local}" onerror="this.src='https://via.placeholder.com/40?text=Logo'" />
                <div class="nombre-equipo">${local}</div>
            </div>
            <div class="opciones">
                <button type="button" class="btn-opcion" data-valor="L">L</button>
                <button type="button" class="btn-opcion" data-valor="E">E</button>
                <button type="button" class="btn-opcion" data-valor="V">V</button>
            </div>
            <div class="equipo">
                <div class="nombre-equipo">${visitante}</div>
                <img class="logo-equipo" src="${logos[visitante] || ''}" alt="${visitante}" onerror="this.src='https://via.placeholder.com/40?text=Logo'" />
            </div>
        `;
        container.appendChild(div);

        if (index === partidosData.length - 2) { // Asumiendo que el penúltimo partido es el de reserva
            const leyendaDiv = document.createElement("div");
            leyendaDiv.className = "leyenda";
            leyendaDiv.textContent = "⚠️ Este partido solo se utilizará si alguno de los anteriores no se juega.";
            container.appendChild(leyendaDiv);
        }
    });

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
    const currentSelection = getCurrentQuinielaSelection();
    resumen.textContent = "Tu selección actual: " + currentSelection.join(" ").trim();
}

function updateOverallSummary() {
    totalQuinielasSpan.textContent = addedQuinielas.length;
    numQuinielasSpan.textContent = addedQuinielas.length;
    totalCostSpan.textContent = `$${addedQuinielas.length * QUINIELA_COST}`;
    renderAddedQuinielas();
}

function clearSelections() {
    document.querySelectorAll(".btn-opcion").forEach(btn => btn.classList.remove("seleccionado"));
    updateResumen();
}

function renderAddedQuinielas() {
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
            deleteButton.title = `Eliminar quiniela #${index + 1}`;
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

// --- FUNCIÓN PARA GENERAR EL MENSAJE DE WHATSAPP ---
function generateWhatsAppMessage() {
    let message = `¡Hola! Aquí están mis quinielas\n\n`; // Encabezado simple y dos saltos de línea

    // Para cada quiniela agregada, generamos una línea con nombre y solo las selecciones (L, E, V)
    addedQuinielas.forEach((q) => {
        message += `${q.name}: ${q.selections.join(' ')}\n`; // Formato: Nombre: L E V L E V... y un salto de línea
    });

    // Añadimos un salto de línea extra antes del resumen final
    message += `\n`;

    message += `Total de quinielas: ${addedQuinielas.length}\n`;
    message += `Costo total a pagar: $${addedQuinielas.length * QUINIELA_COST}\n\n`;
    message += `¡Gracias!`;
    return message;
}

// isSubmissionAllowed() ELIMINADA: La quiniela siempre está activa.


// --- EVENT LISTENERS ---

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-opcion")) {
        const opciones = e.target.parentElement.querySelectorAll(".btn-opcion");
        opciones.forEach(btn => btn.classList.remove("seleccionado"));
        e.target.classList.add("seleccionado");
        updateResumen();
    }
});

document.getElementById("btnBorrar").addEventListener("click", () => {
    clearSelections();
});

document.getElementById("btnAzar").addEventListener("click", () => {
    document.querySelectorAll(".partido").forEach(p => {
        const opciones = p.querySelectorAll(".btn-opcion");
        opciones.forEach(o => o.classList.remove("seleccionado"));
        const rand = opciones[Math.floor(Math.random() * 3)];
        rand.classList.add("seleccionado");
    });
    updateResumen();
});

document.getElementById("btnAgregarQuiniela").addEventListener("click", () => {
    const nombre = nombreInput.value.trim();
    if (!nombre) {
        alert("Por favor escribe tu nombre primero.");
        nombreInput.focus();
        return;
    }

    const currentSelection = getCurrentQuinielaSelection();
    if (currentSelection.includes("_")) {
        alert("Por favor, selecciona una opción para todos los partidos antes de agregar la quiniela.");
        return;
    }

    addedQuinielas.push({ name: nombre, selections: currentSelection });
    clearSelections();
    updateOverallSummary();
});

// Envía a WhatsApp PRIMERO, luego a Google Sheet
document.getElementById("quinielaForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // Previene el envío tradicional del formulario

    // La verificación isSubmissionAllowed() ha sido eliminada. El envío siempre es posible.

    if (addedQuinielas.length === 0) {
        alert("Por favor, agrega al menos una quiniela antes de enviar.");
        return;
    }

    // --- 1. PREPARAR Y ABRIR WHATSAPP INMEDIATAMENTE ---
    const rawWhatsAppMessage = generateWhatsAppMessage();
    const encodedWhatsAppMessage = encodeURIComponent(rawWhatsAppMessage);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedWhatsAppMessage}`;

    try {
        window.open(whatsappURL, "_blank");
        await new Promise(resolve => setTimeout(resolve, 500)); // Pequeña pausa para que el navegador procese la apertura
    } catch (openError) {
        console.warn("Error al intentar abrir WhatsApp (posible bloqueador de pop-ups):", openError);
        // No se mostrará un alert al usuario si falla la apertura de WhatsApp aquí.
    }

    // --- 2. ENVIAR DATOS A GOOGLE SHEETS (ASÍNCRONAMENTE) ---
    try {
        for (const quiniela of addedQuinielas) {
            const prediccionesParaEnviar = quiniela.selections;
            const nombreDelJugador = quiniela.name;
            const costoQuinielaIndividual = QUINIELA_COST;

            await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Importante para evitar problemas de CORS con Google Apps Script
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombreDelJugador,
                    predicciones: prediccionesParaEnviar,
                    costo: costoQuinielaIndividual
                })
            });
        }
        alert('¡Tus quinielas se guardaron con éxito! ¡SUERTE!');

    } catch (error) {
        console.error('Error al enviar datos a Google Sheets:', error);
        alert('Hubo un error al guardar tus quinielas en Google Sheets. Por favor, informa al organizador.');
    } finally { // Asegurar la limpieza del formulario siempre
        // --- LIMPIAR EL FORMULARIO ---
        addedQuinielas = [];
        clearSelections();
        nombreInput.value = '';
        updateOverallSummary();
    }
});
