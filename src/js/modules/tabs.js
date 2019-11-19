const tabs = () => {
  const tabsHeader = document.querySelectorAll('.tab-header-item')

  const tabsContent = document.querySelectorAll('.tab-content-item')

  const show = (i) => {
    tabsContent.forEach((tab) => {
      tab.classList.remove('active')
    })
    tabsContent[i].classList.add('active')
  }

  tabsHeader.forEach((item, i) => {
    item.addEventListener('click', () => {
      show(i)
    })
  })
  show(0)
}

export default tabs
