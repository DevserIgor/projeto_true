import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import AssessmentsController from '../controllers/AssessmentsController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const assessmentsApprovalRouter = Router();
const assessmentsController = new AssessmentsController();

assessmentsApprovalRouter.use(isAuthenticated);
assessmentsApprovalRouter.get('/', assessmentsController.index);

assessmentsApprovalRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      approved: Joi.boolean(),
    },
  }),
  assessmentsController.update,
);

assessmentsApprovalRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  assessmentsController.delete,
);

export default assessmentsApprovalRouter;
