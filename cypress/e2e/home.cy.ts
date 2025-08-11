describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the home page correctly', () => {
    // Check if the page loads
    cy.contains('KPop Pulls').should('be.visible')
    
    // Check if gacha machine or pull button exists
    cy.get('[data-cy="gacha-pull-button"]', { timeout: 10000 }).should('be.visible')
  })

  it('should display gacha machine', () => {
    // Check if gacha machine image is visible
    cy.get('img[alt*="gacha"]', { timeout: 10000 }).should('be.visible')
  })

  it('should have navigation to collection', () => {
    // Check if collection link exists and is clickable using data-cy
    cy.get('[data-cy="my-collection-button"]').should('be.visible').click()
    cy.url().should('include', '/collection')
  })

  it('should have working navigation buttons', () => {
    // Test home button
    cy.get('[data-cy="home-button"]').should('be.visible').and('contain', 'Home')
    
    // Test collection button
    cy.get('[data-cy="my-collection-button"]').should('be.visible').and('contain', 'My Collection')
  })

  it('should have mute and stats toggle buttons', () => {
    // Check if mute button exists
    cy.get('[data-cy="toggle-mute-button"]').should('be.visible')
    
    // Check if stats toggle button exists
    cy.get('[data-cy="toggle-stats-button"]').should('be.visible')
  })
})
