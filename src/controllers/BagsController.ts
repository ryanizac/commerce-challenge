import db from '@database/db';
import BagsService from '@services/BagsService';
import type { Request, Response } from 'express';

export default class BagsController {
  service;

  constructor() {
    this.service = new BagsService();
  }

  async read(req: Request, res: Response) {
    const userId = req.params.userId as any;
    try {
      const bag = await this.service.read(userId);
      return res.status(200).json(bag);
    } catch (err: any) {
      res.status(400).json(err);
    }
  }

  async clear(req: Request, res: Response) {
    const userId = req.params.userId as any;
    try {
      const bag = await this.service.clear(userId);
      return res.status(200).json(bag);
    } catch (err: any) {
      res.status(400).json(err);
    }
  }
}
