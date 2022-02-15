import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import StoresController from '../controllers/StoresController';

const storesRouter = Router();
const storesController = new StoresController();

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
        new RegExp(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
      ),
      name: Joi.string().required(),
      domain: Joi.string().required(),
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
        new RegExp(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
      ),
      name: Joi.string().required(),
      domain: Joi.string().required(),
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
