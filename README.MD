# Test task for Reply.Canvas 
## Task description
QA Automation Engineer test task
Please, create automated tests for portal https://demo.1crmcloud.com according
to the requirements and cases below. 
- Requirements (must have):
1. Use JS or TypeScript + Cypress
2. Please, create a small framework for this task.
   What we expect to have:
   1. Configuration via files
   2. Effective reuse of the code

3. Follow coding best practices
4. Share the project via GitHub
- Optional:
1. Connect any HTML reporter
2. Login using API
   Test cases:
- Scenario 1 – Create contact:
1. Login
2. Navigate to “Sales & Marketing” -> “Contacts”
3. Create new contact (Enter at least first name, last name, role and 2
   categories: Customers and Suppliers)
4. Open created contact and check that its data matches entered on the
   previous step
- Scenario 2 – Run report:
1. Login
2. Navigate to “Reports & Settings” -> “Reports”
3. Find “Project Profitability” report
4. Run report and verify that some results were returned
- Scenario 3 – Remove events from activity log:
1. Login
2. Navigate to “Reports & Settings” -> “Activity log”
3. Select first 3 items in the table
4. Click “Actions” -> “Delete”
5. Verify that items were deleted

# NPM Scripts
*  **open:cypress** - just to open Cypress
*  **eslint:fix** - for internal use, fixing lint warnings
*  **run** - execute tests run in headless mode with generation html report in the end (./reports)