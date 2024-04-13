import { mount } from 'cypress-ct-qwik'
import ThemeToggler from './theme-toggler'

describe('ThemeToggler', () => {
  it('should by default has system theme selected', () => {
    //@ts-ignore
    mount(<ThemeToggler />)

    cy.contains(/system mode/i).should('be.visible')
  })

  it('should allow to change the theme to dark one', () => {
    //@ts-ignore
    mount(<ThemeToggler />)

    cy.get('select').select('Dark mode')

    cy.contains(/dark mode/i).should('be.visible')
  })
})
