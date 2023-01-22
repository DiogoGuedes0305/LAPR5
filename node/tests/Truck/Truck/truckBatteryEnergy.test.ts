import { TruckBatteryEnergy} from '../../../src/domain/truck/truckBatteryEnergy';


import{ expect} from 'chai'


describe ("Create TruckBatteryEnergy",()=>{


    it("Truck Battery Energy",async()=>{
        const truckBatteryEnergy = TruckBatteryEnergy.create(20);
        expect(truckBatteryEnergy.getValue().value).to.equal(20);
    });

});

describe ("Create an invalid Truck Battery Energy",()=>{


    it("Truck Battery Energy should be zero",async()=>{
        const truckBatteryEnergy = TruckBatteryEnergy.create(0);
        expect(truckBatteryEnergy.isFailure).to.equal(false);
    });

});

describe ("Create an invalid Truck Battery Energy",()=>{


    it("Truck Battery Energy should be null",async()=>{
        const truckBatteryEnergy = TruckBatteryEnergy.create(NaN);
        expect(truckBatteryEnergy.isFailure).to.equal(false);
    });

});
