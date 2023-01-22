import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IUserController} from '../../controllers/IControllers/IUserController'
import AuthService from '../../services/userService';
import { IUserDTO } from '../../dto/IUserDTO';

import config from "../../../config";
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');

var user_controller = require('../../controllers/userController');

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);
  const ctrl = Container.get(config.controllers.user.name) as IUserController;
  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        phoneNumber: Joi.string.require(),
      }),
    }),
    (req, res, next) => ctrl.createUser(req, res, next));

  route.post(
    '/login',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.login(req, res, next));


  route.post(
      '/loginSSO',
      celebrate({
        body: Joi.object({
          email: Joi.string().required(),
        })
      }), (req, res, next) => ctrl.loginSSO(req, res, next));

  route.delete(
    '/delete',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
      })
    }),(req, res, next) => ctrl.deketeUser(req, res, next)
  )
  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });

  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);
};
