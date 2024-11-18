describe('template spec', () => {
  it('add a review successfully', () => {
    cy.login('user@gmail.com', 'Test-123')
    cy.visit('/')
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(1) > .flex-col > .space-y-5 > :nth-child(2) > .nc-card-title > .line-clamp-2').click();
    cy.get('label.block > .block').type('5');

    const uniqueId = Date.now();
    cy.get('textarea.block').type(`Nice Movie! ${uniqueId}`);
    cy.get('.mt-2 > .nc-Button').click();

    cy.contains('Success')

    cy.contains('5.0')
    cy.contains('John Doe')
    cy.contains(`Nice Movie! ${uniqueId}`)
    /* ==== End Cypress Studio ==== */
  }),

    it('add a review with invalid rating', () => {
      cy.login('user@gmail.com', 'Test-123')
      cy.visit('/')
      /* ==== Generated with Cypress Studio ==== */
      cy.get(':nth-child(1) > .flex-col > .space-y-5 > :nth-child(2) > .nc-card-title > .line-clamp-2').click();
      cy.get('label.block > .block').type('12345');

      const uniqueId = Date.now();
      cy.get('textarea.block').type(`Nice Movie! ${uniqueId}`);
      cy.get('.mt-2 > .nc-Button').click();

      cy.contains('Success') // Should Fail
      // cy.contains('Try Later') // Should Pass
      /* ==== End Cypress Studio ==== */
    })
})