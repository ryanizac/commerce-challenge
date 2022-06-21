import AddressModel from '@models/AddressModel';
import { Address } from '@prisma/client';
import AddressValidator from '@validators/AddressValidator';

type IPick<I extends object, K extends keyof I> = Pick<I, keyof Omit<I, K>>;

type CreateAddressBody = IPick<Address, 'id'>;
type UpdateAddressBody = IPick<CreateAddressBody, 'userId'>;

export default class AddressService {
  model;
  validator;

  constructor() {
    this.model = AddressModel;
    this.validator = new AddressValidator('Address');
  }

  async create($data: CreateAddressBody): Promise<Address> {
    const data = this.validator.isNotNull($data);
    const address = await this.model.create({ data });
    return address;
  }

  async read($id: number): Promise<Address> {
    const id = this.validator.isNumber({ $id });
    const addressFound = await this.model.findUnique({ where: { id } });
    const address = this.validator.isNotNull(addressFound);
    return address;
  }

  async update($id: number, $data: UpdateAddressBody): Promise<Address> {
    const id = this.validator.isNumber({ $id });
    const data = this.validator.isNotNull($data);
    const address = await this.model.update({ data, where: { id } });
    return address;
  }

  async delete($id: number): Promise<Address> {
    const id = this.validator.isNumber({ $id });
    const address = await this.model.delete({ where: { id } });
    return address;
  }
}
