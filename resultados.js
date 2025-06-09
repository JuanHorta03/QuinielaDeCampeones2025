// ¡IMPORTANTE! Reemplaza esta URL con la URL de TU Google Apps Script que copiaste al implementar
const GOOGLE_APPS_SCRIPT_RESULTS_URL = 'https://script.google.com/macros/s/AKfycbwGSDiUzGXSeSnWlsS0XIPGhs-8V6ZoTBEzlN-gSlyiHrL2f3u1R8EyY4aDRTpo8u7g/exec'; // ESTA ES LA URL QUE ME PROPORCIONASTE.

document.addEventListener('DOMContentLoaded', async () => {
    const loadingDiv = document.getElementById('loading');
    const errorMessageDiv = document.getElementById('error-message');
    const leaderboardTableHeadRow = document.querySelector('#leaderboard-table thead tr');
    const leaderboardTableBody = document.querySelector('#leaderboard-table tbody');

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

        // --- 1. Construir Encabezados de Partidos Dinámicamente en la Tabla de Ranking ---
        // Vaciar todos los encabezados existentes para reconstruirlos
        leaderboardTableHeadRow.innerHTML = '';

        // Crear encabezados fijos (Posición, Jugador, Puntos) con contenido para rotar
        const headers = [
            { id: 'posicion', text: 'POS.' },
            { id: 'jugador', text: 'JUGADOR' },
            { id: 'puntos', text: 'PUNTOS' }
        ];

        headers.forEach(headerInfo => {
            const th = document.createElement('th');
            th.setAttribute('data-header-id', headerInfo.id); // Para estilos específicos
            th.innerHTML = `<div class="rotated-header-content">${headerInfo.text}</div>`;
            leaderboardTableHeadRow.appendChild(th);
        });

        // Añadir encabezados de partidos (P1, P2...)
        if (data.partidos && data.partidos.length > 0) {
            data.partidos.forEach((partido) => {
                const th = document.createElement('th');
                th.setAttribute('data-game-header', true); // Marcador para poder eliminarlos si se recarga
                
                let resultadoTexto = 'P'; // Default para Pendiente
                let resultadoClass = 'sin-resultado'; // Default para el encabezado

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

                // Contenido del encabezado para rotación (Resultado + Px)
                th.innerHTML = `
                    <div class="rotated-header-content">
                        <span class="${resultadoClass}">${resultadoTexto}</span><br>
                        P${partido.id}
                    </div>
                `;

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
                    data.partidos.forEach((partido, pIndex) => { // Iterar sobre los partidos para asegurar el orden
                        const td = document.createElement('td');
                        td.classList.add('player-prediction-cell'); // Para aplicar estilos a la celda
                        
                        const p = player.pronosticosDetalle.find(det => det.id_partido === partido.id);
                        
                        let classToApply = '';
                        let displayChar = '_'; // Por defecto, si no hay pronóstico
                        let icon = ''; // Para los íconos de acierto/error

                        if (p) { // Si hay pronóstico para este partido
                            displayChar = p.prediccion;
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
                        } else { // Si no hay pronóstico en detalle para este partido (debería tener _ si no pronosticó)
                             classToApply = 'no-pronosticado';
                             displayChar = '_';
                        }
                        
                        // Envuelve el pronóstico en un span con la clase para el color/icono
                        td.innerHTML = `<span class="pronostico-individual ${classToApply}">${displayChar}${icon}</span>`;
                        td.setAttribute('data-label', `P${partido.id}`); // Para responsividad móvil
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
