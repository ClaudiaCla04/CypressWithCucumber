import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open my iframe web", () => {
   cy.visit(Cypress.env("iframe_url"));
})

When("I click on {string} section inside the iframe", (section) => {
    cy.intercept('https://webdriveruniversity.com/Page-Object-Model/products.html').as('getProducts');
    cy.iframe('#frame').find('.navbar-nav').children().eq(1).should('have.text', section).click();
    cy.wait('@getProducts').its('response.statusCode').should('equal', 200);
})

Then("Our Products section opens as expected", (datatable) => {
    datatable.hashes().forEach((titles) => {
        cy.iframe('#frame').find('.section-title').should('contain.text', titles.section)
    })
})