import './nav.js';

const params = new URLSearchParams(window.location.search);
const list = document.querySelector('#submitted');
const labels = { title: 'Movie title', genre: 'Genre', year: 'Release year', email: 'Email', comments: 'Why it belongs' };

const items = [...params.entries()]
    .filter(([, value]) => value.trim() !== '')
    .map(([key, value]) => {
        const label = labels[key] || key;
        const safe = document.createElement('span');
        safe.textContent = value;
        return `<div><dt>${label}</dt><dd>${safe.innerHTML}</dd></div>`;
    });

list.innerHTML = items.length ? items.join('') : '<p>No form data was found. <a href="queue.html#suggest">Go back to the form</a>.</p>';