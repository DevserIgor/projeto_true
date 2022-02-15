import { Router } from 'express';

import storesRouter from '@modules/stores/routes/stores.routes';
import assessmentsRouter from '@modules/ assessment/routes/stores.routes';

const routes = Router();

routes.use('/stores', storesRouter);
routes.use('/assessments', assessmentsRouter);

// routes.get('/products', (request, response) => {
//   return response.json({ Message: 'two' });
// });

export default routes;
