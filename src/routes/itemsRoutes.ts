import ItemsController from '@controllers/ItemsController';
import { Router } from 'express';

const itemsRoutes = Router();
const itemsController = new ItemsController();

// many
itemsRoutes.post('/many', (req, res) => itemsController.createMany(req, res));

itemsRoutes.post('/', (req, res) => itemsController.create(req, res));
itemsRoutes.get('/:itemId', (req, res) => itemsController.read(req, res));
itemsRoutes.put('/:itemId', (req, res) => itemsController.update(req, res));
itemsRoutes.delete('/:itemId', (req, res) => itemsController.delete(req, res));

export default itemsRoutes;
