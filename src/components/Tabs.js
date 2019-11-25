import React from 'react'
import TabHeader from './TabHeader'
import TabContent from './TabContent'

class Tabs extends React.Component {
  constructor() {
    super()
    this.mobile = 769
    this.frontendTab = React.createRef()
    this.backendTab = React.createRef()
    this.toolsTab = React.createRef()
    this.state = {
      activeTab: 'frontend'
    }
  }

  

  scrollToContent = content => {
    content.current.scrollIntoView({
      alignToTop: true,
      behavior: 'smooth'
    })
  }

  getCurrentTab = type => {
    switch (type) {
      case 'frontend':
        this.scrollToContent(this.frontendTab)
        break
      case 'backend':
        this.scrollToContent(this.backendTab)
        break
      case 'tools':
        this.scrollToContent(this.toolsTab)
        break
      default:
        break
    }
  }

  handleHeaderChange = e => {
    const header = e.currentTarget.getAttribute('data-tab')
    this.setState({ activeTab: header }, () => {
      if (window.innerWidth < this.mobile) {
        this.getCurrentTab(header)
      }
    })
  }

  render() {
    const { headers, content } = this.props
    const { activeTab } = this.state
    const contentCssActiveClass = `tab-content-item active-tab animated fadeIn`
    return (
      <div className="row">
        <ul className="tab-header" data-aos="fade-down">
          {headers.map(header =>
            activeTab === header.tab ? (
              <TabHeader
                key={header.name}
                data={header}
                activeHeader="active-header"
                handleClick={this.handleHeaderChange}
              />
            ) : (
              <TabHeader
                key={header.name}
                data={header}
                activeHeader={''}
                handleClick={this.handleHeaderChange}
              />
            )
          )}
        </ul>
        <article className="tab-content">
          <div
            ref={this.frontendTab}
            className={
              activeTab === 'frontend'
                ? contentCssActiveClass
                : 'tab-content-item'
            }
          >
            {content[0].map(column => (
              <TabContent key={column.title} item={column} />
            ))}
          </div>
          <div
            ref={this.backendTab}
            className={
              activeTab === 'backend'
                ? contentCssActiveClass
                : 'tab-content-item'
            }
          >
            {content[1].map(column => (
              <TabContent key={column.title} item={column} />
            ))}
          </div>
          <div
            ref={this.toolsTab}
            className={
              activeTab === 'tools' ? contentCssActiveClass : 'tab-content-item'
            }
          >
            {content[2].map(column => (
              <TabContent key={column.title} item={column} />
            ))}
          </div>
        </article>
      </div>
    )
  }
}

export default Tabs
