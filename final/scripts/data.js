// Movie data (local JSON plus TMDB posters) and local storage helpers.
import { TMDB_KEY } from './config.js';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w185';
const POSTER_CACHE_KEY = 'filmquee-posters';

// Fetches the movie list from the local JSON file, then adds posters from TMDB.
export async function getMovies() {
    try {
        const response = await fetch('data/movies.json');
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const movies = await response.json();
        return await addPosters(movies);
    } catch (error) {
        console.error('Could not load movies:', error);
        return [];
    }
}

// Looks up one poster on TMDB by title and release year.
async function findPoster(movie) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(movie.title)}&year=${movie.year}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`TMDB request failed with status ${response.status}`);
    }
    const data = await response.json();
    const path = data.results?.[0]?.poster_path;
    return path ? `${IMAGE_BASE}${path}` : '';
}

// Adds a poster link to every movie. Found links are cached in local storage,
// so TMDB is only asked once per movie.
async function addPosters(movies) {
    if (!TMDB_KEY || TMDB_KEY.startsWith('PASTE')) {
        return movies;
    }

    let cache = {};
    try {
        cache = JSON.parse(localStorage.getItem(POSTER_CACHE_KEY)) || {};
    } catch {
        cache = {};
    }

    const missing = movies.filter((movie) => !cache[movie.id]);
    await Promise.all(
        missing.map(async (movie) => {
            try {
                const poster = await findPoster(movie);
                if (poster) cache[movie.id] = poster;
            } catch (error) {
                console.warn(`No poster for ${movie.title}:`, error.message);
            }
        })
    );

    localStorage.setItem(POSTER_CACHE_KEY, JSON.stringify(cache));
    return movies.map((movie) => ({ ...movie, poster: cache[movie.id] || '' }));
}

// Local storage helpers for the viewing queue and the saved genre filter.
const QUEUE_KEY = 'filmquee-queue';
const GENRE_KEY = 'filmquee-genre';

export function getQueue() {
    try {
        return JSON.parse(localStorage.getItem(QUEUE_KEY)) || [];
    } catch {
        return [];
    }
}

export function toggleQueue(id) {
    const queue = getQueue();
    const updated = queue.includes(id) ? queue.filter((item) => item !== id) : [...queue, id];
    localStorage.setItem(QUEUE_KEY, JSON.stringify(updated));
    return updated;
}

export function getSavedGenre() {
    return localStorage.getItem(GENRE_KEY) || 'all';
}

export function saveGenre(genre) {
    localStorage.setItem(GENRE_KEY, genre);
}