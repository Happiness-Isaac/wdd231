(function () {
    const STORAGE_KEY = 'cse-theme';

    function getInitialTheme() {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);

        const button = document.querySelector('.theme-toggle');
        if (button) {
            const nextTheme = theme === 'dark' ? 'light' : 'dark';
            button.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
            button.setAttribute('title', `Switch to ${nextTheme} mode`);
        }
    }

    function createToggleButton(headerPage) {
        if (!headerPage || headerPage.querySelector('.theme-toggle')) {
            return;
        }

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'theme-toggle';
        button.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });

        headerPage.appendChild(button);
    }

    function initThemeToggle() {
        const initialTheme = getInitialTheme();
        setTheme(initialTheme);

        const headerPage = document.querySelector('header .page');
        createToggleButton(headerPage);
        setTheme(initialTheme);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
})();