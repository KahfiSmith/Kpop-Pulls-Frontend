// ***********************************************************
// This example support/commands.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/custom-commands
// ***********************************************************

// Custom commands for your app
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     */
    getByCy(value: string): Chainable<JQuery<HTMLElement>>
    
    /**
     * Custom command to click gacha pull button
     */
    pullGacha(): Chainable<JQuery<HTMLElement>>
    
    /**
     * Custom command to wait for animations
     */
    waitForAnimation(duration?: number): Chainable<undefined>
  }
}

// Select element by data-cy attribute
Cypress.Commands.add('getByCy', (selector: string) => {
  return cy.get(`[data-cy=${selector}]`)
})

// Custom command for gacha pull
Cypress.Commands.add('pullGacha', () => {
  return cy.get('[data-cy=gacha-pull-button]').click()
})

// Wait for animations
Cypress.Commands.add('waitForAnimation', (duration = 1000) => {
  return cy.wait(duration)
})
