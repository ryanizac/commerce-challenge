import ProductsService from '@services/ProductsService';
import { Request, Response } from 'express';

export default class ProductsController {
  service: ProductsService;

  constructor() {
    this.service = new ProductsService();
  }

  async create(req: Request, res: Response) {
    const body = req.body as any;
    try {
      const product = await this.service.create(body);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async read(req: Request, res: Response) {
    const id = req.params.id as any;
    try {
      const product = await this.service.read(id);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as any;
    const body = req.body as any;

    try {
      const product = await this.service.update(id, body);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id as any;

    try {
      const product = await this.service.delete(id);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  // many
  async createMany(req: Request, res: Response) {
    const body = req.body as any;
    try {
      const products = await this.service.createMany(body);
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async readMany(req: Request, res: Response) {
    try {
      const product = await this.service.readMany();
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
