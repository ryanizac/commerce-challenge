import ItemsService from '@services/ItemsService';
import { Request, Response } from 'express';

export default class ItemsController {
  service;

  constructor() {
    this.service = new ItemsService();
  }

  async create(req: Request, res: Response) {
    const body = req.body as any;
    try {
      const item = await this.service.create(body);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async read(req: Request, res: Response) {
    const itemId = req.params.itemId as any;
    try {
      const item = await this.service.read(itemId);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req: Request, res: Response) {
    const itemId = req.params.itemId as any;
    const body = req.body as any;

    try {
      const item = await this.service.update(itemId, body);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    const itemId = req.params.itemId as any;

    try {
      const item = await this.service.delete(itemId);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  // many
  async createMany(req: Request, res: Response) {
    const body = req.body as any;
    try {
      const items = await this.service.createMany(body);
      return res.status(200).json(items);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
