import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on landing page", () => {
  cy.visit(Cypress.env("streamo_url"));
})

When("I click on sign in button", () => {
    cy.get('.right-sidebar .text-white').click();
})

Then("login page opens as expected", () => {
    cy.origin("https://authentication-server-gl2nzwfaqq-ey.a.run.app/login", () => {
        cy.url().should('include', 'app/login');
        cy.get('.login-btn').should('have.text', 'Login');
        cy.get('#email').should('be.visible');
        cy.get('#passwordNewInput').should('be.visible');
    })
})