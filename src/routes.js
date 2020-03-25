import { Router } from 'express';
import multer from 'multer';

import EquipmentController from './app/controllers/EquipmentController';
import LocalityController from './app/controllers/LocalityController';
import MassiveEquipmentController from './app/controllers/MassiveEquipmentController';
import RequestController from './app/controllers/RequestController';
import UserController from './app/controllers/UserController';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);

routes.post('/locality', LocalityController.store);
routes.get('/locality', LocalityController.index);

routes.post('/equipment', EquipmentController.store);
routes.get('/equipment/:id', EquipmentController.show);
routes.get('/equipment', EquipmentController.index);

routes.post('/request', RequestController.store);
routes.get('/request', RequestController.index);
routes.get('/request/:id', RequestController.show);
routes.put('/request/:id', RequestController.update);

routes.post(
  '/equipment/massive',
  upload.single('file'),
  MassiveEquipmentController.store
);

export default routes;
