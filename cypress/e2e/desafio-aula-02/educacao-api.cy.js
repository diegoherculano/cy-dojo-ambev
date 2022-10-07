/// <reference types="cypress" />
const { name, user, password } = require("../../fixtures/user.json");
const bodyCreateUserEducation = require("../../fixtures/createUserEducation.json");
const bodyCreateUserPerfil = require("../../fixtures/createUserPerfil.json");

describe("Delete API", () => {
  beforeEach(() => {
    cy.deleteUserApi(user, password);
    cy.createUserApi(name, user, password);
    cy.createUserPerfilApi(bodyCreateUserPerfil);
    cy.loginApi(user, password);
  });

  it("[PUT] Deve adicionar uma formação acadêmica", () => {
    cy.createUserEducation(bodyCreateUserEducation).then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body.education[0]).to.deep.contain({
        school: bodyCreateUserEducation.school,
        fieldofstudy: bodyCreateUserEducation.fieldofstudy,
        description: bodyCreateUserEducation.description,
      });
    });
  });

  it("[DELETE] Deve deletar uma formação acadêmica", () => {
    cy.createUserEducation(bodyCreateUserEducation).then((res) => {
      const id = res.body.education[0]._id;

      cy.request({
        method: "DELETE",
        url: `https://conexaoqa.herokuapp.com/api/profile/education/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        expect(res.status).to.be.eq(200);
        expect(res.body).to.deep.contain({
          company: "Travessos",
          website: "http://www.google.com",
          location: "USA",
          status: "QA Junior",
          githubusername: "@kwelf",
        });
      });
    });
  });
});
