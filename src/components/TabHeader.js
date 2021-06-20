import React from 'react'

const TabHeader = ({ data, activeHeader, handleClick }) => {
  const cssClass = `tab-header__item ${activeHeader}`
  return (
    <li className={cssClass} data-tab={data.tab} onClick={handleClick}>
      <h3 className="tab-header__title">{data.name}</h3>
      <p className="tab-header__content">{data.description}</p>
    </li>
  )
}

export default TabHeader
