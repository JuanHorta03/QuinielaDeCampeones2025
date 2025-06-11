// ¡IMPORTANTE! Reemplaza esta URL con la URL de TU Google Apps Script que copiaste al implementar
const GOOGLE_APPS_SCRIPT_RESULTS_URL = 'https://script.google.com/macros/s/AKfycbwGSDiUzGXSeSnWlsS0XIPGhs-8V6ZoTBEzlN-gSlyiHrL2f3u1R8EyY4aDRTpo8u7g/exec'; // Tu URL actual, si necesitas cambiarla, hazlo aquí.

document.addEventListener('DOMContentLoaded', async () => {
    const loadingDiv = document.getElementById('loading');
    const errorMessageDiv = document.getElementById('error-message');
    const leaderboardTableHeadRow = document.querySelector('#leaderboard-table thead tr');
    const leaderboardTableBody = document.querySelector('#leaderboard-table tbody');
    const officialResultsContainer = document.getElementById('official-results-container'); // Nueva referencia al contenedor de resultados oficiales

    loadingDiv.style.display = 'block'; // Mostrar mensaje de carga
    errorMessageDiv.style.display = 'none'; // Asegurarse de que el error no se muestre

    try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_RESULTS_URL);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}. Detalles: ${errorText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos del Apps Script:', data); // Para depuración

        if (data.error) {
            throw new Error(data.error);
        }

        loadingDiv.style.display = 'none'; // Ocultar mensaje de carga

        // --- 1. Mostrar Partidos y Resultados Oficiales (como tarjetas/items) ---
        officialResultsContainer.innerHTML = ''; // Limpiar el contenido anterior
        if (data.partidos && data.partidos.length > 0) {
            data.partidos.forEach(partido => {
                let resultadoDisplay = 'Pendiente';
                let resultadoClass = 'sin-resultado';

                if (partido.ganador_real) {
                    switch (partido.ganador_real.toUpperCase()) {
                        case 'L':
                            resultadoClass = 'resultado-local-gana';
                            resultadoDisplay = partido.local; // Mostrar el nombre del equipo local si gana
                            break;
                        case 'V':
                            resultadoClass = 'resultado-visitante-gana';
                            resultadoDisplay = partido.visitante; // Mostrar el nombre del equipo visitante si gana
                            break;
                        case 'E':
                            resultadoClass = 'resultado-empate';
                            resultadoDisplay = 'Empate';
                            break;
                        default:
                            resultadoDisplay = 'Inválido';
                            resultadoClass = 'sin-resultado';
                            break;
                    }
                }
                
                const partidoItem = document.createElement('div');
                partidoItem.classList.add('partido-item'); // Clase para el estilo de tarjeta
                partidoItem.innerHTML = `
                    <div class="partido-info">
                        <span class="partido-local">${partido.local}</span>
                        <span class="partido-vs">vs</span>
                        <span class="partido-visitante">${partido.visitante}</span>
                    </div>
                    <div class="partido-resultado-oficial">
                        <span class="resultado-label">Ganador:</span>
                        <span class="resultado-valor ${resultadoClass}">
                            ${resultadoDisplay}
                        </span>
                    </div>
                `;
                officialResultsContainer.appendChild(partidoItem);
            });
        } else {
            officialResultsContainer.innerHTML = '<p class="info-message">No hay partidos definidos o resultados oficiales aún.</p>';
        }

        // --- 2. Construir Encabezados de Partidos Dinámicamente en la Tabla de Ranking ---
        // Eliminar solo los TH de partidos si ya existían para evitar duplicados
        const existingGameHeaders = leaderboardTableHeadRow.querySelectorAll('[data-game-header]');
        existingGameHeaders.forEach(th => th.remove());

        if (data.partidos && data.partidos.length > 0) {
            data.partidos.forEach((partido) => {
                const th = document.createElement('th');
                th.setAttribute('data-game-header', true); // Marcador para poder eliminarlos si se recarga
                th.textContent = `P${partido.id}`; // Solo P1, P2, etc. en el encabezado de la tabla
                leaderboardTableHeadRow.appendChild(th);
            });
        }

        // --- 3. Rellenar el Ranking (Leaderboard) ---
        leaderboardTableBody.innerHTML = ''; // Limpiar el contenido anterior
        if (data.ranking && data.ranking.length > 0) {
            data.ranking.forEach((player, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td data-label="Posición">${index + 1}</td>
                    <td data-label="Jugador">${player.nombre}</td>
                    <td data-label="Puntos">${player.puntos}</td>
                `;

                // Añadir los pronósticos detallados (con acierto/error)
                if (player.pronosticosDetalle && Array.isArray(player.pronosticosDetalle)) {
                    player.pronosticosDetalle.forEach(p => {
                        const td = document.createElement('td');
                        td.classList.add('player-prediction-cell'); // Para aplicar estilos a la celda
                        
                        let classToApply = '';
                        let displayChar = p.prediccion; // Por defecto es el pronóstico
                        let icon = ''; // Para los íconos de acierto/error

                        if (p.esAcierto) {
                            classToApply = 'acierto';
                            icon = '&#10003;'; // ✅
                        } else if (p.prediccion === '_') {
                            classToApply = 'no-pronosticado';
                            icon = ''; // No hay ícono para no pronosticado
                        } else {
                            classToApply = 'fallo';
                            icon = '&#10006;'; // ❌
                        }
                        
                        // Envuelve el pronóstico en un span con la clase para el color/icono
                        td.innerHTML = `<span class="pronostico-individual ${classToApply}">${displayChar}${icon}</span>`;
                        td.setAttribute('data-label', `P${player.pronosticosDetalle.indexOf(p) + 1}`); // Para responsividad móvil
                        row.appendChild(td);
                    });
                } else {
                    // Si no hay pronosticosDetalle, añade celdas vacías o con N/D para mantener la estructura de la tabla
                    const numPartidos = data.partidos ? data.partidos.length : 0;
                    for(let i = 0; i < numPartidos; i++) {
                        const td = document.createElement('td');
                        td.setAttribute('data-label', `P${i + 1}`);
                        td.innerHTML = '<span class="pronostico-individual no-data">N/D</span>';
                        row.appendChild(td);
                    }
                }
                leaderboardTableBody.appendChild(row);
            });
        } else {
            leaderboardTableBody.innerHTML = '<tr><td colspan="13" class="info-message" style="text-align: center; padding: 20px;">No hay jugadores en el ranking aún.</td></tr>';
        }

    } catch (error) {
        console.error('Error al cargar datos del Apps Script:', error);
        loadingDiv.style.display = 'none'; // Ocultar carga
        errorMessageDiv.style.display = 'block'; // Mostrar mensaje de error
    }
});
