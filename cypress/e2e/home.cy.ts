/// <reference types="cypress" />

describe('home spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.findByLabelText('Vou trabalhar em').type('Estudo')
    cy.findByLabelText('durante').type('30')
    cy.findByRole('button', { name: 'Começar' }).click()

    cy.findByRole('button', { name: 'Interromper' }).should('be.visible')
  })
})
