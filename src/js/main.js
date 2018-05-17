const btn = document.querySelector('.btn-my-work');
document.addEventListener('load', () => {
  btn.style.opacity = "1";
});

const menu = document.querySelector('#menu');
menu.addEventListener('click', () => {
  const menu = document.querySelector('.menu-container');
  menu.classList.toggle('menu-container-mobile');
});