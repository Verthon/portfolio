import AOS from 'aos';

AOS.init({
  duration: 800,
});


const btn = document.querySelector('.btn-my-work');
document.addEventListener('load', () => {
  btn.style.opacity = "1";
});

const menu = document.querySelector('#menu');
menu.addEventListener('click', () => {
  const ul = document.querySelector('#menu-ul');
  ul.style.display = (ul.style.display == 'flex') ? 'none' : 'flex';
});

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