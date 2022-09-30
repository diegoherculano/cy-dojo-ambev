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
Cypress.Commands.add("login", (email, password) => {
  cy.get(
    '[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input'
  ).type(email);
  cy.get(
    '[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input'
  ).type(password);
  cy.get('[data-test="login-submit"]').click();
  cy.get('[data-test="dashboard-welcome"]').should(
    "contain",
    "Bem-vindo Douglas Silva Machado"
  );
});

Cypress.Commands.add(
  "customSelect",
  { prevSubject: "element" },
  (subject, value) => {
    cy.wrap(subject).click();

    cy.get(`li[data-value="${value}"]`).click();
  }
);

Cypress.Commands.add("createUser", (nome, email, password) => {
  cy.request({
    method: "POST",
    url: "https://conexaoqa.herokuapp.com/api/users",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      nome,
      email,
      password,
    },
    failOnStatusCode: false,
  });
});
