import React from 'react'

const TabHeader = ({ data, activeHeader, handleClick }) => {
  const cssClass = `tab-header-item ${activeHeader}`
  return (
    <li
      className={cssClass}
      data-tab={data.tab}
      onClick={handleClick}
    >
      <h2 className='tab-header__title'>{data.name}</h2>
      <p className='tab-header__content'>{data.description}</p>
    </li>
  )
}

export default TabHeader
