/// <reference types="cypress" />
const { name, user, password } = require("../../fixtures/user.json");

describe("Perfil API", () => {
  before(() => {
    cy.loginApi(user, password);
  });

  it("[GET] Deve selecionar o usuário logado", () => {
    cy.request({
      method: "GET",
      url: "https://conexaoqa.herokuapp.com/api/auth",
      headers: {
        accept: "application/json",
      },
    }).then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body).to.deep.contain({
        name: "Douglas Silva Machado",
        email: "douglas1111@gmail.com",
        __v: 0,
      });
      expect(res.body).to.have.keys([
        "_id",
        "name",
        "email",
        "avatar",
        "date",
        "__v",
      ]);
    });
  });
});
