// ¡IMPORTANTE! Reemplaza esta URL con la URL de TU Google Apps Script que copiaste al implementar
const GOOGLE_APPS_SCRIPT_RESULTS_URL = 'https://script.google.com/macros/s/AKfycbwGSDUq4X-u2Q0y8t7Zf9qWj8kP3l2b6c7d8e9f0g1h2i3j4k5l6m7n8o9p/exec'; // ASEGÚRATE QUE ESTA SEA TU URL FINAL Y CORRECTA

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
            { id: 'posicion', text: 'POSICIÓN' }, // Usamos texto completo para que se vea bien rotado
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
                // Asegúrate de que las celdas iniciales tienen su data-label para responsividad móvil
                row.innerHTML = `
                    <td data-label="Posición">${index + 1}</td>
                    <td data-label="Jugador">${player.nombre}</td>
                    <td data-label="Puntos">${player.puntos}</td>
                `;

                // Añadir los pronósticos detallados (con acierto/error)
                // Usamos un Map para acceder rápidamente a los pronósticos por ID de partido
                const playerPronosticosMap = new Map();
                if (player.pronosticosDetalle && Array.isArray(player.pronosticosDetalle)) {
                    player.pronosticosDetalle.forEach(p => {
                        playerPronosticosMap.set(p.id_partido, p);
                    });
                }

                if (data.partidos && Array.isArray(data.partidos)) {
                    data.partidos.forEach((partido) => {
                        const td = document.createElement('td');
                        td.classList.add('player-prediction-cell'); // Para aplicar estilos a la celda
                        
                        const p = playerPronosticosMap.get(partido.id); // Obtener el pronóstico para este partido
                        
                        let classToApply = '';
                        let displayChar = '_'; // Por defecto: no pronosticado
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
                        } else { 
                             // Si no existe el pronóstico para este partido en player.pronosticosDetalle
                             // Esto podría ocurrir si el jugador envió la quiniela antes de que se agregara este partido.
                             // O si la estructura de datos es inconsistente.
                             classToApply = 'no-pronosticado';
                             displayChar = '_';
                             icon = '';
                        }
                        
                        // Envuelve el pronóstico en un span con la clase para el color/icono
                        td.innerHTML = `<span class="pronostico-individual ${classToApply}">${displayChar}${icon}</span>`;
                        td.setAttribute('data-label', `P${partido.id}`); // Para responsividad móvil: P1, P2, etc.
                        row.appendChild(td);
                    });
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
