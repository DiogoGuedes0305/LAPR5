import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import TruckService from "../../../src/services/truckService";
import ITruckDTO from '../../../src/dto/ITruckDTO';
import ITruckRepo from '../../../src/services/IRepos/ITruckRepo';
import { Truck } from "../../../src/domain/truck/truck";
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { TruckPlate } from '../../../src/domain/truck/truckPlate';
import { ITruckPersistence } from '../../../src/dataschema/ITruckPersistence';

describe('truck Service', function () {
    beforeEach(function () {
        let truckSchemaInstance = require("../../../src/persistence/schemas/truckSchema").default;
        Container.set("truckSchema", truckSchemaInstance);

        let truckRepoClass = require("../../../src/repos/truckRepo").default;
        let truckRepoInstance = Container.get(truckRepoClass);
        Container.set("TruckRepo", truckRepoInstance);
    });

    /*it('returns dto with id+truckAutonomyWithCargo+truckBatteryEnergy+truckCargoCapacity+truckTare+truckFastRechargeTime+truckPlate values when create', async function () {

        let truckDTO = {
            "id": "1",
            "truckPlate": '33-XX-66',
            "truckBatteryEnergy": 1,
            "truckAutonomyWithCargo": 1,
            "truckCargoCapacity": 1,
            "truckFastRechargeTime": 1,
            "truckTare": 1
        };

        let truckRepoInstance = Container.get("TruckRepo");
        sinon.stub(truckRepoInstance, "save").returns(Result.ok<Truck>());

        const Service = new TruckService(truckRepoInstance as ITruckRepo);

        let res = await Service.createTruck(truckDTO as ITruckDTO);

        sinon.assert.match((res.getValue() as ITruckDTO), (truckDTO as ITruckDTO));
    });*/

    /*it('returns dto with id+truckPlate+truckAutonomyWithCargo+truckBatteryEnergy+truckCargoCapacity+truckFastRechargeTime+truckTare values when update', async function () {

        let truckDTO = {
            "id": "1",
            "truckPlate": '33-XX-66',
            "truckBatteryEnergy": 1,
            "truckAutonomyWithCargo": 1,
            "truckCargoCapacity": 1,
            "truckFastRechargeTime": 1,
            "truckTare": 1
        };


        let truckRepoInstance = Container.get("TruckRepo");
        sinon.stub(truckRepoInstance, "findByPlate").returns(Truck.create(truckDTO, new UniqueEntityID(truckDTO.id)).getValue());



        const Service = new TruckService(truckRepoInstance as ITruckRepo);

        let res = await Service.updateTruck(truckDTO as ITruckDTO);

        sinon.assert.match((res.getValue() as ITruckDTO), (truckDTO as ITruckDTO));
    });*/

    /*it('get all trucks', async function () {

        let truckDTO = {
            "id": "1",
            "truckPlate": '33-XX-66',
            "truckAutonomyWithCargo": 1,
            "truckBatteryEnergy": 1,
            "truckCargoCapacity": 1,
            "truckFastRechargeTime": 1,
            "truckTare": 1
        } as ITruckDTO;
        let truckDTO1 = {
            "id": "2",
            "truckPlate": '33-XX-66',
            "truckAutonomyWithCargo": 1,
            "truckBatteryEnergy": 1,
            "truckCargoCapacity": 1,
            "truckFastRechargeTime": 1,
            "truckTare": 1
        } as ITruckDTO;


        let lista: { "truck"}[] = [{ "domainId" : "1", },
        { "truck": Truck.create(truckDTO1, new UniqueEntityID(truckDTO1.id)).getValue() }];
        console.log(lista)
        let rest: { "truckdto": ITruckDTO }[] = [{ "truckdto": truckDTO }, { "truckdto": truckDTO1 }];
        

        let truckRepoInstance = Container.get("TruckRepo");
        sinon.stub(truckRepoInstance, "findAllTrucks").returns(lista);

        const Service = new TruckService(truckRepoInstance as ITruckRepo);
        let res = await Service.getAllTrucks();
        sinon.assert.match((res.getValue()), (rest));
    });*/

    /*it('get truck by truckPlate', async function () {

        let truckPlate = "33-XX-66";
        let truckDTO = {
            "id": "1",
            "name": 'truck',
            "truckBatteryEnergy": 1,
            "truckAutonomyWithCargo": 1,
            "truckCargoCapacity": 1,
            "truckTare": 1,
            "truckFastRechargeTime": 1,
            "truckPlate": '33-XX-66'
        } as ITruckDTO;

        let truck = Truck.create(truckDTO, new UniqueEntityID(truckDTO.id)).getValue() as Truck;

        let truckSchemaInstance = require("../../../../src/persistence/schemas/truckSchema").default;
        Container.set("truckSchema", truckSchemaInstance);

        let truckRepoClass = require("../../../../src/repos/truckRepo").default;
        let truckRepoInstance = Container.get(truckRepoClass);
        Container.set("TruckRepo", truckRepoInstance);
        truckRepoInstance = Container.get("TruckRepo");
        // sinon.stub(truckRepoInstance, "findByPlate").returns(truck);



        const Service = new TruckService(truckRepoInstance as ITruckRepo);

        let res = await Service.getTruck(truckPlate);

        sinon.assert.match((res.getValue() as ITruckDTO), (truckDTO as ITruckDTO));
    });*/

});