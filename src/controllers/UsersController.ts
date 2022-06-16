import { Request, Response } from 'express';
import UsersService from '@services/UsersService';

export default class UsersController {
  service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  async create(req: Request, res: Response) {
    const body = req.body as any;
    try {
      const user = await this.service.create(body);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async read(req: Request, res: Response) {
    const id = req.params.id as any;
    try {
      const user = await this.service.read(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as any;
    const body = req.body as any;

    try {
      const user = await this.service.update(id, body);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
