import { Request, Response } from 'express';
import UsersService from '@services/UsersService';

export default class UserController {
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
}
