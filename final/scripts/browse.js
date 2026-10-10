import './nav.js';
import { getMovies, getQueue, toggleQueue, getSavedGenre, saveGenre } from './data.js';
import { renderCards, openModal } from './display.js';

const grid = document.querySelector('#movie-grid');
const genreSelect = document.querySelector('#genre');
const ratingSelect = document.querySelector('#min-rating');
const sortSelect = document.querySelector('#sort');
const count = document.querySelector('#result-count');

let movies = [];

function update() {
    const genre = genreSelect.value;
    const minRating = Number(ratingSelect.value);

    const results = movies
        .filter((m) => (genre === 'all' || m.genre === genre) && m.rating >= minRating)
        .sort((a, b) => (sortSelect.value === 'title' ? a.title.localeCompare(b.title) : b.rating - a.rating));

    renderCards(grid, results, getQueue());
    count.textContent = `Showing ${results.length} of ${movies.length} movies`;
}

movies = await getMovies();

const genres = [...new Set(movies.map((m) => m.genre))].sort();
genreSelect.innerHTML += genres.map((g) => `<option value="${g}">${g}</option>`).join('');
genreSelect.value = getSavedGenre();
if (genreSelect.value !== getSavedGenre()) genreSelect.value = 'all';

genreSelect.addEventListener('change', () => {
    saveGenre(genreSelect.value);
    update();
});
ratingSelect.addEventListener('change', update);
sortSelect.addEventListener('change', update);

grid.addEventListener('click', (event) => {
    const detailsId = event.target.dataset.details;
    const queueId = event.target.dataset.queue;
    if (detailsId) openModal(movies.find((m) => m.id === Number(detailsId)));
    if (queueId) {
        toggleQueue(Number(queueId));
        update();
    }
});

update();