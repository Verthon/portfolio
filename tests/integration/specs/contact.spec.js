/// <reference types="cypress" />

describe("contact section", () => {
  it("should show validation error when someone tries to submit without any data", () => {
    cy.visit("/");

    cy.get("[data-cy=contact-form]").within(() => {
      cy.get("input[name='name']")
    });

    cy.get("[data-cy=contact-form]").submit();
  })

  it("should send the email once all the required fields are set", () => {
    cy.visit("/");

    cy.get("[data-cy=contact-form]").within(() => {
      cy.get("input[name='name']").type("My mighty name");
    });

    cy.get("[data-cy=contact-form]").within(() => {
      cy.get("input[name='email']").type("mightyemail@test.pl");
    });

    cy.get("[data-cy=contact-form]").within(() => {
      cy.get("textarea[name='message']").type("My additional important message");
    });

    cy.intercept('POST', 'https://formspree.io/mzbjzzek', { statusCode: 200, body: { ok: true }}).as(
      'sendEmail'
    )
    cy.get("[data-cy=contact-form]").submit();
  })
})