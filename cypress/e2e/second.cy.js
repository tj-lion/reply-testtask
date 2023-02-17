const constants = require('./../support/constants.js');

// Scenario 2 – Run report:
describe("Scenario 2 – Run report", () => {
  it("check report generation", () => {
    // 1. Login
    cy.login();

    // 2. Navigate to “Reports & Settings” -> “Reports”
    cy.visit(constants.urls.reports);

    // 3. Find “Project Profitability” report
    cy.intercept({
      method: "GET",
      url: /jsmin/,
    }).as("reportLoad");
    cy.findByFilterText("Project Profitability");
    cy.wait("@reportLoad", { timeout: 10_000 })
      .its("response.statusCode")
      .should("eq", 200);

    // 4. Run report and verify that some results were returned
    cy.intercept({
      method: "POST",
      url: "/async.php",
    }).as("reports");
    cy.contains("Run Report").click();
    cy.wait("@reports").its("response.statusCode").should("eq", 200);
    cy.get("table.listView tbody").find("tr").its("length").should("least", 1);
  });
});
