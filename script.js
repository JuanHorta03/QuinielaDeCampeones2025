// --- CONFIGURACIÓN ---
const QUINIELA_COST = 25;
const WHATSAPP_NUMBER = '+524775670219'; // Tu número de WhatsApp (con el +)
const QUINIELA_TITLE = "QUINELA DEPORTIVA"; // Título principal (oculto si usas logo)

// ¡IMPORTANTE! Esta es la URL de tu Google Apps Script que me proporcionaste.
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxV9edZwQwDAsOesHd4awFxpQn16aEsf3Oys-O7ZmintcyR5XqOwQ8ORsqLjYkCwTld/exec';

const partidosData = [
    ["TOLUCA", "AMÉRICA"],
    ["AT. BILBAO", "BARCELONA"],
    ["GIRONA", "AT. MADRID"],
    ["VILLARREAL", "SEVILLA"],
    ["FULHAM", "MAN CITY"],
    ["LIVERPOOL", "CRYSTAL P."],
    ["MAN UNITED", "ASTON VILLA"],
    ["NOTTINGHAM", "CHELSEA"],
    ["TOTTENHAM", "BRIGHTON"],
    ["VENEZIA", "JUVENTUS"] // Partido de reserva
];

// URLs de logos de equipos. ¡ACTUALIZADAS CON TUS LOGOS DE GITHUB!
const logos = {
    "TOLUCA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/toluca.png",
    "AMÉRICA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/america.png",
    "AT. BILBAO": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/atletico-bilbao.png",
    "BARCELONA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/barcelona.png",
    "GIRONA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/girona.png",
    "AT. MADRID": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/atletico-madrid.png",
    "VILLARREAL": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/villareal.png",
    "SEVILLA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/sevilla.png",
    "FULHAM": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/fulham.png",
    "MAN CITY": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/man-city.png",
    "LIVERPOOL": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/liverpool.png",
    "CRYSTAL P.": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/crystal-palace.png",
    "MAN UNITED": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/man-united.png",
    "ASTON VILLA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/aston-villa.png",
    "NOTTINGHAM": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/forest.png",
    "CHELSEA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/chelsea.png",
    "TOTTENHAM": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/tottenham.png",
    "BRIGHTON": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/bha.png",
    "VENEZIA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/venezia.png",
    "JUVENTUS": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/juventus.png",
    "BENFICA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/benfica.png",
    "BETIS": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/betis.png",
    "BRAGA": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/braga.png",
    "CRUZ-AZUL": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/cruz-azul.png",
    "INTER-MIAMI": "https://raw.githubusercontent.com/JuanHorta03/logos-quiniela/main/logos/inter-miami.png",
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

        if (index === partidosData.length - 2) {
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
    if (confirm(`¿Estás seguro de que quieres eliminar la quiniela #${index + 1} de ${addedQuinielas[index].name}?`)) {
        addedQuinielas.splice(index, 1);
        updateOverallSummary();
    }
}

// --- FUNCIÓN PARA GENERAR EL MENSAJE DE WHATSAPP (MODIFICADA) ---
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
    return message; // CAMBIO CLAVE: NO ENCODEAMOS AQUÍ, LO HAREMOS DESPUÉS EN LA URL
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

// MODIFICADO: Envía a Google Sheet Y luego a WhatsApp
document.getElementById("quinielaForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    if (addedQuinielas.length === 0) {
        alert("Por favor, agrega al menos una quiniela antes de enviar.");
        return;
    }

    // --- PREPARAR Y ENVIAR DATOS PARA CADA QUINIELA AL GOOGLE SHEET ---
    try {
        for (const quiniela of addedQuinielas) {
            const prediccionesParaEnviar = quiniela.selections;
            const nombreDelJugador = quiniela.name;
            const costoQuinielaIndividual = QUINIELA_COST;

            await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
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

        // Primero, informamos que se guardó en la hoja.
        alert('¡Quiniela(s) enviada(s) con éxito a Google Sheets!');

        // --- PREPARAR MENSAJE DE WHATSAPP ---
        // Generamos el mensaje en texto plano
        const rawWhatsAppMessage = generateWhatsAppMessage();
        
        // Codificamos el mensaje para la URL justo antes de usarlo
        const encodedWhatsAppMessage = encodeURIComponent(rawWhatsAppMessage); 
        
        // Construimos la URL de WhatsApp
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedWhatsAppMessage}`;

        let whatsappOpened = false;
        try {
            // Intentamos abrir WhatsApp en una nueva pestaña
            const whatsappWindow = window.open(whatsappURL, '_blank');

            // Pequeño retardo para dar tiempo a que el navegador decida si lo bloquea
            await new Promise(resolve => setTimeout(resolve, 500));

            if (whatsappWindow && !whatsappWindow.closed) {
                whatsappOpened = true;
            }

        } catch (openError) {
            console.warn("Error al intentar abrir WhatsApp (posible bloqueador de pop-ups):", openError);
            whatsappOpened = false;
        }

        if (!whatsappOpened) {
            // Si WhatsApp no se abrió, proporcionamos el mensaje para que el usuario lo copie
            const confirmCopy = confirm(
                'Parece que el navegador ha bloqueado la apertura de WhatsApp, o no tienes la aplicación instalada.\n\n' +
                'No te preocupes, tus quinielas *ya fueron guardadas en Google Sheets*.\n\n' +
                '¿Quieres copiar el mensaje para pegarlo manualmente en WhatsApp?'
            );

            if (confirmCopy) {
                // Intentar copiar el mensaje al portapapeles
                navigator.clipboard.writeText(rawWhatsAppMessage) // Usamos el mensaje SIN codificar para copiar
                    .then(() => {
                        alert('¡Mensaje copiado al portapapeles! Ahora abre WhatsApp y pégalo.');
                        // Opcional: Abre WhatsApp Web para que pueda pegar
                        window.open(`https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`, '_blank');
                    })
                    .catch(err => {
                        console.error('Error al copiar al portapapeles:', err);
                        // Si falla la copia, se lo mostramos para que lo copie manualmente
                        alert(
                            'No se pudo copiar el mensaje automáticamente. Por favor, cópialo manualmente:\n\n' +
                            '-----------------------------------------------------------\n' +
                            rawWhatsAppMessage + // Usamos el mensaje SIN codificar aquí también
                            '\n-----------------------------------------------------------\n\n' +
                            'Luego, abre WhatsApp y pégalo en el chat con el organizador.'
                        );
                    });
            }
        }

        // Limpiar el formulario y las quinielas agregadas después de todo el envío
        addedQuinielas = [];
        clearSelections();
        nombreInput.value = '';
        updateOverallSummary();

    } catch (error) {
        console.error('Error al enviar la quiniela(s):', error);
        alert('Hubo un error al enviar tus quinielas a Google Sheets. Por favor, inténtalo de nuevo.');
    }
});