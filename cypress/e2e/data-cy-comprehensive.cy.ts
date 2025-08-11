describe('Data-Cy Attributes Comprehensive Test', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  describe('Home Page Elements', () => {
    it('should have all required data-cy attributes on home page', () => {
      // Navigation buttons
      cy.get('[data-cy="home-button"]').should('exist').and('be.visible')
      cy.get('[data-cy="my-collection-button"]').should('exist').and('be.visible')
      
      // Gacha elements
      cy.get('[data-cy="gacha-pull-button"]').should('exist').and('be.visible')
      cy.get('[data-cy="toggle-mute-button"]').should('exist').and('be.visible')
      cy.get('[data-cy="toggle-stats-button"]').should('exist').and('be.visible')
    })

    it('should show stats panel with correct data-cy when toggled', () => {
      // Initially stats should not be visible
      cy.get('[data-cy="stats-panel"]').should('not.exist')
      
      // Click toggle to show stats
      cy.get('[data-cy="toggle-stats-button"]').click()
      cy.get('[data-cy="stats-panel"]').should('be.visible')
      
      // Click toggle to hide stats
      cy.get('[data-cy="toggle-stats-button"]').click()
      cy.get('[data-cy="stats-panel"]').should('not.exist')
    })

    it('should show continue button during gacha pull', () => {
      // Start gacha pull
      cy.get('[data-cy="gacha-pull-button"]').click()
      
      // Continue button should appear after animation
      cy.get('[data-cy="continue-button"]', { timeout: 15000 }).should('be.visible')
      
      // Click continue
      cy.get('[data-cy="continue-button"]').click()
      
      // Button should disappear
      cy.get('[data-cy="continue-button"]').should('not.exist')
    })
  })

  describe('Collection Page Elements', () => {
    beforeEach(() => {
      cy.get('[data-cy="my-collection-button"]').click()
      cy.url().should('include', '/collection')
    })

    it('should have all required data-cy attributes on collection page', () => {
      // Navigation
      cy.get('[data-cy="back-to-home-button"]').should('exist').and('be.visible')
      
      // Collection management buttons
      cy.get('[data-cy="export-collection-button"]').should('exist').and('be.visible')
      cy.get('[data-cy="import-collection-button"]').should('exist').and('be.visible')
      cy.get('[data-cy="share-collection-button"]').should('exist').and('be.visible')
      cy.get('[data-cy="clear-collection-button"]').should('exist').and('be.visible')
      
      // Filter and search elements
      cy.get('[data-cy="rarity-filter-select"]').should('exist').and('be.visible')
      cy.get('[data-cy="group-filter-select"]').should('exist').and('be.visible')
      cy.get('[data-cy="search-input"]').should('exist').and('be.visible')
      cy.get('[data-cy="sort-field-select"]').should('exist').and('be.visible')
      cy.get('[data-cy="sort-direction-button"]').should('exist').and('be.visible')
    })

    it('should show empty collection state with correct data-cy', () => {
      // Should show empty state
      cy.get('[data-cy="empty-collection"]').should('be.visible')
      cy.get('[data-cy="collection-grid"]').should('not.exist')
    })

    it('should work with search input', () => {
      // Test search input functionality
      cy.get('[data-cy="search-input"]').type('test search')
      cy.get('[data-cy="search-input"]').should('have.value', 'test search')
      
      // Clear search
      cy.get('[data-cy="search-input"]').clear()
      cy.get('[data-cy="search-input"]').should('have.value', '')
    })

    it('should toggle sort direction', () => {
      // Check initial state
      cy.get('[data-cy="sort-direction-button"]').should('contain', 'Descending')
      
      // Click to toggle
      cy.get('[data-cy="sort-direction-button"]').click()
      cy.get('[data-cy="sort-direction-button"]').should('contain', 'Ascending')
      
      // Click again to toggle back
      cy.get('[data-cy="sort-direction-button"]').click()
      cy.get('[data-cy="sort-direction-button"]').should('contain', 'Descending')
    })
  })

  describe('Collection with Items', () => {
    beforeEach(() => {
      // Add at least one item to collection
      cy.get('[data-cy="gacha-pull-button"]').click()
      cy.get('[data-cy="continue-button"]', { timeout: 15000 }).should('be.visible').click()
      cy.get('[data-cy="my-collection-button"]').click()
    })

    it('should show collection grid with items', () => {
      // Should show collection grid instead of empty state
      cy.get('[data-cy="collection-grid"]').should('be.visible')
      cy.get('[data-cy="empty-collection"]').should('not.exist')
      
      // Should have at least one collection item
      cy.get('[data-cy^="collection-item-"]').should('have.length.at.least', 1)
    })

    it('should show idol cards with view profile buttons', () => {
      // Each collection item should have an idol card
      cy.get('[data-cy^="collection-item-"]').each(($item) => {
        cy.wrap($item).within(() => {
          cy.get('[data-cy="idol-card"]').should('exist')
          cy.get('[data-cy="view-profile-button"]').should('exist').and('be.visible')
        })
      })
    })

    it('should open modal when view profile is clicked', () => {
      // Click on first item's view profile button
      cy.get('[data-cy^="collection-item-"]').first().within(() => {
        cy.get('[data-cy="view-profile-button"]').click()
      })
      
      // Modal should open
      cy.get('[data-cy="idol-detail-modal"]').should('be.visible')
      
      // Close button should exist
      cy.get('[data-cy="close-modal-button"]').should('be.visible')
      
      // Close modal
      cy.get('[data-cy="close-modal-button"]').click()
      cy.get('[data-cy="idol-detail-modal"]').should('not.exist')
    })
  })

  describe('Navigation Flow', () => {
    it('should navigate correctly between pages using data-cy attributes', () => {
      // Start at home
      cy.url().should('not.include', '/collection')
      
      // Go to collection
      cy.get('[data-cy="my-collection-button"]').click()
      cy.url().should('include', '/collection')
      
      // Go back to home
      cy.get('[data-cy="back-to-home-button"]').click()
      cy.url().should('not.include', '/collection')
      
      // Home button should also work
      cy.get('[data-cy="my-collection-button"]').click()
      cy.get('[data-cy="home-button"]').click()
      cy.url().should('not.include', '/collection')
    })
  })

  describe('Stats and Recent Pulls', () => {
    it('should show recent pulls table after multiple pulls', () => {
      // Show stats panel
      cy.get('[data-cy="toggle-stats-button"]').click()
      
      // Do multiple pulls
      for (let i = 0; i < 2; i++) {
        cy.get('[data-cy="gacha-pull-button"]').click()
        cy.get('[data-cy="continue-button"]', { timeout: 15000 }).should('be.visible').click()
        cy.wait(1000)
      }
      
      // Recent pulls table should be visible
      cy.get('[data-cy="recent-pulls-table"]').should('be.visible')
      
      // Stats panel should show updated numbers
      cy.get('[data-cy="stats-panel"]').should('contain', '2')
    })
  })
})
