/// <reference types="cypress" />
const { user, password } = require("../../fixtures/user.json");

describe("Tela login", () => {
  beforeEach(() => {
    cy.createUser("Douglas Silva Machado", user, password);
    cy.visit("https://conexaoqa.herokuapp.com/login");
  });

  it("Deve realizar o login sem sucesso", () => {
    cy.get(
      '[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input'
    ).type(user);
    cy.get(
      '[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input'
    ).type(password);
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="dashboard-welcome"]').should(
      "contain",
      "Bem-vindo Douglas Silva Machado"
    );
  });
});
