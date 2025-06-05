
import { Given, When, Then, After } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-ajv-schema-validator';

Given("I open API page", () => {
  cy.visit(Cypress.env("api_test_url"));
})

Given("I login into my account using API", () => {
  cy.fixture('credentials.json').as('credentials');
  cy.get('@credentials').then((credentials) => {
    cy.request("POST", "https://conduit-api.bondaracademy.com/api/users/login", credentials)
    .its("body")
    .then((body) => {
      const token = body.user.token;
      Cypress.env("token", body.user.token);
      cy.log(Cypress.env("token"));
    });
  })
})

When("I get all list of articles", () => {
  cy.request({
    method: "GET",
    url: "https://conduit-api.bondaracademy.com/api/articles",
    headers: { Authorization: "Token " + Cypress.env("token") },
  }).then((response) => {
    expect(response.status).to.equal(200),
    expect(response.body.articlesCount).to.equal(10);
  });
})

When("I select the first article", () => {
  cy.get(".article-preview").eq(0).click();
})

Then("I am able to see its content", () => {
  cy.request({
    method: "GET",
    url: "https://conduit-api.bondaracademy.com/api/articles/Discover-Bondar-Academy:-Your-Gateway-to-Efficient-Learning-1",
    headers: { Authorization: "Token " + Cypress.env("token") },
  }).then((response) => {
    expect(response.status).to.equal(200),
      expect(response.body.article.title).to.contain("Discover Bondar Academy: Your Gateway to Efficient Learning");
  });
})

Given("I login in my account from UI", () => {
  cy.visit(Cypress.env("api_test_url"));
  cy.contains('Sign in').click();
  cy.get('.form-control').eq(0).type('claudia.tapoi@gmail.com');
  cy.get('.form-control').eq(1).type('Test1234');
  cy.get('.btn').click();
})

When("I add a new article with {string} title", (title) => {
  cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/').as('addArticle');
  cy.contains('claudia').should('be.visible');
  cy.contains('New Article').click();
  cy.get('[formcontrolname="title"]').type(title);
  cy.get('[formcontrolname="description"]').type('Test article from my user1');
  cy.get('[formcontrolname="body"]').type('This is a test article, so that if you read it you should know this1');
  cy.contains('Publish Article').click();
  cy.wait('@addArticle').its('response.body.article.slug').should('include', title);
})

Then("new article with {string} title is created", (title) => {
  cy.request({
    method: "GET",
    url: "https://conduit-api.bondaracademy.com/api/articles",
    headers: { Authorization: "Token " + Cypress.env("token") },
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.articlesCount).to.equal(11);
    expect(response.body.articles[0].title).to.equal(title);
  })
  cy.wrap(title).as('newTitle');
})

When("I search for articles with specific tag", (datatable) => {
  console.log(datatable)
  datatable.hashes().forEach((element) => {
  cy.request({
    method: 'GET',
    url: `https://conduit-api.bondaracademy.com/api/articles?tag=${element.tag}`,
    headers: { Authorization: "Token " + Cypress.env("token") }
   }).as(`getArticlesWith${element.tag}`)
  })
})

Then("only articles with specific tag are shown", (datatable) => {
  datatable.hashes().forEach((element) => {
  cy.get(`@getArticlesWith${element.tag}`).then((response) => {
      expect(response.status).to.equal(200)
      const articles = response.body.articles
      articles.forEach((article) => {
        expect(article.tagList).to.contain(element.tag);
      })
    })
  })
})

When("I get the response of all articles", () => {
  cy.request({
    method: "GET",
    url: "https://conduit-api.bondaracademy.com/api/articles",
    headers: { Authorization: "Token " + Cypress.env("token") },
  }).then((response) => {
    expect(response.status).to.equal(200)
  }).as('responseBody');
})

Then("I compare the responses and see that my list has a valid JSON format", () => {
    cy.fixture('validSchema.json').as('schema');
    cy.get('@schema').then((schema)=> {
    cy.request('GET', 'https://conduit-api.bondaracademy.com/api/articles').validateSchema(schema);
    })
})

When("I click on real world project link", () => {
  cy.get(".attribution").invoke("removeAttr", "target").click();
});

Then("a new tab opens", () => {
    cy.origin("https://github.com/gothinkster/realworld/hovercards", () => {
    cy.url().should("include", "realworld");
    cy.get("#js-repo-pjax-container").should("be.visible");
    })
});

Then("I can see all available articles", () => {
  cy.get(".preview-link").each((article) => {
    cy.wrap(article).should('be.visible');
  });
});