// ¡IMPORTANTE! Reemplaza esta URL con la URL de TU Google Apps Script que copiaste al implementar
const GOOGLE_APPS_SCRIPT_RESULTS_URL = 'https://script.google.com/macros/s/AKfycbwGSDiUzGXSeSnWlsS0XIPGhs-8V6ZoTBEzlN-gSlyiHrL2f3u1R8EyY4aDRTpo8u7g/exec'; // Tu URL actual.

let allRankingData = []; // Variable para almacenar todos los datos del ranking

document.addEventListener('DOMContentLoaded', async () => {
    const loadingDiv = document.getElementById('loading');
    const errorMessageDiv = document.getElementById('error-message');
    const leaderboardTableHeadRow = document.querySelector('#leaderboard-table thead tr');
    const leaderboardTableBody = document.querySelector('#leaderboard-table tbody');
    const officialResultsContainer = document.getElementById('official-results-container');
    const searchInput = document.getElementById('searchInput'); // Referencia al input de búsqueda
    // const searchButton = document.getElementById('searchButton'); // Si decides usar un botón

    loadingDiv.style.display = 'block';
    errorMessageDiv.style.display = 'none';

    try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_RESULTS_URL);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}. Detalles: ${errorText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos del Apps Script:', data);

        if (data.error) {
            throw new Error(data.error);
        }

        loadingDiv.style.display = 'none';

        // --- 1. Mostrar Partidos y Resultados Oficiales (como tarjetas/items) ---
        officialResultsContainer.innerHTML = '';
        if (data.partidos && data.partidos.length > 0) {
            data.partidos.forEach(partido => {
                let resultadoDisplay = 'Pendiente';
                let resultadoClass = 'sin-resultado';

                if (partido.ganador_real) {
                    switch (partido.ganador_real.toUpperCase()) {
                        case 'L':
                            resultadoClass = 'resultado-local-gana';
                            resultadoDisplay = partido.local;
                            break;
                        case 'V':
                            resultadoClass = 'resultado-visitante-gana';
                            resultadoDisplay = partido.visitante;
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
                partidoItem.classList.add('partido-item');
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
        const existingGameHeaders = leaderboardTableHeadRow.querySelectorAll('[data-game-header]');
        existingGameHeaders.forEach(th => th.remove());

        if (data.partidos && data.partidos.length > 0) {
            data.partidos.forEach((partido) => {
                const th = document.createElement('th');
                th.setAttribute('data-game-header', true);
                th.textContent = `P${partido.id}`; // Solo P1, P2, etc.
                leaderboardTableHeadRow.appendChild(th);
            });
        }

        // --- 3. Rellenar el Ranking (Leaderboard) y almacenar los datos ---
        allRankingData = data.ranking || []; // Almacenar todos los datos del ranking
        displayRanking(allRankingData); // Mostrar el ranking inicial

        // --- 4. Añadir Listener para la búsqueda ---
        searchInput.addEventListener('keyup', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredRanking = allRankingData.filter(player => 
                player.nombre.toLowerCase().includes(searchTerm)
            );
            displayRanking(filteredRanking); // Mostrar solo los resultados filtrados
        });

        // Si usas botón de búsqueda:
        // searchButton.addEventListener('click', () => {
        //     const searchTerm = searchInput.value.toLowerCase();
        //     const filteredRanking = allRankingData.filter(player => 
        //         player.nombre.toLowerCase().includes(searchTerm)
        //     );
        //     displayRanking(filteredRanking);
        // });

    } catch (error) {
        console.error('Error al cargar datos del Apps Script:', error);
        loadingDiv.style.display = 'none';
        errorMessageDiv.style.display = 'block';
    }
});

// Función para mostrar el ranking (reutilizable para filtros)
function displayRanking(rankingData) {
    const leaderboardTableBody = document.querySelector('#leaderboard-table tbody');
    leaderboardTableBody.innerHTML = ''; // Limpiar antes de re-renderizar

    if (rankingData.length > 0) {
        rankingData.forEach((player, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Posición">${index + 1}</td>
                <td data-label="Jugador">${player.nombre}</td>
                <td data-label="Puntos">${player.puntos}</td>
            `;

            if (player.pronosticosDetalle && Array.isArray(player.pronosticosDetalle)) {
                player.pronosticosDetalle.forEach(p => {
                    const td = document.createElement('td');
                    td.classList.add('player-prediction-cell');
                    
                    let classToApply = '';
                    let displayChar = p.prediccion;
                    let icon = '';

                    if (p.esAcierto) {
                        classToApply = 'acierto';
                        icon = '&#10003;';
                    } else if (p.prediccion === '_') {
                        classToApply = 'no-pronosticado';
                        icon = '';
                    } else {
                        classToApply = 'fallo';
                        icon = '&#10006;';
                    }
                    
                    td.innerHTML = `<span class="pronostico-individual ${classToApply}">${displayChar}${icon}</span>`;
                    td.setAttribute('data-label', `P${player.pronosticosDetalle.indexOf(p) + 1}`);
                    row.appendChild(td);
                });
            } else {
                // Si no hay pronosticosDetalle, añade celdas vacías o con N/D para mantener la estructura
                // Es importante obtener el número total de partidos para rellenar correctamente.
                // Podríamos pasar `data.partidos.length` a esta función o hacer que sea global.
                // Por simplicidad, asumamos que `data.partidos` es accesible o que ya tenemos los THs.
                // Para este caso, vamos a asumir que la estructura de la tabla ya está definida por los THs.
                const numPartidos = leaderboardTableHeadRow.querySelectorAll('[data-game-header]').length;
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
        leaderboardTableBody.innerHTML = '<tr><td colspan="13" class="info-message" style="text-align: center; padding: 20px;">No se encontraron jugadores con ese nombre.</td></tr>';
    }
}
