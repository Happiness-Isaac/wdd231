const hamBtn = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

// Toggle the show class off and on
hamBtn.addEventListener('click', () => {
    navBar.classList.toggle('show');
    hamBtn.classList.toggle('show');
});