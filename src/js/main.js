
const btn = document.querySelector('.btn-my-work');
document.addEventListener('load', () => {
  btn.style.opacity = "1";
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