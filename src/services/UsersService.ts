import UsersModel from '@models/UsersModel';
import { toInt } from '@util/number';
import UsersValidator from '@validators/UsersValidator';
import { User, UserCreate, UserResponse } from 'types/user';

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
}
