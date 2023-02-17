// Scenario 3 – Remove events from activity log:
describe("Scenario 3 – Remove events from activity log:", () => {
  it("removing top three activities in the list", function () {
    // 1. Login
    cy.login();

    // 2. Navigate to “Reports & Settings” -> “Activity log”
    cy.visit("/index.php?module=ActivityLog&action=index");

    // remember number of activities before removing
    cy.get(
      ".panel-subheader .listview-status .text-number:not([id*=Count])"
    ).then((element) => {
      cy.wrap(Number(element.text().replace(/,/g, ""))).as(
        "numberOfActivities"
      );
    });

    // 3. Select first 3 items in the table
    for (let i = 0; i < 3; i++) {
      cy.get("tbody .checkbox").eq(i).click();
    }

    // 4. Click “Actions” -> “Delete”
    cy.intercept({
      method: "POST",
      url: "/async.php",
    }).as("delete");
    cy.contains("Actions").click();
    cy.contains("Delete").click();
    cy.wait("@delete").its("response.statusCode").should("eq", 200);

    // remember number of activities after removing
    cy.get(
      ".panel-subheader .listview-status .text-number:not([id*=Count])"
    ).then((element) => {
      cy.wrap(Number(element.text().replace(/,/g, ""))).as(
        "numberOfActivitiesNew"
      );
    });
  });

  it("check if overall number of activities decreased by 3", function () {
    // 5. Verify that items were deleted
    cy.wrap(this.numberOfActivitiesNew).should(
      "eq",
      this.numberOfActivities - 3
    );
  });
});
