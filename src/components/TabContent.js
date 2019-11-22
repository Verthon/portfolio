import React from 'react'

const TabContent = ({ item }) => {
  return (
    <div className='tab-column'>
      <h3 className='tab-content-heading'>{item.title}</h3>
      <ul className='tab-list'>
        {item.tech.map(item => (
          <li key={item} className='tab-item'>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TabContent
