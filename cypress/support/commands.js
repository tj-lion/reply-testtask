Cypress.Commands.add('login', () => {
    cy.session('admin', () => {
        cy.request({
            method: 'POST',
            url: '/json.php?action=login',
            body: {
                username: 'admin',
                password: 'admin',
            },
        }).then(({body}) => {
            window.localStorage.setItem('PHPSESSID', body.json_session_id);
        });
    });
})

Cypress.Commands.overwrite('type', (fn, subject, text, options = {}) => {
    options.delay = options.delay || 0;
    return fn(subject, text, options);
});
