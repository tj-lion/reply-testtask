const constants = require('./../support/constants.js');

// Scenario 1 – Create contact:
describe("Scenario 1 – Create contact", () => {
  // 1. Login
  it("Login via UI", () => {
    cy.visit("/");

    cy.get("#login_user").type(Cypress.env("login"));
    cy.get("#login_pass").type(Cypress.env("password"));

    cy.intercept({
      method: "POST",
      url: constants.urls.login,
    }).as("login");

    cy.get("#login_button").click();

    cy.wait("@login").its("response.statusCode").should("eq", 200);
  });

  context("API login", () => {
    let recordID = null;
    const name = 'Name';
    const surname = 'Surname';

    beforeEach(() => {
      cy.login();
    });

    it("Create a new contact", () => {
      // 2. Navigate to “Sales & Marketing” -> “Contacts”
      cy.visit(constants.urls.contactsEdit);

      // 3. Create new contact (Enter at least first name,
      cy.get("#DetailFormfirst_name-input").type(name);
      // last name,
      cy.get("#DetailFormlast_name-input").type(surname);
      // role
      cy.get("#DetailFormbusiness_role-input").click();
      cy.contains("CEO").click();
      // and 2 categories: Customers and Suppliers)
      cy.get("#DetailFormcategories-input").click();
      cy.get("#DetailFormcategories-input-search-text").type(
        "Customers{enter}"
      );
      cy.get("#DetailFormcategories-input").click();
      cy.get("#DetailFormcategories-input-search-text").type(
        "Suppliers{enter}"
      );

      cy.intercept({
        method: "POST",
        url: "/async.php",
      }).as("save");

      cy.get("#DetailForm_save-label").click();

      cy.wait("@save")
        .then((xhr) => {
          recordID = xhr.response.body.match(/record=([^&]*)&/)[1];
        })
        .its("response.statusCode")
        .should("eq", 200);
    });

    // 4. Open created contact and check that its data matches entered on the previous step
    it("check contact", () => {
      cy.visit(constants.urls.contactsView);

      cy.findByFilterText(name + surname);

      cy.get("#_form_header > h3").contains(name + surname);
      cy.get(".cell-business_role > .form-entry > .form-value").contains("CEO");
      cy.xpath('//p [contains( text(), "Category")]/parent::li').contains(
        "Customers, Suppliers"
      );
    });

    it("remove user", () => {
      cy.request({
        method: "POST",
        url: "/async.php",
        form: true,
        body: {
          module: "Contacts",
          action: "DetailView",
          record: recordID,
          layout: "Standard",
          record_perform: "delete",
          format: "html",
        },
      });
    });
  });
});
