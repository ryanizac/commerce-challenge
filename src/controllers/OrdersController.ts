import OrdersService from '@services/OrdersService';
import { Request, Response } from 'express';

export default class OrdersController {
  service;

  constructor() {
    this.service = new OrdersService();
  }

  async create(req: Request, res: Response) {
    const body = req.body as any;
    try {
      const order = await this.service.create(body);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async read(req: Request, res: Response) {
    const id = req.params.id as any;
    try {
      const order = await this.service.read(id);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as any;
    const body = req.body as any;

    try {
      const order = await this.service.update(id, body);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id as any;

    try {
      const order = await this.service.delete(id);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
