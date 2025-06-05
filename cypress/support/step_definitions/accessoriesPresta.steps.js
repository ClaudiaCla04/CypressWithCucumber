import { Given, When, Then, After } from "@badeball/cypress-cucumber-preprocessor";

Given("I login into my account", () => {
  cy.login('claudia.tapoi@accesa.eu', 'Test123');
})

When("I navigate to {string}", (menu) => {
  cy.visit(Cypress.env("prestashop_url"));
  cy.get('.category').contains(menu).click();
})

Then("I should see the page title {string}", (menu) => {
    cy.get('.breadcrumb').should('contain.text', menu);
})

Then("I should see a list of accessories items displayed", () => {
  cy.get('.total-products').should('contain.text', "There are 11 products.");
  cy.get('.products.row').should('be.visible');
})

Then("each accessory should display an image, name, and price", () => {
  cy.get('.product-miniature')
      .each(($item) => {
        cy.wrap($item).find('img').should('be.visible');
        cy.wrap($item).find('.product-title').should('be.visible').and('not.be.empty');
        cy.wrap($item).find('.price').should('exist').and('contain.text', "lei");
      });
})

When("I click on {string} item", (accessory) => {
  cy.get('.product-title').contains(accessory).click();
})

Then("{string} item page opens as expected", (accessory) => {
  cy.get('.breadcrumb').should('contain.text', accessory);
  cy.get('.product-container [itemprop="name"]').should('contain.text', accessory);
  cy.get('.page-content').should('be.visible');
  cy.get('.product-prices').should('be.visible');
  cy.get('.product-information').should('be.visible');
})

When("I select the {string} filter", (subcategory) => {
  cy.get('.facet-label').contains(subcategory).siblings('.custom-checkbox').click();
})

Then("only {string} items should be visible", (subcategory) => {
  cy.get('.filter-block').should('contain.text', subcategory);
})

When("I choose to sort items alphabetically", () => {
  cy.get('.products-sort-order.dropdown').click();
  cy.get('.dropdown-menu').contains('Name, A to Z').click();
})

Then("the items should be ordered alphabetically from A to Z", () => {
  cy.get('.product-title').eq(0).should('contain.text', "Brown bear cushion");
  cy.get('.product-title').eq(10).should('contain.text', "Pack Mug + Framed poster");
})

When("I add the item to cart", () => {
  cy.get('.add-to-cart').click();
  cy.get('.modal-title').should('contain.text', "Product successfully added to your shopping cart");
  cy.get('.modal-dialog .product-quantity').should('contain.text','1');
  cy.get('.modal-dialog .cart-content-btn').contains("Proceed to checkout").click();
})

Then("item is successfully added to cart", () => {
  cy.get('#_desktop_cart').click();
  cy.get('.blockcart .cart-products-count').should('have.length', 1);
  cy.get('#cart-subtotal-products').should('contain', 1);
})