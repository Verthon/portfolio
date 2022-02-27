import * as React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import '../styles/style.css'
import "../styles/variables.css"
import { HomePageContent } from '../components/HomePageContent/HomePageContent'
import { ScrollProvider } from '../providers/scroll/ScrollProvider'

const IndexPage = () => {

  React.useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    })
  }, [])

  return (
    <React.StrictMode>
      <ScrollProvider>
        <HomePageContent />
      </ScrollProvider>

    </React.StrictMode>
  )
}

export default IndexPage
