import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import AssessmentsController from '../controllers/AssessmentsController';
import allowedStores from '@shared/http/middlewares/allowedStores';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const assessmentsRouter = Router();
const assessmentsController = new AssessmentsController();

assessmentsRouter.get(
  '/list-random',
  allowedStores,
  assessmentsController.listRandom,
);

assessmentsRouter.use(isAuthenticated);
assessmentsRouter.get('/', assessmentsController.index);

assessmentsRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  assessmentsController.show,
);

assessmentsRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      stars: Joi.number().required(),
      message: Joi.string().required(),
      date: Joi.date().required(),
    },
  }),
  assessmentsController.create,
);

assessmentsRouter.put(
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
  assessmentsController.update,
);

assessmentsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  assessmentsController.delete,
);

export default assessmentsRouter;
