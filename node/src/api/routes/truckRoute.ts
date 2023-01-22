import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController';

import config from "../../../config";
import { TruckPlate } from '../../domain/truck/truckPlate';

const route = Router();

export default (app: Router) => {
  app.use('/trucks', route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  route.post('',
    celebrate({
      body: Joi.object({
        truckPlate: Joi.string().required(),
        truckAutonomyWithCargo: Joi.number().required(),
        truckBatteryEnergy: Joi.number().required(),
        truckCargoCapacity: Joi.number().required(),
        truckFastRechargeTime: Joi.number().required(),
        truckTare: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next));

  route.patch('',
    celebrate({
      body: Joi.object({
        truckPlate: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.inhibitTruckByPlate(req, res, next)
  );

  route.delete('',
      celebrate({
        body:Joi.object({
          truckPlate: Joi.string().required(),
        })
      }),
      (req, res, next) => ctrl.deleteTruckByPlate(req, res, next));


  //TODO finish edit JOI
  route.put('',
    celebrate({
      body: Joi.object({
        truckPlate: Joi.string().required(),
        truckAutonomyWithCargo: Joi.number(),
        truckBatteryEnergy: Joi.number(),
        truckCargoCapacity: Joi.number(),
        truckFastRechargeTime: Joi.number(),
        truckTare: Joi.number()
      }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next));
 

  route.get('',
    celebrate({
      query: Joi.object({
        page: Joi.number().required(),
        size: Joi.number().required()
      })
    }),
  (req, res, next) => ctrl.getTrucks(req, res, next));

  route.get('/activeTrucks',
    celebrate({
      query: Joi.object({
        page: Joi.number().required(),
        size: Joi.number().required(),
      })
    }),
  
  (req,res,next) => ctrl.getActiveTrucks(req,res,next));

  route.get('/:truckPlate',celebrate({
    body: Joi.object({
      truckPlate: Joi.string().required(),
    }),
  }),(req, res, next) => ctrl.getTruckByPlate(req, res, next));

};