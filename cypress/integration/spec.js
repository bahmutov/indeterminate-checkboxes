/// <reference types="cypress" />

it('checks out', () => {
  cy.visit('site/index.html')
  // at first nothing is checked
  cy.get('#tall').should('not.be.checked')
  cy.get('#buildings').check().should('be.checked')
  // how to check the status of the parent indeterminate checkbox?
  cy.get('#tall')
    .should('not.be.checked')
    // only by getting its prop we can confirm its status
    .and('have.prop', 'indeterminate', true)

  // checking the box removes the indeterminate state
  cy.get('#tall')
    .check()
    .should('be.checked')
    .and('have.prop', 'indeterminate', false)
  // all children boxes are checked
  const selectors = [
    '#buildings',
    '#giants',
    '#andre',
    '#paul',
    '#two-sandwiches',
  ]
  selectors.forEach((selector) => {
    cy.get(selector).should('be.checked')
  })

  cy.log('uncheck the giants')
  cy.get('#giants').uncheck().should('not.be.checked')
  // other children boxes are still checked
  cy.get('#buildings').should('be.checked')
  cy.get('#two-sandwiches').should('be.checked')
  cy.get('#tall').should('have.prop', 'indeterminate', true)

  // "be.checked" is really checking the DOM element property "checked"
  cy.get('#buildings')
    .should('be.checked')
    // equivalent
    .and('have.prop', 'checked', true)
})
