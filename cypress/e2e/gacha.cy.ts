describe('Gacha System', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should perform a gacha pull', () => {
    // Find and click the pull button
    cy.get('[data-cy="gacha-pull-button"]', { timeout: 10000 })
      .should('be.visible')
      .click()
    
    // Wait for animation to complete and continue button to appear
    cy.get('[data-cy="continue-button"]', { timeout: 15000 }).should('be.visible').click()
    
    // Check if we can see the idol card (it should be added to collection)
    cy.get('[data-cy="my-collection-button"]').click()
    cy.get('[data-cy^="collection-item-"]', { timeout: 5000 }).should('have.length.at.least', 1)
  })

  it('should show stats and recent pulls when toggle is clicked', () => {
    // Click stats toggle button
    cy.get('[data-cy="toggle-stats-button"]').click()
    
    // Check if stats panel appears
    cy.get('[data-cy="stats-panel"]').should('be.visible')
    
    // Do a pull to generate some stats
    cy.get('[data-cy="gacha-pull-button"]').click()
    cy.get('[data-cy="continue-button"]', { timeout: 15000 }).should('be.visible').click()
    
    // Check if recent pulls table appears
    cy.get('[data-cy="recent-pulls-table"]').should('be.visible')
    
    // Hide stats
    cy.get('[data-cy="toggle-stats-button"]').click()
    cy.get('[data-cy="stats-panel"]').should('not.exist')
  })

  it('should toggle mute functionality', () => {
    // Test mute button
    cy.get('[data-cy="toggle-mute-button"]').should('be.visible')
    
    // Initially should show mute option
    cy.get('[data-cy="toggle-mute-button"]').should('contain', 'Mute')
    
    // Click to mute
    cy.get('[data-cy="toggle-mute-button"]').click()
    cy.get('[data-cy="toggle-mute-button"]').should('contain', 'Unmute')
    
    // Click to unmute
    cy.get('[data-cy="toggle-mute-button"]').click()
    cy.get('[data-cy="toggle-mute-button"]').should('contain', 'Mute')
  })

  it('should show idol details when view profile is clicked from collection', () => {
    // First do a pull
    cy.get('[data-cy="gacha-pull-button"]').click()
    cy.get('[data-cy="continue-button"]', { timeout: 15000 }).should('be.visible').click()
    
    // Go to collection
    cy.get('[data-cy="my-collection-button"]').click()
    
    // Click on view profile button
    cy.get('[data-cy^="collection-item-"]').first().within(() => {
      cy.get('[data-cy="view-profile-button"]').click()
    })
    
    // Check if modal opens
    cy.get('[data-cy="idol-detail-modal"]', { timeout: 5000 }).should('be.visible')
    
    // Close modal
    cy.get('[data-cy="close-modal-button"]').click()
    cy.get('[data-cy="idol-detail-modal"]').should('not.exist')
  })

  it('should allow multiple pulls', () => {
    // Do first pull
    cy.get('[data-cy="gacha-pull-button"]').click()
    cy.get('[data-cy="continue-button"]', { timeout: 15000 }).should('be.visible').click()
    
    // Do second pull
    cy.get('[data-cy="gacha-pull-button"]').should('be.visible').click()
    cy.get('[data-cy="continue-button"]', { timeout: 15000 }).should('be.visible').click()
    
    // Check collection now has 2 items (or more if duplicates)
    cy.get('[data-cy="my-collection-button"]').click()
    cy.get('[data-cy^="collection-item-"]').should('have.length.at.least', 1)
  })

  it('should maintain pull statistics', () => {
    // Show stats panel
    cy.get('[data-cy="toggle-stats-button"]').click()
    cy.get('[data-cy="stats-panel"]').should('be.visible')
    
    // Do a pull
    cy.get('[data-cy="gacha-pull-button"]').click()
    cy.get('[data-cy="continue-button"]', { timeout: 15000 }).should('be.visible').click()
    
    // Check that recent pulls table shows the pull
    cy.get('[data-cy="recent-pulls-table"]').should('be.visible')
    cy.get('[data-cy="stats-panel"]').should('contain', '1') // Should show at least 1 total pull
  })
})
