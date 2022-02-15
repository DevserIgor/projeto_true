import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import AssessmentsController from '../controllers/AssessmentsController';

const assessmentsRouter = Router();
const assessmentsController = new AssessmentsController();

assessmentsRouter.get('/', assessmentsController.index);

assessmentsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  assessmentsController.show,
);

assessmentsRouter.post(
  '/',
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
