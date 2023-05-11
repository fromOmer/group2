const button = document.querySelector('.button');
const url = button.getAttribute('data-url');

button.addEventListener('click', function() {
  window.open(url);
});