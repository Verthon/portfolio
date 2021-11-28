const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Krzysztof Sordyl Frontend Developer',
    description:
      'Welcome, my name is Krzysztof Sordyl frontend developer living in Bielsko-Biała, Poland. I"m creating solid, modern and well-designed websites. React enthusiast. Software, programming Bielsko-Biała',
    author: 'Krzysztof Sordyl',
    bio: 'I am a frontend developer living in Bielsko-Biała, Poland. I build websites and web apps particularly, I specialize in frontend development React.js, mobile first web applications and creating modern user intefaces.',
    twitterSlug: '@chsordyl',
    position:
      'Frontend developer passionate about React.js ecosystem, focused on creating modern web apps.',
    location: 'Based in Bielsko-Biała, Poland ⛰️',
    about:
      'I am a frontend developer living in Bielsko-Biała, Poland. I build websites and web apps particularly, I specialize in frontend development React.js, mobile first web applications and creating modern user intefaces.',
    linkedin: 'https://www.linkedin.com/in/krzysztof-sordyl/',
    github: 'https://github.com/Verthon',
    email: 'christopher.sordyl@gmail.com',
    quote: {
      author: 'Thomas Huxley',
      content:
        'Try to learn something about everything and everything about something.',
    },
    lang: 'en',
    projects: [
      {
        name: "Alkinoos Taverna",
        technologies: ["Next.js", "GraphQL", "Hasura", "Typescript"],
        description: "Responsive, progressive web app for small restaurants, with integrated simple booking system and basic administration tools for the staff.",
        github: "https://github.com/Verthon/restaurant-app",
        live: "https://alkinoos-taverna.vercel.app/",
        animation: "slide-right"
      },
      {
        name: "Eventoo",
        technologies: ["Ionic 4", "Redux Toolkit", "Firestore"],
        description: "Mobile application for event management. Within Eventoo you can create and administer your own events.",
        github: "https://github.com/Verthon/event-app",
        live: "https://eventooo.netlify.app/",
        animation: "slide-left"
      }
    ],
    tabsHeaders: [
      {
        name: "Frontend",
        description: "Building responsive web apps and mobile apps based on design projects. Creating React/Vue based frontend.",
        tab: "frontend"
      },
      {
        name: "General",
        description: "Effectively work within a team of other engineers, as well as Product Owner, designers, and QA engineers.",
        tab: "general"
      }
    ],
    tabsContent: [
      [
        {
          title: "JavaScript",
          tech: [
            "Working experience with JavaScript ES6+ and Typescript",
            "Familiar with React.js, Next.js, Gatsby.js",
            "Hands on experience with Redux Toolkit and Context API",
            "Experience with writing tests - Jest, React Testing Library, Cypress",
            "Hands on experience with Vue.js and Vuex / Pinia",
            "Working experience with SPAs based on Rest APIs",
            "Familiar with tooling: webpack, eslint"
          ]
        },
        {
          title: "Universal",
          tech: [
            "HTML5, CSS3, Sass, Styled Components",
            "Real world experience with GIT version control system",
            "Proficient with RWD and UI/UX, decent eye for the detail",
            "Familiar with BEM methodology",
            "Basic understanding of Tailwind CSS",
            "Hands on experience with Wordpress and Sanity CMS",
            "Familiar with SEO principles and Core Web Vitals",
            "Basics of the GraphQL with Apollo",
            "Basics of Figma prototyping"
          ]
        }
      ],
      [
        {
          title: "Soft skills",
          tech: [
            "Experience with Agile/Scrum methodology",
            "Good communication skills",
            "Experience in working directly with a clients",
            "Familiar with working as a remote developer",
            "Ability to learn on my own",
            "Familiar with creating an own knowledge base on Notion"
          ]
        },
        {
          title: "Backend",
          tech: [
            "Familiar with Firestore and Supabase",
            "Hands on experience on Hasura",
            "Basics of Node.js and Express.js",
            "Knowledge about HTTP and REST",
            "Hands on experience with Postman",
            "Basics of PostgreSQL"
          ]
        }
      ]
    ],
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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'fonts',
        path: `${__dirname}/src/fonts/`,
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
        background_color: '#a9dddb',
        theme_color: '#a9dddb',
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
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
}
