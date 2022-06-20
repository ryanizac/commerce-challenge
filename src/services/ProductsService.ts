import ProductsModel from '@models/ProductsModel';
import { Product } from '@prisma/client';
import ProductsValidator from '@validators/ProductsValidator';

export default class ProductsService {
  model;
  validator;

  constructor() {
    this.model = ProductsModel;
    this.validator = new ProductsValidator('Product');
  }

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    const product = await this.model.create({ data });
    return product;
  }

  async read($id: number): Promise<Product> {
    const id = this.validator.isNumber({ $id });
    const productFound = await this.model.findUnique({ where: { id } });
    const product = this.validator.isNotNull(productFound);
    return product;
  }

  async update(
    $id: number,
    data: Partial<Omit<Product, 'id'>>
  ): Promise<Product> {
    const id = this.validator.isNumber({ $id });
    const product = await this.model.update({ data, where: { id } });
    return product;
  }

  async delete($id: number): Promise<Product> {
    const id = this.validator.isNumber({ $id });
    const product = await this.model.delete({ where: { id } });
    return product;
  }

  // many
  async readMany() {
    const products = await this.model.findMany();
    return products;
  }
}
