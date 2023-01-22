import { TruckFastRechargeTime} from '../../../src/domain/truck/truckFastRechargeTime';


import{ expect} from 'chai'


describe ("Create TruckFastRechargeTime",()=>{


    it("TruckFastRechargeTime should be 1",async()=>{
        const truckFastRechargeTime=TruckFastRechargeTime.create(1);
        expect(truckFastRechargeTime.getValue().value).to.equal(1);
    });

});

describe ("Create an invalid TruckFastRechargeTime",()=>{


    it("TruckFastRechargeTime should be less then 0",async()=>{
        const truckFastRechargeTime=TruckFastRechargeTime.create(-1);
        expect(truckFastRechargeTime.isFailure).to.equal(true);
    });

});

describe ("Create an invalid TruckFastRechargeTime",()=>{


    it("TruckFastRechargeTime should be null",async()=>{
        const truckFastRechargeTime=TruckFastRechargeTime.create(NaN);
        expect(truckFastRechargeTime.isFailure).to.equal(false);
    });

});
