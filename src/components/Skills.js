import PropTypes from 'prop-types'
import React from 'react'
import Tabs from './Tabs'

const Skills = React.forwardRef((props, ref) => {
  const headers = [
    {
      name: 'Frontend',
      description:
        'Building responsive websites and web apps based on design projects. SEO optimalization. Creating React based frontend.',
      tab: 'frontend'
    },
    {
      name: 'Backend',
      description:
        'Hands on experience server side programming. Basic understanding of Node.js and relational databases.',
      tab: 'backend'
    },
    {
      name: 'Other tools',
      description: 'Rest of the tools used in my projects',
      tab: 'tools'
    }
  ]

  const content = [
    [
      {
        title: 'HTML & CSS',
        tech: [
          'HTML5, CSS3, Sass',
          'Bootstrap 3 & 4',
          'Methodology: BEM',
          'Responsive Web Design'
        ]
      },
      {
        title: 'JavaScript',
        tech: [
          'Solid knowledge of JavaScript ES6, React.js',
          'Familiar with Redux',
          'Basic understanding of OOP and functional programming',
          'Experience with AJAX and API integration'
        ]
      },
      {
        title: 'Tools and CMS',
        tech: [
          'Experience with Wordpress CMS',
          'Hands on experience with Gatsby',
          'Gulp.js, npm, webpack, eslint',
          'Familiar with GIT version control system'
        ]
      }
    ],
    [
      {
        title: 'Backend',
        tech: [
          'Hands on experience server side programming',
          'Basics of Node.js and Express.js',
          'Knowledge about HTTP and REST',
          'Basic understanding about MVC pattern'
        ]
      },
      {
        title: 'Databases',
        tech: [
          'Basics of SQL relational databases',
          'Familiar with Firestore and MongoDB',
          'Currently learning more about SQL'
        ]
      },
      {
        title: 'Tools',
        tech: ['PHPMYAdmin', 'Basics of socket.io', 'Postman']
      }
    ],
    [
      {
        title: 'Services',
        tech: ['JS Bin', 'Codepen', 'GitHub', 'Netlify']
      },
      {
        title: 'Programs',
        tech: ['AdobeXD basics', 'VSCode', 'Trello']
      }
    ]
  ]
  return (
    <section ref={ref} id='skills' className='section section--skills'>
      <div className='container'>
        <h2 className='section__heading'>Skills</h2>
        <blockquote className='section__quote'>
          "Try to learn something about everything and everything about
          something."
          <footer className='section__quote-author'>Thomas Huxley</footer>
        </blockquote>
        <Tabs headers={headers} content={content} />
      </div>
    </section>
  )
})

Skills.propTypes = {
  siteTitle: PropTypes.string
}

Skills.defaultProps = {
  siteTitle: ''
}

export default Skills
