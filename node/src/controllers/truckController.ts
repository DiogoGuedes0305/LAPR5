import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITruckController from "./IControllers/ITruckController";
import ITruckService from '../services/IServices/ITruckService';
import ITruckDTO from '../dto/ITruckDTO';

import { Result } from "../core/logic/Result";
import { TruckPlate } from '../domain/truck/truckPlate';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class TruckController implements ITruckController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.truck.name) private truckServiceInstance : ITruckService
  ) {}

  public async createTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.createTruck(req.body as ITruckDTO) as Result<ITruckDTO>;
        
      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.json( truckDTO ).status(201);
    }
    catch (e) {
      console.log(e);
      return next(e);
    }
  };


  public async deleteTruckByPlate(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.deleteTruck(req.body.truckPlate) as Result<String>;
      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      return res.status(201).json(truckOrError.getValue());
    } catch (e) {
      console.log(e);
      return res.status(404).json("Not Found");
    }
  };


  public async updateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.updateTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(201).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getActiveTrucks(req: Request, res: Response, next: NextFunction){
    try {
      const truckOrError = await this.truckServiceInstance.getActiveTrucks(req.query.page, req.query.size) as Result<ITruckDTO[]>;

      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      const trucksDTO = truckOrError.getValue();
      return res.status(201).json(trucksDTO);
    } catch (e) {
      return res.status(404).json("Not Found");
    }
  };

  public async getTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.getAllTrucks(req.query.page, req.query.size) as Result<ITruckDTO[]>;

      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      const trucksDTO = truckOrError.getValue();
      return res.status(201).json(trucksDTO);
    } catch (e) {
      return res.status(404).json("Not Found");
    }
  };

  public async getTruckByPlate(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.getTruck(req.body.truckPlate) as Result<ITruckDTO>;
      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      const trucksDTO = truckOrError.getValue();
      return res.status(201).json(trucksDTO);
    } catch (e) {
      console.log(e);
      return res.status(404).json("Not Found");
    }
  };

  public async inhibitTruckByPlate(req: Request, res:Response, next: NextFunction){
    console.log("Controller");
    try {
      const truckOrError = await this.truckServiceInstance.inhibitTruck(req.body.truckPlate) as Result<Boolean>;
      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      return res.status(201).json("Truck was hiden with success");
    } catch (e) {
      console.log(e);
      return res.status(404).json("Not Found");
    }
  }
}