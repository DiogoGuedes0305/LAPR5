beforeEach(() =>{
    cy.visit('/')
    cy.wait(1000)
})


describe(' Creates a truck and Checks if Created', () => {
    it(' Create Truck', () => {
      cy.visit('/createTruck')
      cy.wait(1000)
      cy.title().should('equal', 'EletricGo')
      cy.get("#truckPlate").type("AX-55-HU")
      cy.get("#truckAutonomyWithCargo").type("33")
      cy.get("#truckBatteryEnergy").type("55")
      cy.get("#truckCargoCapacity").type("4000")
      cy.get("#truckFastRechargeTime").type("22")
      cy.get("#truckTare").type("55")
      cy.get("#createTruck").click()
      cy.wait(1000)
      cy.visit('/trucks')
      cy.contains('AX-55-HU')
      cy.wait(1000)
      cy.get("#deleteTruck_AX-55-HU").click()
      cy.wait(1000)
    })

    it(' Creates Bad Truck', () => {
      cy.visit('/createTruck')
      cy.wait(1000)
      cy.title().should('equal', 'EletricGo')
      cy.get("#truckPlate").type("AX-55-HU9KL")
      cy.get("#truckAutonomyWithCargo").type("33")
      cy.get("#truckBatteryEnergy").type("55")
      cy.get("#truckCargoCapacity").type("4000")
      cy.get("#truckFastRechargeTime").type("22")
      cy.get("#truckTare").type("55")
      cy.get("#createTruck").click()
      cy.wait(1000)
    })

    it(' Create Truck and Inhibit', () => {
      cy.visit('/createTruck')
      cy.wait(1000)
      cy.title().should('equal', 'EletricGo')
      cy.get("#truckPlate").type("AX-55-HU")
      cy.get("#truckAutonomyWithCargo").type("33")
      cy.get("#truckBatteryEnergy").type("55")
      cy.get("#truckCargoCapacity").type("4000")
      cy.get("#truckFastRechargeTime").type("22")
      cy.get("#truckTare").type("55")
      cy.get("#createTruck").click()
      cy.wait(1000)
      cy.visit('/trucks')
      cy.get("#deactivateActivateTruck_AX-55-HU").click()
      cy.wait(1000)
      cy.reload();
      cy.visit('/activeTrucks')
      cy.should('not.contain','AX-55-HU')

    })
  })

  