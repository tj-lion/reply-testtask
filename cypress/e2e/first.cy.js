// Scenario 1 – Create contact:
describe("Scenario 1 – Create contact", () => {
  // 1. Login
  it("Login", () => {
    cy.visit("/");

    cy.get("#login_user").type("admin");
    cy.get("#login_pass").type("admin");

    cy.intercept({
      method: "POST",
      url: "/json.php?action=login",
    }).as("login");

    cy.get("#login_button").click();

    cy.wait("@login").its("response.statusCode").should("eq", 200);
  });

  context("API login", () => {
    let recordID = null;

    beforeEach(() => {
      cy.login();
    });

    it("Create a new contact", () => {
      // 2. Navigate to “Sales & Marketing” -> “Contacts”
      cy.visit(
        "/index.php?module=Contacts&action=EditView&record=&list_layout_name=Browse"
      );
      // cy.contains('Create ').click()

      // 3. Create new contact (Enter at least first name, last name, role and 2 categories: Customers and Suppliers)
      cy.get("#DetailFormfirst_name-input").type("Name");
      cy.get("#DetailFormlast_name-input").type("Surname");
      // cy.get('#ajaxStatusDiv', { timeout: 10000 }).should('not.have.css', 'display', 'block')
      cy.get("#DetailFormbusiness_role-input").click();
      cy.contains("CEO").click();
      // cy.get('#DetailFormbusiness_role-input-popup').type('CEO')

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
          //TODO - change to sharing context .as
          recordID = xhr.response.body.match(/record=([^&]*)&/)[1];
        })
        .its("response.statusCode")
        .should("eq", 200);
    });

    // 4. Open created contact and check that its data matches entered on the previous step
    it("check contact", () => {
      cy.visit("/?module=Contacts&action=index");

      cy.findByFilterText("Name Surname");

      cy.get("#_form_header > h3").contains("Name Surname");
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
