import './nav.js';
import { getMovies, getQueue, toggleQueue } from './data.js';
import { renderCards, openModal } from './display.js';

const grid = document.querySelector('#top-picks');
let movies = [];

function show() {
    const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 6);
    renderCards(grid, topRated, getQueue());
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