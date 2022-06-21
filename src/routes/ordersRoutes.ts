import OrdersController from '@controllers/OrdersController';
import { Router } from 'express';

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.post('/', (req, res) => ordersController.create(req, res));
ordersRoutes.get('/:id', (req, res) => ordersController.read(req, res));
ordersRoutes.put('/:id', (req, res) => ordersController.update(req, res));
ordersRoutes.delete('/:id', (req, res) => ordersController.delete(req, res));

export default ordersRoutes;
