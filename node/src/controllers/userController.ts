import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";

import IUserController from "./IControllers/IUserController";
import IUserService from '../services/IServices/IUserService';
import IUserDTO from '../dto/IUserDTO';

import { Result } from "../core/logic/Result";


export default class UserController implements IUserController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.user.name) private userServiceInstance : IUserService
) {}
public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.createUser(req.body as IUserDTO) as unknown as Result<IUserDTO>;
        
      if (userOrError.isFailure) {
        return res.status(402).send();
      }

      const userDTO = userOrError.getValue();
      return res.json( userDTO ).status(201);
    }
    catch (e) {
      console.log(e);
      return next(e);
    }
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password} = req.body;
      const userOrError = await this.userServiceInstance.login(email,password) as unknown as Result<IUserDTO>;
        
      if (userOrError.isFailure) {
        return res.status(402).send();
      }

      const userDTO = userOrError.getValue();
      return res.json( userDTO ).status(201);
    }
    catch (e) {
      console.log(e);
      return next(e);
    }
  }
  public async loginSSO(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, token} = req.body;
      const userOrError = await this.userServiceInstance.loginSSO(email,token) as unknown as Result<IUserDTO>;
        
      if (userOrError.isFailure) {
        return res.status(402).send();
      }

      const userDTO = userOrError.getValue();
      return res.json( userDTO ).status(201);
    }
    catch (e) {
      console.log(e);
      return next(e);
    }
  }
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.deleteUser(req.body as string) as unknown as Result<IUserDTO>;
        
      if (userOrError.isFailure) {
        return res.status(402).send();
      }

      const userDTO = userOrError.getValue();
      return res.json( userDTO ).status(201);
    }
    catch (e) {
      console.log(e);
      return next(e);
    }
  }
  // NB: a arquitetura ONION não está a ser seguida aqui

};
