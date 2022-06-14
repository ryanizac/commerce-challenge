import UsersModel from '@models/UsersModel';
import UsersValidator from '@validators/UsersValidator';
import { UserCreate, UserResponse } from 'types/user';

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
}
