import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IPathDTO from '../dto/IPathDTO';
import IPathService from '../services/IServices/IPathService';
import IPathController from './IControllers/IPathController';

@Service()
export default class PathController implements IPathController {
  constructor(@Inject(config.services.path.name) private pathServiceInstance: IPathService) {}

  public async createPath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = (await this.pathServiceInstance.createPath(req.body as IPathDTO)) as Result<IPathDTO>;
      console.log(pathOrError.getValue());
      if (pathOrError.isFailure) {
        return res.status(402).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.json(pathDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
  public async updatePath(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction,
  ) {
    try {
      const pathOrError = (await this.pathServiceInstance.updatePath(req.body as IPathDTO)) as Result<IPathDTO>;

      if (pathOrError.isFailure) {
        return res.status(404).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.status(201).json(pathDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getPaths(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = (await this.pathServiceInstance.getAllPaths(req.query.page, req.query.size)) as Result<IPathDTO[]>;
      console.log(pathOrError.getValue());
      if (pathOrError.isFailure) {
        return res.status(402).send();
      }

      const pathsDTO = pathOrError.getValue();
      return res.status(201).json(pathsDTO);
    } catch (e) {
      return res.status(404).json('Not Found');
    }
  }
}
