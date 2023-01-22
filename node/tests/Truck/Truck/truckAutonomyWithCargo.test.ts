import { TruckAutonomyWithCargo} from '../../../src/domain/truck/truckAutonomyWithCargo';


import{ expect} from 'chai'
import { Truck } from '../../../src/domain/truck/truck';


describe ("Create Truck Autonomy With Cargo",()=>{


    it("Truck Autonomy should be 20",async()=>{
        const truckAutonomyWithCargo = TruckAutonomyWithCargo.create(20);
        expect(truckAutonomyWithCargo.getValue().value).to.equal(20);
    });

});

/*describe ("Create an invalid Truck Autonomy With Cargo",()=>{


    it("Truck autonomy should be 0 or less",async()=>{
        const truckAutonomyWithCargo = TruckAutonomyWithCargo.create(0);
        expect(truckAutonomyWithCargo.isFailure).to.equal('Truck Autonomy must be greater than 0');
    });

});

describe ("Create an invalid Truck Autonomy With Cargo",()=>{
    it("Truck Autonomy should be null",async()=>{
        const truckAutonomyWithCargo = TruckAutonomyWithCargo.create(NaN);
        expect(truckAutonomyWithCargo.isFailure).to.equal('Truck Autonomy must be greater than 0');
    });
});*/
