/// <reference types="cypress" />
// ***********************************************
declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to log in to the application
         * @param email - User email
         * @param password - User password
         */
        login(email: string, password: string): Chainable<void>;
    }
}

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/auth/login');
    cy.get('.grid > :nth-child(1) > .block').type(email);
    cy.get('.grid > :nth-child(2) > .block').type(password);
    cy.get('.nc-Button').click();
    cy.contains("Last Premiere");
});