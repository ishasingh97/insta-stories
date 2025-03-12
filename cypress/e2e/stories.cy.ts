describe('Instagram Stories App', () => {
  beforeEach(() => {
    // Mock data for stories with structure matching the actual data
    cy.intercept('GET', '/stories.json', {
      statusCode: 200,
      body: [
        {
          userId: 1,
          username: "Dummy User 1",
          profileImage: "/profilePicture/user1.jpg",
          stories: [
            {
              id: 1,
              image: "/images/image1.jpg",
              timestamp: 1678901234
            },
            {
              id: 2,
              image: "/images/image2.jpg",
              timestamp: 1678901235
            }
          ]
        }
      ]
    }).as('getStories');

    // Visit the app with retry until server is ready
    cy.visit('/', {
      retryOnStatusCodeFailure: true,
      timeout: 30000
    });
    cy.wait('@getStories');
  })

  it('should display the story list', () => {
    // Check if the story list container exists
    cy.get('[data-testid="story-list"]').should('exist');
    
    // Check if there are story items
    cy.get('[data-testid="story-item"]').should('have.length.at.least', 1);
  });

  it('should open story viewer when clicking a story', () => {
    // Click on the first story
    cy.get('[data-testid="story-item"]').first().click();
    
    // Wait for story viewer to be visible
    cy.get('[data-testid="story-viewer"]').should('be.visible');
    
    // Check that the story image container exists
    cy.get('[data-testid="story-image-container"]').should('exist');
    
    // Check that the story image exists and has the correct src
    cy.get('[data-testid="story-image"]')
      .should('exist')
      .and('have.attr', 'src')
      .and('include', '/images/');
  });

  it('should close story viewer when clicking close button', () => {
    // Open a story first
    cy.get('[data-testid="story-item"]').first().click();
    
    // Wait for story viewer to be visible
    cy.get('[data-testid="story-viewer"]').should('be.visible');
    
    // Click close button
    cy.get('[data-testid="close-button"]').click();
    
    // Verify story viewer is not present
    cy.get('[data-testid="story-viewer"]').should('not.exist');
  });

  it('should navigate between stories', () => {
    // Open first story
    cy.get('[data-testid="story-item"]').first().click();
    
    // Wait for story viewer to be visible
    cy.get('[data-testid="story-viewer"]').should('be.visible');
    
    
    // Click next button
    cy.get('[data-testid="next-button"]').click();
    
    // Click previous button
    cy.get('[data-testid="prev-button"]').click();
  });
}); 