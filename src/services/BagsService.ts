import BagsModel from '@models/BagsModel';
import BagsValidator from '@validators/BagsValidator';
import ItemsService from './ItemsService';

export default class BagsService {
  model;
  itemsService;
  validator;

  constructor() {
    this.model = BagsModel;
    this.validator = new BagsValidator();
    this.itemsService = new ItemsService();
  }

  async create($userId: number) {
    const userId = this.validator.isNumber({ $userId });
    const bag = await this.model.create({ data: { userId } });
    return bag;
  }

  async read($userId: number) {
    const userId = this.validator.isNumber({ $userId });
    const bagFound = await this.model.findUnique({
      where: { userId },
      include: { items: true },
    });
    const bag = this.validator.isNotNull(bagFound);
    return bag;
  }

  async clear($userId: number) {
    const userId = this.validator.isNumber({ $userId });
    const count = await this.itemsService.deleteMany(userId);
    return count;
  }
}

export class OrdersService {}
