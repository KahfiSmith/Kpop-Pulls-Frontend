describe('Collection Page', () => {
  beforeEach(() => {
    cy.visit('/collection')
  })

  it('should display collection page', () => {
    cy.contains('Collection').should('be.visible')
    
    // Check if collection grid exists
    cy.get('[data-cy="collection-grid"], [data-cy="empty-collection"]', { timeout: 10000 }).should('exist')
  })

  it('should show empty state when no idols collected', () => {
    // Clear localStorage to simulate empty collection
    cy.clearLocalStorage()
    cy.reload()
    
    // Check for empty state message
    cy.get('[data-cy="empty-collection"]', { timeout: 10000 }).should('be.visible')
    cy.contains('No cards match your filters or your collection is empty').should('be.visible')
  })

  it('should have navigation back to home', () => {
    // Check back to home button
    cy.get('[data-cy="back-to-home-button"]').should('be.visible').click()
    cy.url().should('not.include', '/collection')
  })

  it('should have collection management buttons', () => {
    // Check all collection management buttons exist
    cy.get('[data-cy="export-collection-button"]').should('be.visible').and('contain', 'Export Collection')
    cy.get('[data-cy="import-collection-button"]').should('be.visible').and('contain', 'Import Collection')
    cy.get('[data-cy="share-collection-button"]').should('be.visible').and('contain', 'Share Collection')
    cy.get('[data-cy="clear-collection-button"]').should('be.visible').and('contain', 'Clear Collection')
  })

  it('should have filter and search options', () => {
    // Check if filter controls exist
    cy.get('[data-cy="rarity-filter-select"]').should('exist')
    cy.get('[data-cy="group-filter-select"]').should('exist')
    cy.get('[data-cy="search-input"]').should('exist')
    cy.get('[data-cy="sort-field-select"]').should('exist')
    cy.get('[data-cy="sort-direction-button"]').should('exist')
  })

  it('should allow searching for idols', () => {
    // Test search functionality
    cy.get('[data-cy="search-input"]').type('test')
    cy.get('[data-cy="search-input"]').should('have.value', 'test')
  })

  it('should display collected idols when available', () => {
    // First, let's add some idols by doing pulls on home page
    cy.visit('/')
    cy.get('[data-cy="gacha-pull-button"]').click()
    
    // Wait for animation and continue button
    cy.get('[data-cy="continue-button"]', { timeout: 10000 }).should('be.visible').click()
    
    // Navigate back to collection
    cy.get('[data-cy="my-collection-button"]').click()
    
    // Check if collected idols are displayed
    cy.get('[data-cy="collection-grid"]', { timeout: 10000 }).should('be.visible')
    cy.get('[data-cy^="collection-item-"]').should('have.length.at.least', 1)
  })

  it('should show idol details when view profile is clicked', () => {
    // First ensure we have at least one idol
    cy.visit('/')
    cy.get('[data-cy="gacha-pull-button"]').click()
    cy.get('[data-cy="continue-button"]', { timeout: 10000 }).should('be.visible').click()
    cy.get('[data-cy="my-collection-button"]').click()
    
    // Click on first idol's view profile button
    cy.get('[data-cy^="collection-item-"]').first().within(() => {
      cy.get('[data-cy="view-profile-button"]').click()
    })
    
    // Check if detail modal opens
    cy.get('[data-cy="idol-detail-modal"]', { timeout: 5000 }).should('be.visible')
    
    // Close modal
    cy.get('[data-cy="close-modal-button"]').click()
    cy.get('[data-cy="idol-detail-modal"]').should('not.exist')
  })
})
