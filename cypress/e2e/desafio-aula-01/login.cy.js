/// <reference types="cypress" />
const { name, user, password } = require("../../fixtures/user.json");

describe("Tela login", () => {
  beforeEach(() => {
    cy.createUserApi(name, user, password);
    cy.visit("https://conexaoqa.herokuapp.com/login");
  });

  it("Deve realizar o login sem sucesso", () => {
    cy.login(user, password);
    cy.get('[data-test="dashboard-welcome"]').should(
      "contain",
      `Bem-vindo ${name}`
    );
  });
});
