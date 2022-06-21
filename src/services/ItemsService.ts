import ItemsModel from '@models/ItemsModel';
import { Item } from '@prisma/client';
import ItemsValidator from '@validators/ItemsValidator';

type IPick<I extends object, K extends keyof I> = Pick<I, keyof Omit<I, K>>;

type DataCreate = IPick<Item, 'id'>;
type DataUpdate = IPick<DataCreate, 'bagId'>;

export default class ItemsService {
  model;
  validator;

  constructor() {
    this.model = ItemsModel;
    this.validator = new ItemsValidator('Item');
  }

  async create($data: DataCreate): Promise<Item> {
    const data = this.validator.isNotNull($data);
    const item = await this.model.create({ data });
    return item;
  }

  async read($id: number): Promise<Item> {
    const id = this.validator.isNumber({ $id });
    const itemFound = await this.model.findUnique({
      where: { id },
      include: { product: true },
    });
    const item = this.validator.isNotNull(itemFound);
    return item;
  }

  async update($id: number, data: DataUpdate): Promise<Item> {
    const id = this.validator.isNumber({ $id });
    const item = await this.model.update({ data, where: { id } });
    return item;
  }

  async delete($id: number): Promise<Item> {
    const id = this.validator.isNumber({ $id });
    const item = await this.model.delete({ where: { id } });
    return item;
  }

  // many
  async createMany(data: Array<Omit<Item, 'id'>>) {
    const items = await this.model.createMany({
      data: data,
    });
    return items;
  }

  async deleteMany($userId: number): Promise<number> {
    const userId = this.validator.isNumber({ $userId });
    const items = await this.model.deleteMany({ where: { bag: { userId } } });
    return items.count;
  }

  // internal
  async migrateToOrder(orderId: number, itemList: number[]): Promise<number> {
    const items = await this.model.updateMany({
      data: { inOrder: true, bagId: undefined },
      where: { orderId },
    });
    return items.count;
  }
}
