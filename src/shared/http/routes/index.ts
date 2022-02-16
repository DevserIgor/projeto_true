import { Router } from 'express';

import storesRouter from '@modules/stores/routes/stores.routes';
import assessmentsRouter from '@modules/ assessment/routes/assessments.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import profileRouter from '@modules/users/routes/profile.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);

routes.use('/stores', storesRouter);
routes.use('/assessments', assessmentsRouter);

// routes.get('/products', (request, response) => {
//   return response.json({ Message: 'two' });
// });

export default routes;
