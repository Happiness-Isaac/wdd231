import './nav.js';
import { getMovies, getQueue, toggleQueue } from './data.js';
import { renderCards, openModal } from './display.js';

const grid = document.querySelector('#queue-grid');
const summary = document.querySelector('#queue-summary');
let movies = [];

function show() {
    const queue = getQueue();
    const saved = movies.filter((m) => queue.includes(m.id));
    const minutes = saved.reduce((total, m) => total + m.runtime, 0);

    if (saved.length === 0) {
        grid.innerHTML = '<p class="empty">Your queue is empty. Browse movies and choose "Add to queue" to build your list.</p>';
        summary.textContent = '';
        return;
    }
    renderCards(grid, saved, queue);
    summary.textContent = `${saved.length} movies, about ${Math.floor(minutes / 60)} hours ${minutes % 60} minutes of viewing.`;
}

grid.addEventListener('click', (event) => {
    const detailsId = event.target.dataset.details;
    const queueId = event.target.dataset.queue;
    if (detailsId) openModal(movies.find((m) => m.id === Number(detailsId)));
    if (queueId) {
        toggleQueue(Number(queueId));
        show();
    }
});

movies = await getMovies();
show();