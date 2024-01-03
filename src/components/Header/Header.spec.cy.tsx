import { Header } from './Header'
import './Header.module.css'

describe('Header', () => {
  beforeEach(() => {
    localStorage.removeItem('dark-mode-enabled')
  })
  it('should change to dark theme', () => {
    cy.mount(<Header />)
    const themeToggler = cy.get('[data-cy=theme-toggler]')
    themeToggler.should('have.attr', 'title', 'Activate dark theme')
    themeToggler.click()
    themeToggler.should('have.attr', 'title', 'Activate light theme')
  })
})
