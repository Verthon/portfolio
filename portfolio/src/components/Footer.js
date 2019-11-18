import React from "react"
import { Link } from 'gatsby'
import PropTypes from "prop-types"

const Footer = props => {
  return (
    <footer class="site-footer">
      <div class="footer-socials">
        <Link
          to="https://github.com/Verthon"
          target="_blank"
          rel="noopener"
          aria-label="Link to Verthon GitHub profile"
        >
          <i class="fa fa-github fa-lg" aria-hidden="true"></i>
        </Link>
        <Link
          to="https://www.linkedin.com/in/krzysztof-sordyl/"
          target="_blank"
          rel="noopener"
          aria-label="Krzysztof Sordyl linkedin profile"
        >
          <i class="fa fa-linkedin fa-lg" aria-hidden="true"></i>
        </Link>
      </div>
      <p class="site-footer__text">
        Krzysztof Sordyl portfolio 2019 ©{" "}
        <Link
          to="https://loading.io/"
          target="_blank"
          rel="noopener"
        >
          Background by:{" "}
          <span class="site-footer__text--color">loading.io</span>
        </Link>
      </p>
    </footer>
  )
}

Footer.propTypes = {}

export default Footer
