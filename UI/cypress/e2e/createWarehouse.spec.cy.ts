beforeEach(() =>{
    cy.visit('/')
    cy.wait(1000)
    
})


describe(' Creates a Warehouse and Checks if Created', () => {
    it(' Create Warehouse', () => {
      cy.visit('/createWarehouse')
      cy.wait(1000)
      cy.title().should('equal', 'EletricGo')
      cy.get("#warehouseDescription").type("w6")
      cy.get("#warehouseAddress").type("rua 6")
      cy.get("#warehouseLat").type("55")
      cy.get("#warehouseLong").type("50")
      cy.get("#warehouseHeigth").type("22")
      cy.get("#createWarehouse").click()
      cy.wait(1000)
      cy.visit('/warehouse')
      cy.contains('w6')
      
    })
  })