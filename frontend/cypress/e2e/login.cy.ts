describe('template spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('should login successfully', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/auth/login');
    cy.get('.grid > :nth-child(1) > .block').type('admin@gmail.com');
    cy.get('.grid > :nth-child(2) > .block').type('Test-123');
    cy.get('.nc-Button').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.w-6').click();
    cy.contains('Eva Admin')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('should not login', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/auth/login');
    cy.get('.grid > :nth-child(1) > .block').type('admin@gmail.com');
    cy.get('.grid > :nth-child(2) > .block').type('Incorrect Password');
    cy.get('.nc-Button').click();
    cy.contains('Incorrect User or Password')
    /* ==== End Cypress Studio ==== */
  });
})