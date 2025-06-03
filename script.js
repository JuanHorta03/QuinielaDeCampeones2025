// --- CONFIGURACIÓN ---
const QUINIELA_COST = 25;
const WHATSAPP_NUMBER = '+524775670219'; // Tu número de WhatsApp (con el +)
const QUINIELA_TITLE = "QUINELA DEPORTIVA"; // Título principal (oculto si usas logo)

// ¡IMPORTANTE! Esta es la URL de tu Google Apps Script que me proporcionaste.
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxV6n9edZwQwDAsOesHd4awFxpQn16aEsf3Oys-O7ZmintcyR5XqOwQ8ORsqLjYkCwTld/exec'; // URL corregida (solo un ejemplo, asegúrate de que sea la tuya)

// Configuración del horario de bloqueo/apertura para la PRUEBA
// SE BLOQUEA HOY (LUNES) A LAS 6:39 PM
const BLOCKING_DAY_OF_WEEK = new Date().getDay(); // Hoy (Lunes, si es el día actual)
const BLOCKING_HOUR = 18;      // 18 para 6 PM
const BLOCKING_MINUTE = 39;    // 39 minutos

// SE DESBLOQUEA HOY (LUNES) A LAS 6:45 PM
const OPENING_DAY_OF_WEEK = new Date().getDay();  // Hoy (Lunes, si es el día actual)
const OPENING_HOUR = 18;         // 18 para 6 PM
const OPENING_MINUTE = 45;       // 45 minutos

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
const currentCostSpan = document.getElementById("currentCost"); // No usado en el HTML proporcionado, pero se mantiene
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

// FUNCIÓN PARA VERIFICAR SI EL ENVÍO ESTÁ PERMITIDO con horarios de apertura y cierre (PARA PRUEBA)
function isSubmissionAllowed() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 5 = Viernes

    // Calcular la fecha y hora de bloqueo
    let blockingDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), BLOCKING_HOUR, BLOCKING_MINUTE, 0, 0);

    // Calcular la fecha y hora de apertura
    let openingDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), OPENING_HOUR, OPENING_MINUTE, 0, 0);

    // Si la hora actual ya pasó la hora de bloqueo de HOY, pero no ha llegado la hora de apertura de HOY/MAÑANA,
    // significa que estamos en la ventana de BLOQUEO.
    // También si la hora actual está antes de la hora de apertura de HOY.

    // Ajustar openingDate si ya pasó para que siempre apunte al futuro o al momento actual
    if (now > openingDate && now < blockingDate) {
        // Si ya estamos en la ventana abierta pero aún no pasamos el bloqueo
        // No necesitamos ajustar openingDate para el futuro en este caso de prueba simple.
    } else if (now > openingDate && now > blockingDate) {
        // Si ya pasamos tanto la apertura como el bloqueo de hoy,
        // esto significaría que la ventana de apertura para hoy ya terminó.
        // Para este caso de prueba simple, si la hora actual ya superó ambas,
        // mantendremos blockingDate y openingDate de hoy para la comparación.
        // La lógica de `return now >= openingDate && now < blockingDate` lo maneja.
    }


    // Para depuración (descomentar para ver en consola):
    console.log("Current Time:", now.toLocaleString());
    console.log("Blocking Time (PRUEBA):", blockingDate.toLocaleString());
    console.log("Opening Time (PRUEBA):", openingDate.toLocaleString());


    // La submission está permitida si:
    // 1. La hora actual es después o igual a la hora de apertura.
    // 2. Y la hora actual es estrictamente antes de la hora de bloqueo.
    return now >= openingDate && now < blockingDate;
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

// MODIFICADO: Envía a WhatsApp PRIMERO, luego a Google Sheet
document.getElementById("quinielaForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // Previene el envío tradicional del formulario

    // VERIFICAR SI EL ENVÍO ESTÁ PERMITIDO
    if (!isSubmissionAllowed()) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        let message = "";
        // Bloqueado (entre 6:39 PM y 6:45 PM)
        if (currentHour === BLOCKING_HOUR && currentMinute >= BLOCKING_MINUTE && (currentHour < OPENING_HOUR || (currentHour === OPENING_HOUR && currentMinute < OPENING_MINUTE))) {
             message = `¡El plazo para enviar quinielas ha terminado por ahora! Se reabrirá hoy a las ${OPENING_HOUR}:${OPENING_MINUTE < 10 ? '0' : ''}${OPENING_MINUTE} PM.`;
        } else if (now > new Date(now.getFullYear(), now.getMonth(), now.getDate(), OPENING_HOUR, OPENING_MINUTE, 0, 0)) {
            // Ya es después de la hora de apertura
            message = "El plazo para enviar quinielas ha terminado. Espera el próximo ciclo de prueba."; // Esto es para cuando ya pasó la ventana de apertura/cierre de hoy
        } else {
             // Es antes de la hora de apertura (antes de las 6:45 PM)
            message = `El envío de quinielas estará disponible hoy a partir de las ${OPENING_HOUR}:${OPENING_MINUTE < 10 ? '0' : ''}${OPENING_MINUTE} PM.`;
        }


        alert(message);
        return; // Detener el envío si no está permitido
    }

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