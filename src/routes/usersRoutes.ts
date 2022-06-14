import UserController from '@controllers/UsersController';
import { Router } from 'express';

const usersRoutes = Router();
const userController = new UserController();

usersRoutes.post('/', (req, res) => userController.create(req, res));

export default usersRoutes;
