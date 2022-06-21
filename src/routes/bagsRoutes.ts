import BagsController from '@controllers/BagsController';
import { Router } from 'express';

const bagsRoutes = Router();
const bagsController = new BagsController();

bagsRoutes.get('/:userId', (req, res) => bagsController.read(req, res));
bagsRoutes.get('/clear/:userId', (req, res) => bagsController.clear(req, res));

export default bagsRoutes;
