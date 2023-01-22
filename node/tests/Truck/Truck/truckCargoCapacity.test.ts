import { TruckCargoCapacity} from '../../../src/domain/truck/truckCargoCapacity';


import{ expect} from 'chai'


describe ("Create TruckCargoCapacity",()=>{


    it("truckCargoCapacity should be 1",async()=>{
        const truckCargoCapacity = TruckCargoCapacity.create(1);
        expect(truckCargoCapacity.getValue().value).to.equal(1);
    });

});

describe ("Create an invalid truckCargoCapacity",()=>{


    it("truckCargoCapacity should be less then 0",async()=>{
        const truckCargoCapacity = TruckCargoCapacity.create(-1);
        expect(truckCargoCapacity.isFailure).to.equal(true);
    });

});

describe ("Create an invalid truckCargoCapacity",()=>{


    it("truckCargoCapacity should be null",async()=>{
        const truckCargoCapacity = TruckCargoCapacity.create(NaN);
        expect(truckCargoCapacity.isFailure).to.equal(false);
    });

});
