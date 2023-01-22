import { Request, Response, NextFunction } from 'express';

export default interface ITruckController  {
    createTruck(req: Request, res: Response, next: NextFunction);
    updateTruck(req: Request, res: Response, next: NextFunction);
    getTrucks(req:Request, res: Response, next: NextFunction);
    getTruckByPlate(req:Request, res: Response, next: NextFunction);
    deleteTruckByPlate(req:Request, res: Response, next: NextFunction);
    inhibitTruckByPlate(req:Request, res:Response, next: NextFunction);
    getActiveTrucks(req:Request, res:Response, next: NextFunction);
  }