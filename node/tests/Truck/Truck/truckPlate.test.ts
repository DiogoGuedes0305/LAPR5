import { TruckPlate} from '../../../src/domain/truck/truckPlate';


import{ expect} from 'chai'


describe ("Create truckPlate",()=>{


    it("truckPlate should be 1",async()=>{
        const truckTruckPlate=TruckPlate.create("24-MT-77");
        expect(truckTruckPlate.getValue().value).to.equal("24-MT-77");
    });

});

describe ("Create an invalid truckPlate",()=>{


    it("truckPlate should be null",async()=>{
        const truckPlate=TruckPlate.create("");
        expect(truckPlate.isFailure).to.equal(true);
    });

});
