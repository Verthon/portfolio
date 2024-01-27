import ThemeToggler from './theme-toggler'

describe('ThemeToggler', () => {
  it('should by default has system theme selected', () => {
    cy.mount(<ThemeToggler />)

    cy.contains(/system theme/i).should('be.visible')
  })

  it('should allow to change the theme to dark one', () => {
    cy.mount(<ThemeToggler />)

    cy.get('select').select('Dark theme')

    cy.contains(/dark theme/i).should('be.visible')
  })
})
