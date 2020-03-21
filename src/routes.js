import { Router } from 'express';

import EquipmentController from './app/controllers/EquipmentController';
import LocalityController from './app/controllers/LocalityController';
import RequestController from './app/controllers/RequestController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);

routes.post('/locality', LocalityController.store);
routes.get('/locality', LocalityController.index);

routes.post('/equipment', EquipmentController.store);
routes.post('/request', RequestController.store);

export default routes;
