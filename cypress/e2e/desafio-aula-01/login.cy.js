describe("Tela login", () => {
  beforeEach(() => {
    cy.createUser("Douglas Silva Machado", "douglas1111@gmail.com", "123456");
    cy.visit("https://conexaoqa.herokuapp.com/login");
  });

  it("Deve realizar o login sem sucesso", () => {
    cy.get(
      '[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input'
    ).type("douglas1111@gmail.com");
    cy.get(
      '[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input'
    ).type("123456");
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="dashboard-welcome"]').should(
      "contain",
      "Bem-vindo Douglas Silva Machado"
    );
  });
});
