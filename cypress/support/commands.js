// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-ajv-schema-validator';

Cypress.Commands.add('iframe', (selector) => {
    cy.get(selector).its("0.contentDocument.body").should("not.be.empty").then((body) => cy.wrap(body));
});

Cypress.Commands.add('login', (username, password) => {
  cy.session(username,() => {
  cy.visit(Cypress.env("prestashop_url")+'login?back=my-account');
  cy.get('.form-control[name="email"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('.form-footer .btn').click();
  }, {
    validate() {
      cy.visit(Cypress.env("prestashop_url"))
      cy.get('.account').should('contain', 'Cla')
  }
})
});