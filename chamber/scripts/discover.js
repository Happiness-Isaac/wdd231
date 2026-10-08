import { places } from "../data/places.mjs";

const gallery = document.querySelector("#discover-gallery");
const visitMessage = document.querySelector("#visit-message");
const visitClose = document.querySelector("#visit-close");
const STORAGE_KEY = "discover-last-visit";

const displayPlaces = (items) => {
    if (!gallery) return;

    items.forEach((place, index) => {
        const card = document.createElement("article");
        card.className = `discover-card discover-card-${index + 1}`;

        const title = document.createElement("h2");
        title.textContent = place.name;

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.loading = "lazy";
        img.width = 300;
        img.height = 200;
        img.alt = `${place.name} in Lekki, Lagos`;
        img.src = place.imageurl;
        figure.appendChild(img);

        const address = document.createElement("address");
        address.textContent = place.address.trim();

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Learn More";
        button.setAttribute("aria-label", `Learn more about ${place.name}`);
        button.addEventListener("click", () => {
            window.open(place.url, "_blank", "noopener,noreferrer");
        });

        card.append(title, figure, address, description, button);
        gallery.appendChild(card);
    });
};

const displayVisitMessage = () => {
    if (!visitMessage) return;

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const now = Date.now();
    let lastVisit = 0;

    try {
        lastVisit = Number(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
        lastVisit = 0;
    }

    let message = "Welcome! Let us know if you have any questions.";

    if (lastVisit) {
        const days = Math.floor((now - lastVisit) / MS_PER_DAY);
        if (days < 1) {
            message = "Back so soon! Awesome!";
        } else {
            message = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
        }
    }

    visitMessage.querySelector(".visit-text").textContent = message;
    visitMessage.hidden = false;

    try {
        localStorage.setItem(STORAGE_KEY, String(now));
    } catch (error) {
        /* storage blocked; message still displays */
    }
};

if (visitClose && visitMessage) {
    visitClose.addEventListener("click", () => {
        visitMessage.hidden = true;
    });
}

displayPlaces(places);
displayVisitMessage();