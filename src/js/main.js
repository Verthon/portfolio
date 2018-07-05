import AOS from 'aos';
//import menu from './modules/menu'

AOS.init({
  duration: 1100,
});

// Animation of btn-my-work
const btn = document.querySelector('.btn-my-work');
document.addEventListener('load', () => {
  btn.style.opacity = "1";
});

// Responsive menu hamburger
const menu = document.querySelector('#menu');
menu.addEventListener('click', () => {
  const menu = document.querySelector('.menu-ul');
  menu.classList.toggle('menu-ul-mobile');
});

//Menu scroll to element
const menuSkills = document.querySelector('#menu-skills');
const skills = document.querySelector('#skills');
menuSkills.addEventListener('click', () => {
  skills.scrollIntoView({alignToTop: true, behavior: "smooth"});
});

const menuAbout = document.querySelector('#menu-about');
const about = document.querySelector('#about');
menuAbout.addEventListener('click', () => {
  about.scrollIntoView({alignToTop: true, behavior: "smooth"});
});

const menuProjects = document.querySelector('#menu-projects');
const projects = document.querySelector('#projects');
menuProjects.addEventListener('click', () => {
  projects.scrollIntoView({alignToTop: true, behavior: "smooth", block:"start"});
});

const menuContact = document.querySelector('#menu-contact');
const contact = document.querySelector('#contact');
menuContact.addEventListener('click', () => {
  contact.scrollIntoView({alignToTop: true, behavior: "smooth"});
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
const other = document.querySelector('.tab-header-item[data-tab="tools"]');
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