import { Truck } from '../../../src/domain/truck/truck';


import{ expect} from 'chai'
import ITruckDTO from '../../../src/dto/ITruckDTO'
import { TruckPlate } from '../../../src/domain/truck/truckPlate';


describe ("Create Truck",()=>{

  
    it("Truck plate should be the same",async()=>{
        let truckDto={"truckPlate":"24-MT-77",
        "truckAutonomyWithCargo":1,
        "truckBatteryEnergy":1,
        "truckCargoCapacity":1,
        "truckFastRechargeTime":1,
        "truckTare":1} as ITruckDTO;
        const truck=Truck.create(true,truckDto);
        expect(truck.getValue().truckPlate.value).to.equal("24-MT-77");
    });

    it("Truck Autonomy with Cargo should be the same", async() =>{
        let truckDto={"truckPlate":"24-MT-77",
        "truckAutonomyWithCargo":55,
        "truckBatteryEnergy":1,
        "truckCargoCapacity":1,
        "truckFastRechargeTime":1,
        "truckTare":1} as ITruckDTO;
        const truck=Truck.create(true,truckDto);
        expect(truck.getValue().truckAutonomyWithCargo.value).to.equal(55);
    });

    it("Truck Battery Energy should be the same", async() =>{
        let truckDto={"truckPlate":"24-MT-77",
        "truckAutonomyWithCargo":55,
        "truckBatteryEnergy":28,
        "truckCargoCapacity":1,
        "truckFastRechargeTime":1,
        "truckTare":1} as ITruckDTO;
        const truck=Truck.create(true,truckDto);
        expect(truck.getValue().truckBatteryEnergy.value).to.equal(28);
    });

    it("Truck Cargo Capacity should be the same", async() =>{
        let truckDto={"truckPlate":"24-MT-77",
        "truckAutonomyWithCargo":55,
        "truckBatteryEnergy":1,
        "truckCargoCapacity":39,
        "truckFastRechargeTime":1,
        "truckTare":1} as ITruckDTO;
        const truck=Truck.create(true,truckDto);
        expect(truck.getValue().truckCargoCapacity.value).to.equal(39);
    });

    it("Truck Fast Recharge Time should be the same", async() =>{
        let truckDto={"truckPlate":"24-MT-77",
        "truckAutonomyWithCargo":55,
        "truckBatteryEnergy":1,
        "truckCargoCapacity":1,
        "truckFastRechargeTime":20,
        "truckTare":1} as ITruckDTO;
        const truck=Truck.create(true,truckDto);
        expect(truck.getValue().truckFastRechargeTime.value).to.equal(20);
    });

    it("Truck Tare should be the same", async() =>{
        let truckDto={"truckPlate":"24-MT-77",
        "truckAutonomyWithCargo":55,
        "truckBatteryEnergy":1,
        "truckCargoCapacity":1,
        "truckFastRechargeTime":1,
        "truckTare":15} as ITruckDTO;
        const truck=Truck.create(true,truckDto);
        expect(truck.getValue().truckTare.value).to.equal(15);
    });
});