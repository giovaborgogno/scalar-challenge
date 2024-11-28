describe('Chat', () => {

    it('send message in the chat', () => {
        cy.login('user@gmail.com', 'Test-123')
        cy.visit('/')
        /* ==== Generated with Cypress Studio ==== */
        const uniqueId = Date.now();
        cy.get('form > .w-full').clear();
        cy.get('form > .w-full').type(`Mensaje Test ${uniqueId} {enter}`);
        cy.contains(`Mensaje Test ${uniqueId}`)
        /* ==== End Cypress Studio ==== */
    });

    it('needs to be logged in to send a  message in the chat', () => {
        cy.visit('/')
        /* ==== Generated with Cypress Studio ==== */
        cy.get('form > .w-full').should('be.disabled');
        /* ==== End Cypress Studio ==== */
    })
})