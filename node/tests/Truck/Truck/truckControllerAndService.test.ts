/*import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import ITruckService from "../../../src/services/IServices/ITruckService";
import TruckController from "../../../src/controllers/truckController";
import ITruckDTO from '../../../src/dto/ITruckDTO';

describe('truck controller', function () {
    beforeEach(function () {
        Container.reset();
        let truckSchemaInstance = require("../../../src/persistence/schemas/truckSchema").default;
        Container.set("truckSchema", truckSchemaInstance);

        let truckRepoClass = require("../../../src/repos/truckRepo").default;
        let truckRepoInstance = Container.get(truckRepoClass);
        Container.set("TruckRepo", truckRepoInstance);

        let truckServiceClass = require("../../../src/services/truckService").default;
        let truckServiceInstance = Container.get(truckServiceClass);
        Container.set("TruckService", truckServiceInstance);
    });

    afterEach(()=>{
        sinon.restore();
    })

    //Testing createTruck
    it('returns json with id+truckPlate+truckAutonomy+truckBatteryEnergy+truckCargoCapacity+truckFastRechargeTime+truckTare values when create', async function () {
        let body = {
            "truckPlate": "88-XC-12",
            "truckAutonomyWithCargo": "1",
            "truckBatteryEnergy": "1",
            "truckCargoCapacity": "1",
            "truckFastRechargeTime": "1",
            "truckTare": "1",
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let truckServiceInstance = Container.get("TruckService")


        sinon.stub(truckServiceInstance, "createTruck").returns(Result.ok<ITruckDTO>({
            "id": "123", "truckPlate": req.body.truckPlate,
            "truckAutonomyWithCargo": req.body.truckAutonomyWithCargo,
            "truckBatteryEnergy": req.body.truckBatteryEnergy,
            "truckCargoCapacity": req.body.truckCargoCapacity,
            "truckFastRechargeTime": req.body.truckFastRechargeTime,
            "truckTare": req.body.truckTare,
        }));

        const ctrl = new TruckController(truckServiceInstance as ITruckService);

        await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "id": "123", "truckPlate": req.body.truckPlate,
            "truckAutonomyWithCargo": req.body.truckAutonomyWithCargo,
            "truckBatteryEnergy": req.body.truckBatteryEnergy,
            "truckCargoCapacity": req.body.truckCargoCapacity,
            "truckFastRechargeTime": req.body.truckFastRechargeTime,
            "truckTare": req.body.truckTare,
        }));
    });


    //Testing updateTruck
    it('returns json with id+truckPlate+truckAutonomyWithCargo+truckBatteryEnergy+truckCargoCapacity+truckFastRechargeTime+truckTare values when updateTruck', async function () {
        let body = {
            "truckPlate": "88-XC-12",
            "truckAutonomyWithCargo": "1",
            "truckBatteryEnergy": "1",
            "truckCargoCapacity": "1",
            "truckFastRechargeTime": "1",
            "truckTare": "1",
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let truckServiceInstance = Container.get("TruckService");
        sinon.stub(truckServiceInstance, "updateTruck").returns(Result.ok<ITruckDTO>({
            "id": "123", "truckPlate": req.body.truckPlate,
            "truckAutonomyWithCargo": req.body.truckAutonomyWithCargo,
            "truckBatteryEnergy": req.body.truckBatteryEnergy,
            "truckCargoCapacity": req.body.truckCargoCapacity,
            "truckFastRechargeTime": req.body.truckFastRechargeTime,
            "truckTare": req.body.truckTare,
        }));

        const ctrl = new TruckController(truckServiceInstance as ITruckService);

        await ctrl.updateTruck(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "id": "123", "truckPlate": req.body.truckPlate,
            "truckAutonomyWithCargo": req.body.truckAutonomyWithCargo,
            "truckBatteryEnergy": req.body.truckBatteryEnergy,
            "truckCargoCapacity": req.body.truckCargoCapacity,
            "truckFastRechargeTime": req.body.truckFastRechargeTime,
            "truckTare": req.body.truckTare,
        }));
    });

    /*it('returns json with id+name+truckAutonomyWithCargo+truckBatteryEnergy+truckCargoCapacity+truckTare+truckFastRechargeTime+truckPlate values when get truck', async function () {
        let body = {"truckPlate":"truck2s1254511" 
       };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => {};

        let truckSchemaInstance = require("../../../../src/persistence/schemas/truckSchema").default;
        Container.set("truckSchema", truckSchemaInstance);

        let truckRepoClass = require("../../../../src/repos/truckRepo").default;
        let truckRepoInstance = Container.get(truckRepoClass);
        

        let truckServiceClass = require("../../../../src/services/truckService").default;
        let truckServiceInstance = Container.get(truckServiceClass);
        Container.set("TruckService", truckServiceInstance);

        truckServiceInstance = Container.get("TruckService");
        sinon.stub(truckServiceInstance, "getTruck").returns( Result.ok<ITruckDTO>( {"truckPlate":req.body.truckPlate,"id":"123",
        "truckAutonomyWithCargo":req.body.truckAutonomyWithCargo,
        "truckBatteryEnergy":req.body.truckBatteryEnergy,
        "truckCargoCapacity":req.body.truckCargoCapacity,
        "truckTare":req.body.truckTare,
        "truckFastRechargeTime":req.body.truckFastRechargeTime} ));

        const ctrl = new TruckController(truckServiceInstance as ITruckService);

        await ctrl.getTruck(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({"truckPlate":req.body.truckPlate,"id":"123",
        "truckAutonomyWithCargo":req.body.truckAutonomyWithCargo,
        "truckBatteryEnergy":req.body.truckBatteryEnergy,
        "truckCargoCapacity":req.body.truckCargoCapacity,
        "truckTare":req.body.truckTare,
        "truckFastRechargeTime":req.body.truckFastRechargeTime,
      }));
    });

    it('returns json with id+truckPlate+truckAutonomyWithCargo+truckBatteryEnergy+truckCargoCapacity+truckFastRechargeTime+truckTare values when get all trucks', async function () {
        let body = {
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

       

        let truckServiceInstance = Container.get("TruckService");
        let lista: {
            "id": string, "truckPlate": string, "truckBatteryEnergy": number, "truckAutonomyWithCargo": number;
            "truckCargoCapacity": number, "truckTare": number; "truckFastRechargeTime": number
        }[] = [{
            "id": "1",
            "truckPlate": "99-XX-99",
            "truckAutonomyWithCargo": 1,
            "truckBatteryEnergy": 1,
            "truckCargoCapacity": 1,
            "truckFastRechargeTime": 1,
            "truckTare": 1,
        }, {
            "id": "1",
            "truckPlate": "24-MT-77",
            "truckAutonomyWithCargo": 1,
            "truckBatteryEnergy": 1,
            "truckCargoCapacity": 1,
            "truckFastRechargeTime": 1,
            "truckTare": 1
        }];

        sinon.stub(truckServiceInstance, "getAllTrucks").returns(Result.ok<ITruckDTO[]>(lista
        ));

        const ctrl = new TruckController(truckServiceInstance as ITruckService);

        await ctrl.getTrucks(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(lista,));
    });
});*/

