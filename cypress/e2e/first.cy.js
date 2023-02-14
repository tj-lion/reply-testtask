const login = () => {
    cy.session('admin', () => {
        cy.request({
            method: 'POST',
            url: '/json.php?action=login',
            body: {
                'username': 'admin',
                'password': 'admin',
            },
        }).then(({body}) => {
            window.localStorage.setItem('PHPSESSID', body.json_session_id);
        })
    })
}

Cypress.Commands.overwrite('type', (fn, subject, text, options = {}) => {
    options.delay = options.delay || 0;
    return fn(subject, text, options)
})

// Scenario 1 – Create contact:
describe('Scenario 1 – Create contact', () => {

    // 1. Login
    it('Login', () => {
      cy.visit('/')

      cy.get('#login_user').type('admin')
      cy.get('#login_pass').type('admin')
      cy.get('#login_button').click()

      //TODO - check that I have actually logged in
    })

    it('Create a new contact', () => {
        login();

        // 2. Navigate to “Sales & Marketing” -> “Contacts”
        cy.visit('/index.php?module=Contacts&action=EditView&record=&list_layout_name=Browse')
        // cy.contains('Create ').click()

        // 3. Create new contact (Enter at least first name, last name, role and 2 categories: Customers and Suppliers)
        cy.get('#DetailFormfirst_name-input').type('Name')
        cy.get('#DetailFormlast_name-input').type('Surname')
        // cy.get('#ajaxStatusDiv', { timeout: 10000 }).should('not.have.css', 'display', 'block')
        cy.get('#DetailFormbusiness_role-input').click()
        cy.contains('CEO').click()
        // cy.get('#DetailFormbusiness_role-input-popup').type('CEO')

        cy.get('#DetailFormcategories-input').click()
        cy.get('#DetailFormcategories-input-search-text').type('Customers{enter}')
        cy.get('#DetailFormcategories-input').click()
        cy.get('#DetailFormcategories-input-search-text').type('Suppliers{enter}')
    })

    // 4. Open created contact and check that its data matches entered on the previous step
    it('check contact', () => {

    })
})
