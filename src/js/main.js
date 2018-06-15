import AOS from 'aos';
//import menu from './modules/menu'

AOS.init({
  duration: 800,
});

// Animation of btn-my-work
const btn = document.querySelector('.btn-my-work');
document.addEventListener('load', () => {
  btn.style.opacity = "1";
});

// Responsive menu hamburger
const menu = document.querySelector('#menu');
menu.addEventListener('click', () => {
  const menu = document.querySelector('.menu-container');
  menu.classList.toggle('menu-container-mobile');
});

// Tabbed content

const tabsHeader = document.querySelectorAll('.tab-header-item');
const tabsContent = document.querySelectorAll('.tab-content-item');

const show = (i) =>{
  tabsContent.forEach((tab) => {
    tab.classList.remove('active');
  });
  tabsContent[i].classList.add('active', 'animated', 'fadeIn');
}

tabsHeader.forEach((item, i) => {
  item.addEventListener('click', () =>{
    show(i);
  });
});
show(0);

// Scroll to exact tab
const frontend = document.querySelector('.tab-header-item[data-tab="frontend"]');
const backend = document.querySelector('.tab-header-item[data-tab="backend');
const other = document.querySelector('.tab-header-item[data-tab="other"]');
const frontendTab = document.querySelector('#frontend');
const backendTab = document.querySelector('#backend');
const otherTab = document.querySelector('#other');

frontend.addEventListener('click', () => {
  frontendTab.scrollIntoView({alignToTop: true, behavior: "smooth"});
});

backend.addEventListener('click', () => {
  backendTab.scrollIntoView({alignToTop: true, behavior: "smooth"});
});

other.addEventListener('click', () => {
  otherTab.scrollIntoView({alignToTop: true, behavior: "smooth"});
});