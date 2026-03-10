const hamButton = document.getElementById('hamButton');
const navigation = document.getElementById('nav');

hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('active');
    navigation.classList.toggle('active')
})