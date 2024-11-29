// Generate a unique identifier for each test run
const uniqueId = Date.now();

describe('Add Movie', () => {
  it('should add a movie successfully', () => {
    // Get today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    cy.login('admin@gmail.com', 'Test-123');

    // Go to the add movie page
    cy.visit('/dashboard/add-movie');

    // Fill in movie details with unique title and today's date
    cy.get('#title').type(`New Movie ${uniqueId}`);
    cy.get('#plot').type('New movie plot');
    cy.get('#trailer_url').type('https://www.youtube.com/embed/H82uvLvszQ0?si=NpbtC3QjySz6p52x');
    cy.get('#genre').select('Action');
    cy.get('#release_date').type(today);
    cy.get('#status').select('Published');

    // Submit the form
    cy.get('.pt-2 > .nc-Button').click();

    // Verify success message
    cy.contains('Success'); // Should pass
    // cy.contains('Fail!'); // Should fail

    // Go to the homepage to confirm the new movie appears
    cy.visit('/');
    cy.contains(`New Movie ${uniqueId}`);
  });
});
