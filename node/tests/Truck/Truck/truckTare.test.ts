import { TruckTare} from '../../../src/domain/truck/truckTare';


import{ expect} from 'chai'


describe ("Create truckTruckTare",()=>{


    it("truckTare should be 1",async()=>{
        const truckTare=TruckTare.create(1);
        expect(truckTare.getValue().value).to.equal(1);
    });

});

describe ("Create an invalid truckTare",()=>{


    it("truckTare should be null",async()=>{
        const truckTare=TruckTare.create(-1);
        expect(truckTare.isFailure).to.equal(true);
    });

});
