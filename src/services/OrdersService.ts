import OrdersModel from '@models/OrdersModel';
import { Order } from '@prisma/client';
import OrdersValidator from '@validators/OrdersValidator';
import ItemsService from './ItemsService';

type IPick<I extends object, K extends keyof I> = Pick<I, keyof Omit<I, K>>;

type OrderCreate = IPick<Order, 'id' | 'createAt'> & {
  items?: number[];
};

export default class OrdersService {
  model;
  validator;
  itemsService;

  constructor() {
    this.model = OrdersModel;
    this.validator = new OrdersValidator('Order');
    this.itemsService = new ItemsService();
  }

  async create($data: OrderCreate) {
    const data = this.validator.isNotNull($data);
    const items = data.items && data.items.map((id) => ({ id }));
    const order = await this.model.create({
      data: {
        userId: data.userId,
        addressId: data.addressId,
        formPayment: data.formPayment,
        items: { connect: items },
      },
    });
    items?.length &&
      this.itemsService.migrateToOrder(order.id, data.items as number[]);
    return order;
  }

  async read($id: number) {
    const id = this.validator.isNumber({ $id });
    const order = await this.model.findUnique({
      where: { id },
      include: { address: true, items: true, user: true },
    });
    return order;
  }

  async update() {}

  async delete() {}
}
