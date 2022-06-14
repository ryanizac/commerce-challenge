import UsersController from '@controllers/UsersController';
import { Router } from 'express';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post('/', (req, res) => usersController.create(req, res));

export default usersRoutes;
