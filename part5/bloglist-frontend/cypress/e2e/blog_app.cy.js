describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    const user = {
      name: "Tyler Khan",
      username: "tylrk",
      password: "test",
    };

    const user2 = {
      name: "Tyler",
      username: "test",
      password: "test2",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
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

      it("user can delete a blog they created", function () {
        cy.contains("View").click();
        cy.contains("Delete").click();

        cy.get(".notification")
          .should("contain", "You deleted")
          .and("have.css", "color", "rgb(255, 0, 0)")
          .and("have.css", "border-style", "solid");
      });

      it("only blog creator can see delete button", function () {
        cy.contains("Logout").click();
        cy.login({ username: "test", password: "test2" });
        cy.contains("View").click();

        cy.should("not.contain", "Delete");
      });

      it("blogs are ordered by most likes", function () {
        cy.contains("first blog").contains("View").click();
        cy.get("#like").click();
        cy.get("#like").click();
        cy.contains("Hide").click();
        cy.contains("third blog").contains("View").click();
        cy.get("#like").click();
        cy.get(".blog").eq(0).should("contain", "first blog");
        cy.get(".blog").eq(1).should("contain", "third blog");
      });
    });
  });
});
