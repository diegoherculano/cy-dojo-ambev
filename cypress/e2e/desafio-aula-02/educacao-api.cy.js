/// <reference types="cypress" />
const { name, user, password } = require("../../fixtures/user.json");
const bodyCreateUserEducation = require("../../fixtures/createUserEducation.json");
const bodyCreateUserPerfil = require("../../fixtures/createUserPerfil.json");

describe("Delete API", () => {
  before(() => {
    cy.deleteUserApi(user, password);
    cy.createUserApi(name, user, password);
    cy.createUserPerfilApi(bodyCreateUserPerfil);
    cy.loginApi(user, password);
  });

  it("[PUT] Deve adicionar uma formação acadêmica", () => {
    cy.request({
      method: "PUT",
      url: "https://conexaoqa.herokuapp.com/api/profile/education",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyCreateUserEducation,
    }).then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body.education[0]).to.deep.contain({
        school: bodyCreateUserEducation.school,
        fieldofstudy: bodyCreateUserEducation.fieldofstudy,
        description: bodyCreateUserEducation.description,
      });
    });
  });
});
