// Hamburger menu toggle and footer year.
const toggle = document.querySelector('#menu-toggle');
const menu = document.querySelector('#primary-nav');

toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? '\u2715' : '\u2630';
});

document.querySelector('#year').textContent = new Date().getFullYear();