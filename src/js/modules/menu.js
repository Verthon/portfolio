const menu = () => {
  const menu = document.querySelector('#menu');
  menu.addEventListener('click', () => {
  const menu = document.querySelector('.menu-container');
  menu.classList.toggle('menu-container-mobile');
});
}

export default menu;