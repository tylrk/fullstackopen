describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    const user = {
      name: "Tyler Khan",
      username: "tylrk",
      password: "test",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Log into the Application");
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("tylrk");
      cy.get("#password").type("test");
      cy.get("#login-button").click();

      cy.contains("Tyler Khan is logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("user");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".notification")
        .should("contain", "Wrong Username or Password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Tyler Khan is logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "tylrk", password: "test" });
    });

    it("A blog can be created", function () {
      cy.get("#newBlog").click();
      cy.get("#title").type("Test Blog");
      cy.get("#author").type("TK");
      cy.get("#url").type("www.test.com");

      cy.get("#create").click();
      cy.contains("Test Blog");
      cy.contains("TK");
    });

    describe("and multiple blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "TK",
          url: "www.first.com",
        });
        cy.createBlog({
          title: "second blog",
          author: "TK",
          url: "www.second.com",
        });
        cy.createBlog({
          title: "third blog",
          author: "TK",
          url: "www.third.com",
        });
      });

      it("users can like a blog", function () {
        cy.contains("View").click();
        cy.get("#like").click();

        cy.get(".notification")
          .should("contain", "You liked")
          .and("have.css", "color", "rgb(255, 0, 0)")
          .and("have.css", "border-style", "solid");
      });
    });
  });
});
