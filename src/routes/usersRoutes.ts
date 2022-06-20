import UsersController from '@controllers/UsersController';
import { Router } from 'express';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post('/', (req, res) => usersController.create(req, res));
usersRoutes.get('/:id', (req, res) => usersController.read(req, res));
usersRoutes.put('/:id', (req, res) => usersController.update(req, res));
usersRoutes.delete('/:id', (req, res) => usersController.delete(req, res));

usersRoutes.get('/sendvalidation/:id', (req, res) =>
  usersController.sendValidation(req, res)
);

usersRoutes.get('/validate/:id/:code', (req, res) =>
  usersController.validate(req, res)
);

export default usersRoutes;
