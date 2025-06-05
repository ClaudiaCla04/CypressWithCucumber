import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open my shadowDom web", () => {
  cy.visit(Cypress.env('uiPlayground_url')+path);
});

When("I click on generate code icon", () => {
  cy.get("guid-generator").shadow().find(".edit-field").should("be.empty");
  cy.get("guid-generator").shadow().find(".button-generate").click();
});

When("I click on copy code icon", () => {
  cy.get("guid-generator").shadow().find(".button-copy").click();
  Cypress.on("uncaught:exception", (err) => {
    expect(err.message).to.include("writeText");
    return false;
  });
});

Then("code is generated", () => {
  cy.get("guid-generator")
    .shadow()
    .find(".edit-field")
    .invoke("val")
    .should("have.length", 36);
});

Given("I open my {string} web", (path) => {
  cy.visit(Cypress.env('uiPlayground_url')+path)
});

When("I click on alert button", () => {
  const alertShown = cy.stub().as("alertShown");
  cy.on("window:alert", alertShown);
  cy.get("#alertButton").click();
});

Then("alert is visible", () => {
  cy.get("@alertShown").should("have.been.calledOnceWith","Today is a working day.\nOr less likely a holiday.");
});

When("I click on confirm button and choose yes", () => {
  const confirmShown = cy.stub().as("confirmShown");
  cy.on("window:confirm", confirmShown);
  cy.get("#confirmButton").click();
  cy.get("@confirmShown").should("have.been.calledOnceWith","Today is Friday.\nDo you agree?");
});

Then("window alert responds yes", () => {
  const alertShown = cy.stub().as("alertShown");
  cy.on("window:alert", alertShown);
  cy.get("@alertShown").should("have.been.calledOnceWith", "Yes");
});

When("I click on confirm button and choose no", () => {
  const confirmShown = cy.stub().as("confirmShown").returns(false);
  cy.on("window:confirm", confirmShown);
  cy.get("#confirmButton").click();
  cy.get("@confirmShown").should("have.been.calledOnceWith","Today is Friday.\nDo you agree?");
});

Then("window alert responds no", () => {
  const alertShown = cy.stub().as("alertShown");
  cy.on("window:alert", alertShown);
  cy.get("@alertShown").should("have.been.calledOnceWith", "No");
});
