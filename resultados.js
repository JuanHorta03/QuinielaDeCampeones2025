// ¡IMPORTANTE! Reemplaza esta URL con la URL de TU Google Apps Script que copiaste al implementar
const GOOGLE_APPS_SCRIPT_RESULTS_URL = 'https://script.google.com/macros/s/AKfycbwGSDiUzGXSeSnWlsS0XIPGhs-8V6ZoTBEzlN-gSlyiHrL2f3u1R8EyY4aDRTpo8u7g/exec'; // ESTA ES LA URL QUE ME PROPORCIONASTE.

document.addEventListener('DOMContentLoaded', async () => {
    const loadingDiv = document.getElementById('loading');
    const errorMessageDiv = document.getElementById('error-message');
    const leaderboardTableHeadRow = document.querySelector('#leaderboard-table thead tr');
    const leaderboardTableBody = document.querySelector('#leaderboard-table tbody');
    const officialResultsTableBody = document.querySelector('#official-results-table tbody'); // Nueva referencia a la tabla de partidos

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

        // --- 1. Mostrar Partidos y Resultados Oficiales (como tabla) ---
        officialResultsTableBody.innerHTML = ''; // Limpiar el contenido anterior
        if (data.partidos && data.partidos.length > 0) {
            data.partidos.forEach(partido => {
                const row = document.createElement('tr');
                
                let resultadoDisplay = 'Pendiente';
                let resultadoClass = 'sin-resultado'; 

                if (partido.ganador_real) {
                    switch (partido.ganador_real.toUpperCase()) {
                        case 'L':
                            resultadoDisplay = 'L'; // Solo mostrar L, V, E en la tabla de partidos
                            resultadoClass = 'resultado-local-gana';
                            break;
                        case 'V':
                            resultadoDisplay = 'V';
                            resultadoClass = 'resultado-visitante-gana';
                            break;
                        case 'E':
                            resultadoDisplay = 'E';
                            resultadoClass = 'resultado-empate';
                            break;
                        default:
                            resultadoDisplay = 'Inválido';
                            resultadoClass = 'sin-resultado';
                            break;
                    }
                }
                
                row.innerHTML = `
                    <td data-label="Partido">${partido.local} vs ${partido.visitante}</td>
                    <td data-label="Resultado" class="partido-resultado-celda">
                        <span class="partido-resultado-span ${resultadoClass}">
                            ${resultadoDisplay}
                        </span>
                    </td>
                `;
                officialResultsTableBody.appendChild(row);
            });
        } else {
            officialResultsTableBody.innerHTML = '<tr><td colspan="2" class="info-message">No hay partidos definidos o resultados oficiales aún.</td></tr>';
        }

        // --- 2. Construir Encabezados de Partidos Dinámicamente en la Tabla de Ranking ---
        // Eliminar solo los TH de partidos si ya existían para evitar duplicados
        const existingGameHeaders = leaderboardTableHeadRow.querySelectorAll('[data-game-header]');
        existingGameHeaders.forEach(th => th.remove());

        if (data.partidos && data.partidos.length > 0) {
            data.partidos.forEach((partido) => {
                const th = document.createElement('th');
                th.setAttribute('data-game-header', true); // Marcador para poder eliminarlos si se recarga
                
                let resultadoClass = 'sin-resultado'; // Default para el encabezado
                let resultadoTexto = 'Pendiente';

                if (partido.ganador_real) {
                    switch (partido.ganador_real.toUpperCase()) {
                        case 'L':
                            resultadoClass = 'resultado-local-gana';
                            resultadoTexto = 'L';
                            break;
                        case 'V':
                            resultadoClass = 'resultado-visitante-gana';
                            resultadoTexto = 'V';
                            break;
                        case 'E':
                            resultadoClass = 'resultado-empate';
                            resultadoTexto = 'E';
                            break;
                        default:
                            resultadoTexto = '?'; // Para resultados inesperados
                            break;
                    }
                }

                // **** ESTA ES LA MODIFICACIÓN PARA EL ENCABEZADO DEL RANKING ****
                // Asegúrate de que este bloque esté CORRECTAMENTE incluido
                th.innerHTML = `
                    <div class="rotated-header-content">
                        <span class="header-match-name">${partido.local.substring(0, 6)} vs ${partido.visitante.substring(0, 6)}</span>
                        <span class="header-match-result ${resultadoClass}">${resultadoTexto}</span>
                        <span class="header-px">P${partido.id}</span>
                    </div>
                `;
                // ***************************************************************

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
            // Corrección del error de sintaxis: Usar comillas dobles o escapar el apóstrofo
            leaderboardTableBody.innerHTML = '<tr><td colspan="13" class="info-message" style="text-align: center; padding: 20px;">No hay jugadores en el ranking aún.</td></tr>';
        }

    } catch (error) {
        console.error('Error al cargar datos del Apps Script:', error);
        loadingDiv.style.display = 'none'; // Ocultar carga
        errorMessageDiv.style.display = 'block'; // Mostrar mensaje de error
    }
});
