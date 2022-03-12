import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';

import allowedStores from '@shared/http/middlewares/allowedStores';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import AssessmentsRandomController from '../controllers/AssessmentsRandomController';

const assessmentsRandomRouter = Router();
const assessmentsRandomController = new AssessmentsRandomController();

assessmentsRandomRouter.use(allowedStores);

assessmentsRandomRouter.get('/', assessmentsRandomController.index);

assessmentsRandomRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      stars: Joi.number().required(),
      message: Joi.string().required(),
      product_id: Joi.optional(),
      date: Joi.date().required(),
      approved: Joi.optional(),
    },
  }),
  assessmentsRandomController.create,
);

assessmentsRandomRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      stars: Joi.number().required(),
      message: Joi.string().required(),
      date: Joi.date().required(),
    },
  }),
  assessmentsRandomController.update,
);

export default assessmentsRandomRouter;
