/// <reference types="cypress" />
const { name, user, password } = require("../../fixtures/user.json");
const bodyCreateUserExperience = require("../../fixtures/createUserExperience.json");
const bodyCreateUserPerfil = require("../../fixtures/createUserPerfil.json");

describe("Delete API", () => {
  before(() => {
    cy.deleteUserApi(user, password);
    cy.createUserApi(name, user, password);
    cy.createUserPerfilApi(bodyCreateUserPerfil);
    cy.loginApi(user, password);
  });

  it("[DELETE] Deve deletar uma experiência profissional", () => {
    cy.createUserExperienceApi(bodyCreateUserExperience).then((res) => {
      const id = res.body.experience[0]._id;

      cy.request({
        method: "DELETE",
        url: `https://conexaoqa.herokuapp.com/api/profile/experience/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        expect(res.status).to.be.eq(200);
      });
    });
  });
});
