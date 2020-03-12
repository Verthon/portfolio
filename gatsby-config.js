const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Krzysztof Sordyl Frontend Developer',
    description:
      'Welcome, my name is Krzysztof Sordyl frontend developer living in Bielsko-Biała, Poland. I"m creating solid, modern and well-designed websites. React enthusiast. Software, programming Bielsko-Biała',
    author: 'Krzysztof Sordyl',
    bio:
      'I am a developer living in Bielsko-Biała, Poland. I build websites and web apps particularly, I specialize in frontend development React.js, SCSS, modern JavaScript. Currently learning Typescript, Ionic and Redux.',
    twitterSlug: '@chsordyl',
    position: 'Frontend Developer',
    about:
      'I am a developer living in Bielsko-Biała, Poland. I build websites and web apps particularly, I specialize in frontend development React.js, SCSS, modern JavaScript. Currently learning Typescript, PostgreSQL and Node.js.',
    linkedin: 'https://www.linkedin.com/in/krzysztof-sordyl/',
    github: 'https://github.com/Verthon',
    email: 'christopher.sordyl@gmail.com',
    quote: {
      author: 'Thomas Huxley',
      content:
        'Try to learn something about everything and everything about something.',
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Krzysztof Sordyl frontend developer from Bielsko Biała, Poland',
        short_name: 'Krzysztof Sordyl portfolio',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/android-chrome-192x192.png',
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
  ],
}
