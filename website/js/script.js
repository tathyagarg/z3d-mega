let last_scroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  let current_scroll = window.pageYOffset || document.documentElement.scrollTop;

  if (current_scroll > last_scroll) {
    navbar.style.top = '-11vh';
  } else {
    navbar.style.top = '1vh';
  }

  last_scroll = current_scroll;
});

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

