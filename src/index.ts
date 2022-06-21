import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routeMiddleware from '@middlewares/routesMiddleware';
import usersRoutes from '@routes/usersRoutes';
import productsRoutes from '@routes/productsRoutes';
import bagsRoutes from '@routes/bagsRoutes';
import itemsRoutes from '@routes/itemsRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = express();

server.use(cors());
server.use(express.json());

server.use(routeMiddleware);

server.use('/users', usersRoutes);
server.use('/products', productsRoutes);
server.use('/bags', bagsRoutes);
server.use('/items', itemsRoutes);

server.use('/*', (req, res) => {
  return res.status(404).send('page not found');
});

server.listen(PORT, () => {
  console.log(`server listening on http://localhost:3000/`);
});
