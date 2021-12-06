/// <reference types="cypress" />

it('checks out', () => {
  cy.visit('site/index.html')
  // at first nothing is checked
  cy.get('#tall').should('not.be.checked')
})
