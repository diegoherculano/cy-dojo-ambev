Cypress.Commands.add("createUserApi", (name, email, password) => {
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

Cypress.Commands.add(
  "createUserPerfilApi",
  ({
    status,
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    medium,
  }) => {
    cy.request({
      method: "POST",
      url: "https://conexaoqa.herokuapp.com/api/profile",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        status,
        company,
        website,
        location,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
        medium,
      },
    });
  }
);

Cypress.Commands.add(
  "createUserExperienceApi",
  ({ title, company, location, from, to, current, description }) => {
    return cy.request({
      method: "PUT",
      url: "https://conexaoqa.herokuapp.com/api/profile/experience",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      },
    });
  }
);

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
  });
});

Cypress.Commands.add("deleteUserApi", (email, password) => {
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
