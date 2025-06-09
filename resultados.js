// ¡IMPORTANTE! Reemplaza esta URL con la URL de TU Google Apps Script que copiaste al implementar
const GOOGLE_APPS_SCRIPT_RESULTS_URL = 'https://script.google.com/macros/s/AKfycbwGSDiUzGXSeSnWlsS0XIPGhs-8V6ZoTBEzlN-gSlyiHrL2f3u1R8EyY4aDRTpo8u7g/exec'; // ESTA ES LA URL QUE ME PROPORCIONASTE.

document.addEventListener('DOMContentLoaded', async () => {
    const loadingDiv = document.getElementById('loading');
    const errorMessageDiv = document.getElementById('error-message');
    const leaderboardTableBody = document.querySelector('#leaderboard-table tbody');
    const leaderboardTableHeader = document.querySelector('#leaderboard-table thead tr');
    const officialResultsGrid = document.getElementById('official-results-grid');

    loadingDiv.style.display = 'block'; // Mostrar mensaje de carga
    errorMessageDiv.style.display = 'none'; // Asegurarse de que el error no se muestre

    try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_RESULTS_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        loadingDiv.style.display = 'none'; // Ocultar mensaje de carga

        // --- 1. Mostrar Partidos y Resultados Oficiales ---
        officialResultsGrid.innerHTML = ''; // Limpiar el contenido anterior
        if (data.partidos && data.partidos.length > 0) {
            data.partidos.forEach(partido => {
                const partidoDiv = document.createElement('div');
                partidoDiv.classList.add('partido-oficial');
                const resultadoClass = (partido.ganador_real === 'L' || partido.ganador_real === 'E' || partido.ganador_real === 'V') ? '' : 'no-definido';

                partidoDiv.innerHTML = `
                    <div class="equipos">${partido.local} vs ${partido.visitante}</div>
                    <div class="resultado-oficial ${resultadoClass}">
                        ${partido.ganador_real || 'Pendiente'}
                    </div>
                `;
                officialResultsGrid.appendChild(partidoDiv);
            });
        } else {
            officialResultsGrid.innerHTML = '<p style="text-align: center; color: var(--text-light);">No hay partidos definidos o resultados oficiales aún.</p>';
        }


        // --- 2. Construir Encabezados de Partidos Dinámicamente en la Tabla ---
        // Agregar los encabezados P1, P2, ..., P10 a la tabla de ranking
        if (data.partidos && data.partidos.length > 0) {
            data.partidos.forEach((partido, index) => {
                const th = document.createElement('th');
                th.textContent = `P${partido.id}`; // Mostrar P1, P2, etc.
                leaderboardTableHeader.appendChild(th);
            });
        }


        // --- 3. Rellenar el Ranking (Leaderboard) ---
        leaderboardTableBody.innerHTML = ''; // Limpiar el contenido anterior
        if (data.ranking && data.ranking.length > 0) {
            data.ranking.forEach((player, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><span class="math-inline">\{index \+ 1\}</td\> <td\></span>{player.nombre}</td>
                    <td>${player.puntos}</td>
                `;
                // Añadir los pronósticos detallados (con acierto/error)
                player.pronosticosDetalle.forEach(p => {
                    const td = document.createElement('td');
                    td.classList.add('player-prediction');
                    let classToApply = '';
                    if (p.esAcierto) {
                        classToApply = 'acierto';
                        td.innerHTML = `<span class="<span class="math-inline">\{classToApply\}"\></span>{p.prediccion}&#10003;</span>`; // ✅
                    } else if (p.prediccion === '_') {
                        classToApply = 'no-pronosticado';
                        td.innerHTML = `<span class="<span class="math-inline">\{classToApply\}"\></span>{p.prediccion}</span>`; // _
                    } else {
                        classToApply = 'error';
                        td.innerHTML = `<span class="<span class="math-inline">\{classToApply\}"\></span>{p.prediccion}&#10006;</span>`; // ❌
                    }
                    row.appendChild(td);
                });
                leaderboardTableBody.appendChild(row);
            });
        } else {
            leaderboardTableBody.innerHTML = '<tr><td colspan="13" style="text-align: center; padding: 20px;">No hay jugadores en el ranking aún.</td></tr>';
        }

    } catch (error) {
        console.error('Error al cargar datos del Apps Script:', error);
        loadingDiv.style.display = 'none'; // Ocultar carga
        errorMessageDiv.style.display = 'block'; // Mostrar mensaje de error
    }
});
