import AddressController from '@controllers/AddressController';
import { Router } from 'express';

const addressRoutes = Router();
const addressController = new AddressController();

addressRoutes.post('/', (req, res) => addressController.create(req, res));
addressRoutes.get('/:id', (req, res) => addressController.read(req, res));
addressRoutes.put('/:id', (req, res) => addressController.update(req, res));
addressRoutes.delete('/:id', (req, res) => addressController.delete(req, res));

export default addressRoutes;
