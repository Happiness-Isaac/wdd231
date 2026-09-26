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