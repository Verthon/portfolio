/// <reference types="cypress" />
describe("dark mode", () => {
  it("should change the tab to general once its clicked in dark mode", () => {
    cy.visit("/");
    cy.get("[data-cy=theme-toggler]").click();
    cy.get("[data-cy=tab-header]").contains("General").click();
    cy.get("[data-cy=tab-content]").contains("Soft skills").should('be.visible');
  })

  it("should change the tab to general once its clicked and go back if frontend is clicked again in dark mode", () => {
    cy.visit("/");
    cy.get("[data-cy=theme-toggler]").click();
    cy.get("[data-cy=tab-header]").contains("General").click();
    cy.get("[data-cy=tab-content]").contains("Soft skills").should('be.visible');
    cy.get("[data-cy=tab-header]").contains("Frontend").click();
    cy.get("[data-cy=tab-content]").contains("JavaScript").should('be.visible');
  })
})