import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from '../../../config';
import IPathController from '../../controllers/IControllers/IPathController';

const route = Router();

export default (app: Router) => {
  app.use('/path', route);

  const ctrl = Container.get(config.controllers.path.name) as IPathController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        distance: Joi.number().required(),
        energyExpended: Joi.number().required(),
        warehouseArrival: Joi.string().required(),
        warehouseDeparture: Joi.string().required(),
        time: Joi.number().required(),
        extraTime: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.createPath(req, res, next),
  );

  route.put(
    '',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        distance: Joi.number().required(),
        energyExpended: Joi.number().required(),
        warehouseArrival: Joi.string().required(),
        warehouseDeparture: Joi.string().required(),
        time: Joi.number().required(),
        extraTime: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.updatePath(req, res, next),
  );

  route.get('',celebrate({
    query: Joi.object({
      page: Joi.number().required(),
      size: Joi.number().required()
    })
  }),
   (req, res, next) => ctrl.getPaths(req, res, next));
};
