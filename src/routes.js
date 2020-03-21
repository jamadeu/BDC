import { Router } from 'express';

import LocalityController from './app/controllers/LocalityController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);

routes.post('/locality', LocalityController.store);
routes.get('/locality', LocalityController.index);

export default routes;
