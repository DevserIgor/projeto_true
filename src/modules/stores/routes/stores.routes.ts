import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import StoresController from '../controllers/StoresController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const storesRouter = Router();
const storesController = new StoresController();

storesRouter.use(isAuthenticated);

storesRouter.get('/', storesController.index);

storesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  storesController.show,
);

storesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cnpj: Joi.string().pattern(
        new RegExp(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
      ),
      name: Joi.string().required(),
      domain: Joi.string().required(),
      active: Joi.bool().required(),
    },
  }),
  storesController.create,
);

storesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      cnpj: Joi.string().pattern(
        new RegExp(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
      ),
      name: Joi.string().required(),
      domain: Joi.string().required(),
      active: Joi.bool().required(),
    },
  }),
  storesController.update,
);

storesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  storesController.delete,
);

export default storesRouter;
