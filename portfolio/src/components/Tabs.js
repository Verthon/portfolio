import React from "react";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";

class Tabs extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: "frontend"
    };
  }

  handleHeaderChange = e => {
    const type = e.currentTarget.getAttribute("data-tab");
    this.setState({ activeTab: type });
  };

  render() {
    const { headers, content } = this.props;
    const { activeTab } = this.state;
    const contentCssActiveClass = `tab-content-item active-tab animated fadeIn`;
    return (
      <div className="row">
        <ul className="tab-header" data-aos='fade-down'>
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
            id="frontend"
            className={
              activeTab === "frontend"
                ? contentCssActiveClass
                : "tab-content-item"
            }
            // data-aos="fade-up"
          >
            {content[0].map(column => (
              <TabContent key={column.title} item={column} />
            ))}
          </div>
          <div
            id="backend"
            className={
              activeTab === "backend"
                ? contentCssActiveClass
                : "tab-content-item"
            }
            // data-aos="fade-up"
          >
            {content[1].map(column => (
              <TabContent key={column.title} item={column} />
            ))}
          </div>
          <div
            id="tools"
            className={
              activeTab === "tools" ? contentCssActiveClass : "tab-content-item"
            }
            // data-aos="fade-up"
          >
            {content[2].map(column => (
              <TabContent key={column.title} item={column} />
            ))}
          </div>
        </article>
      </div>
    );
  }
}

export default Tabs;
