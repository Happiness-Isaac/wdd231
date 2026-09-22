// mobile nav
const navToggle = document.getElementById("nav-toggle");
const primaryNav = document.getElementById("primary-nav");

if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
}
// dark mode toggle
const themeToggle = document.getElementById("theme-toggle");

function setTheme(mode) {
    const isDark = mode === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    if (themeToggle) themeToggle.setAttribute("aria-pressed", String(isDark));
    localStorage.setItem("theme", mode);
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nowDark = !document.body.classList.contains("dark-mode");
        setTheme(nowDark ? "dark" : "light");
    });
}

setTheme(localStorage.getItem("theme") || "light");

// visit count
function trackVisits() {
    const banner = document.getElementById("visit-banner");
    const textEl = document.getElementById("visit-text");
    if (!banner || !textEl) return;

    const storedCount = Number(localStorage.getItem("visitCount")) || 0;
    const lastVisit = localStorage.getItem("lastVisit");
    const newCount = storedCount + 1;

    if (newCount === 1) {
        textEl.innerHTML =
            "Welcome to the Lekki Business Chamber. <strong>This is your first visit</strong> — take a look around.";
    } else {
        const days = lastVisit
            ? Math.floor((Date.now() - Number(lastVisit)) / 86400000)
            : null;

        let gap = "";
        if (days === 0) {
            gap = " You were last here earlier today.";
        } else if (days === 1) {
            gap = " You were last here yesterday.";
        } else if (days > 1) {
            gap = ` It has been ${days} days since your last visit.`;
        }

        textEl.innerHTML = `Welcome back! This is visit number <strong>${newCount}</strong>.${gap}`;
    }

    localStorage.setItem("visitCount", String(newCount));
    localStorage.setItem("lastVisit", String(Date.now()));
    banner.hidden = false;
}

trackVisits();

// footer
const yearEl = document.getElementById("current-year");
const modEl = document.getElementById("last-modified");
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl) modEl.textContent = document.lastModified;
