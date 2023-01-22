beforeEach(() =>{
    cy.visit('/')
    cy.wait(1000)
})


describe(' Gets Best Planing Solution', () => {
    it(' Best Solution', () => {
      cy.visit('/planing')
      cy.wait(1000)
      cy.title().should('equal', 'EletricGo')
      cy.get('#truckPlate').type('eTruck01')
      cy.get('#date').type('20221205')
      cy.get('[type="radio"]').first().check()
      cy.get('#getPath').click()
      cy.wait(1000)
    })
  })