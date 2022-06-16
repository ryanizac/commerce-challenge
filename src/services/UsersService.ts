import UsersModel from '@models/UsersModel';
import { toInt } from '@util/number';
import UsersValidator from '@validators/UsersValidator';
import { User, UserCreate, UserResponse, UserUpdate } from 'types/user';

export default class UsersService {
  validator: UsersValidator;
  model: typeof UsersModel;

  constructor() {
    this.model = UsersModel;
    this.validator = new UsersValidator();
  }

  async create(data: UserCreate): Promise<UserResponse> {
    this.validator.create(data);
    const resUser = await this.model.create({ data });
    const { password, ...user } = resUser;
    return user;
  }

  async read(data: number | string): Promise<UserResponse> {
    this.validator.hasId(data);
    const id = toInt(data);
    const resUser = (await this.model.findUnique({ where: { id } })) as User;
    this.validator.wasFound(resUser);
    const { password: _password, ...user } = resUser;
    return user;
  }

  async update($id: number | string, data: UserUpdate): Promise<UserResponse> {
    this.validator.hasId($id);
    this.validator.update(data);
    const id = toInt($id);
    const { password: _password, ...user } = await this.model.update({
      data,
      where: { id },
    });
    return user;
  }

  async delete<T extends number | string>($id: T): Promise<User> {
    this.validator.hasId($id);
    const id = toInt($id);
    const user = await this.model.delete({ where: { id } });
    return user;
  }
}
