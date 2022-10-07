/// <reference types="cypress" />
const { name, user, password } = require("../../fixtures/user.json");

describe("Tela login", () => {
  beforeEach(() => {
    cy.createUserApi(name, user, password);
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
      `Bem-vindo ${name}`
    );
  });
});
