import { Router } from 'express';
import multer from 'multer';

import EquipmentController from './app/controllers/EquipmentController';
import LocalityController from './app/controllers/LocalityController';
import MassiveEquipmentController from './app/controllers/MassiveEquipmentController';
import RequestController from './app/controllers/RequestController';
import UserController from './app/controllers/UserController';
import validateEquipmentSotre from './app/validators/EquipmentStore';
import validateLocalityStore from './app/validators/LocalityStore';
import validateRequestStore from './app/validators/RequestStore';
import validateUserStore from './app/validators/UserStore';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/user', validateUserStore, UserController.store);
routes.get('/user', UserController.index);

routes.post('/locality', validateLocalityStore, LocalityController.store);
routes.get('/locality', LocalityController.index);

routes.post('/equipment', validateEquipmentSotre, EquipmentController.store);
routes.get('/equipment/:id', EquipmentController.show);
routes.get('/equipment', EquipmentController.index);

routes.post('/request', validateRequestStore, RequestController.store);
routes.get('/request', RequestController.index);
routes.get('/request/:id', RequestController.show);
routes.put('/request/:id', RequestController.update);

routes.post(
  '/equipment/massive',
  upload.single('file'),
  MassiveEquipmentController.store
);

export default routes;
