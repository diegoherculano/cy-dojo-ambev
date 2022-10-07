Cypress.Commands.add("createUser", (name, email, password) => {
  cy.request({
    method: "POST",
    url: "https://conexaoqa.herokuapp.com/api/users",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      name,
      email,
      password,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("loginApi", (email, password) => {
  return cy.request({
    method: "POST",
    url: "https://conexaoqa.herokuapp.com/api/auth",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      email,
      password,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("deleteUser", (email, password) => {
  cy.loginApi(email, password).then((res) => {
    if (res.body.jwt) {
      cy.request({
        method: "DELETE",
        url: "https://conexaoqa.herokuapp.com/api/profile",
        headers: {
          accept: "application/json",
          Cookie: `jwt=${res.body.jwt}`,
        },
        failOnStatusCode: false,
      });
    }
  });
});
