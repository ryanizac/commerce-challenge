import ProductsController from '@controllers/ProductsController';
import db from '@database/db';
import { Router } from 'express';

const productsRoutes = Router();
const productsController = new ProductsController();

// many
productsRoutes.get('/many', (req, res) =>
  productsController.readMany(req, res)
);

productsRoutes.post('/', (req, res) => productsController.create(req, res));
productsRoutes.get('/:id', (req, res) => productsController.read(req, res));
productsRoutes.put('/:id', (req, res) => productsController.update(req, res));
productsRoutes.delete('/:id', (req, res) =>
  productsController.delete(req, res)
);

export default productsRoutes;
