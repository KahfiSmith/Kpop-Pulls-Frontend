describe('Local Storage Functionality', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should save pulled idols to localStorage', () => {
    // Perform a gacha pull
    cy.get('[data-cy=gacha-pull-button]').click()
    cy.waitForAnimation(3000)
    
    // Check if localStorage was updated
    cy.window().then((win) => {
      const collection = JSON.parse(win.localStorage.getItem('kpop-pulls-collection') || '[]')
      expect(collection).to.have.length.at.least(1)
    })
  })

  it('should persist collection across page reloads', () => {
    // Perform a pull
    cy.get('[data-cy=gacha-pull-button]').click()
    cy.waitForAnimation(3000)
    
    // Store the current collection
    cy.window().then((win) => {
      const collection = JSON.parse(win.localStorage.getItem('kpop-pulls-collection') || '[]')
      cy.wrap(collection.length).as('initialLength')
    })
    
    // Reload page
    cy.reload()
    
    // Go to collection page
    cy.visit('/collection')
    
    // Verify collection is still there
    cy.get('@initialLength').then((length) => {
      cy.get('[data-cy=collected-idol]').should('have.length', length)
    })
  })

  it('should handle localStorage quota exceeded', () => {
    // This is a more advanced test - fill localStorage to capacity
    cy.window().then((win) => {
      try {
        // Try to fill localStorage
        const largeData = 'x'.repeat(1024 * 1024) // 1MB string
        for (let i = 0; i < 10; i++) {
          win.localStorage.setItem(`test-data-${i}`, largeData)
        }
      } catch (e) {
        // Expected to fail at some point
      }
    })
    
    // Try to perform gacha pull - should still work gracefully
    cy.get('[data-cy=gacha-pull-button]').click()
    cy.waitForAnimation(3000)
    
    // Should not crash the app
    cy.get('[data-cy=idol-card]').should('be.visible')
  })
})
