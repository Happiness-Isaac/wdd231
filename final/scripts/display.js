// Card rendering and the movie details modal.
export function cardTemplate(movie, queued) {
    const genreClass = movie.genre.toLowerCase().replace(/[^a-z]/g, '');
    return `
        <article class="card">
            <div class="poster poster-${genreClass}" aria-hidden="true">
                <img src="${movie.poster}" alt="" width="300" height="450" loading="lazy">
                <span class="poster-title">${movie.title}</span>
            </div>
            <div class="card-body">
                <h3>${movie.title}</h3>
                <p class="meta">${movie.year} &bull; ${movie.genre} &bull; ${movie.runtime} min</p>
                <p class="rating">Rating: ${movie.rating.toFixed(1)} / 10</p>
                <div class="card-actions">
                    <button type="button" class="btn btn-secondary" data-details="${movie.id}">Details</button>
                    <button type="button" class="btn" data-queue="${movie.id}" aria-pressed="${queued}">
                        ${queued ? 'In queue' : 'Add to queue'}
                    </button>
                </div>
            </div>
        </article>`;
}

let firstRender = true;

export function renderCards(container, movies, queue) {
    // Only animate the cards the first time they appear, not on every filter or queue click.
    container.classList.toggle('animate', firstRender);
    firstRender = false;
    container.innerHTML = movies.length
        ? movies.map((movie) => cardTemplate(movie, queue.includes(movie.id))).join('')
        : '<p class="empty">No movies match those filters. Try a different genre or rating.</p>';

    // If a poster file is missing, remove it so the gradient and title show instead.
    container.querySelectorAll('.poster img').forEach((img) => {
        img.addEventListener('error', () => img.remove());
    });
}

const dialog = document.querySelector('#movie-dialog');

export function openModal(movie) {
    const content = dialog?.querySelector('.dialog-content');
    if (!dialog || !content) return;
    const trailer = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' ' + movie.year + ' official trailer')}`;
    content.innerHTML = `
        <h2 id="dialog-title">${movie.title}</h2>
        <p class="meta">${movie.year} &bull; ${movie.genre} &bull; ${movie.runtime} min</p>
        <p>${movie.description}</p>
        <ul class="details">
            <li><strong>Director:</strong> ${movie.director}</li>
            <li><strong>Rating:</strong> ${movie.rating.toFixed(1)} / 10</li>
        </ul>
        <a class="btn" href="${trailer}" target="_blank" rel="noopener noreferrer">Watch trailer (opens YouTube)</a>`;
    dialog.showModal();
}

if (dialog) {
    dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
    });
}