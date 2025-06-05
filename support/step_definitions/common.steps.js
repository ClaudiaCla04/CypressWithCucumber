import { AfterAll, BeforeAll, After, Before } from "@badeball/cypress-cucumber-preprocessor";

After({ tags: "@cleanupDeleteNewArticleAdded" }, () => {
  cy.log("Running cleanup: Delete article");
  cy.get('@newTitle').then((newTitle) => {
    cy.request({
      method: 'DELETE',
      url: `https://conduit-api.bondaracademy.com/api/articles/${newTitle}-24649`,
      headers: { Authorization: "Token " + Cypress.env("token") }
     }).then((response) => {
      expect(response.status).to.equal(204)
    })
  })
})

After({ tags: "@cleanupRemoveItemFromCart" }, () => {
    cy.log("Running cleanup: Remove item from cart");
    cy.visit(Cypress.env("prestashop_url"));
    cy.get('#_desktop_cart').click();
    cy.get('#cart-subtotal-products').should('contain', 1);
    cy.get('.remove-from-cart').click();
    cy.get('#cart-subtotal-products').should('contain', 0);
  })

  BeforeAll({ tags: "@beforeAllMyTests" }, () => {
    cy.log("Running hooks: beforeAllMyTests");
  })

  Before({ tags: "@beforeOneAccessoryTest" }, () => {
    cy.log("Running hooks: beforeOneAccessoryTest");
  })

 AfterAll({ tags: "@afterAllMyTests" }, () => {
    cy.log("Running hooks: afterAllMyTests");
  })