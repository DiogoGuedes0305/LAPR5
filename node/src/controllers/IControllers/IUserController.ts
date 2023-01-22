import { Request, Response, NextFunction } from 'express';

export default interface IUserController  {
    createUser(req: Request, res: Response, next: NextFunction);
    login(req:Request, res: Response, next: NextFunction);
    loginSSO(req:Request, res: Response, next: NextFunction);
    deleteUser(req:Request, res:Response, next: NextFunction);
    
  }