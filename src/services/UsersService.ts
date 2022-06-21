import UsersModel from '@models/UsersModel';
import { toInt } from '@util/number';
import UsersValidator from '@validators/UsersValidator';
import { compare, hash } from 'bcrypt';
import { User, UserCreate, UserResponse, UserUpdate } from 'types/user';
import { Validation } from '@prisma/client';
import AppError from '@util/AppError';
import { randomUUID } from 'crypto';
import ValidationsService from './ValidationsService';

export default class UsersService {
  validator: UsersValidator;
  model: typeof UsersModel;
  validationsService: ValidationsService;

  constructor() {
    this.model = UsersModel;
    this.validator = new UsersValidator('User');
    this.validationsService = new ValidationsService();
  }

  async encryptPassowrd(password: string): Promise<string> {
    return hash(password, 8);
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    return compare(password, encrypted);
  }

  async create($data: UserCreate): Promise<UserResponse> {
    const data = this.validator.isNotNull($data);
    data.password = await this.encryptPassowrd(data.password);
    const code = randomUUID();
    const resUser = await this.model.create({
      data: {
        ...data,
        validations: { create: { code } },
        bag: { create: true },
      },
      include: { validations: true },
    });
    const { password, validations, ...user } = resUser;
    this.validationsService.send(user, validations[0]);
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
    if (data.password) {
      data.password = await this.encryptPassowrd(data.password);
    }
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

  // by id
  async sendValidation($id: number): Promise<boolean> {
    const id = this.validator.isNumber({ $id });
    const userFound = await this.model.findUnique({
      where: { id },
      include: { validations: true },
    });
    const user = this.validator.isNotNull(userFound);
    const validations = user.validations.filter((item) => !item.expired);

    if (user.validated) {
      throw new AppError({
        message: 'user already validated',
      });
    }

    // checking validations expireds by date
    const currentDate = new Date().getTime();
    const validationsList = validations.reduce(
      (data, item) => {
        const validationDate = item.expiredIn.getTime();
        const diffDays = Math.abs((currentDate - validationDate) / 86400000);
        if (diffDays >= 1) data.expired.push(item);
        else data.noExpired.push(item);
        return data;
      },
      {
        expired: [] as Validation[],
        noExpired: [] as Validation[],
      }
    );
    const { expired, noExpired } = validationsList;

    // update to expire by date, but don't wait for this result
    if (expired.length > 0) {
      this.validationsService.expireMany(expired.map((item) => item.id));
    }

    // has a validations
    if (noExpired.length > 0) {
      const someValidation = noExpired[0];
      return this.validationsService.send(user, someValidation);
    }

    // okay, create a validation and send it
    return this.validationsService.createAndSend(user);
  }

  async validate($id: number, $code: string): Promise<UserResponse> {
    const id = this.validator.isNumber({ $id });
    const code = this.validator.isString({ $code });

    const userFound = await this.model.findUnique({
      where: { id },
      include: { validations: true },
    });
    const { password: _pass, ...user } = this.validator.isNotNull(userFound);

    if (user.validated) {
      throw new AppError({
        code: 200,
        message: 'user already validated',
      });
    }

    const validation = user.validations.find((item) => item.code === code);

    if (validation === undefined) {
      throw new AppError({
        message: 'code not found',
      });
    }

    const { password: _passNewUser, ...newUser } = await this.model.update({
      data: {
        validated: true,
        validations: {
          updateMany: { data: { expired: true }, where: { userId: id } },
        },
      },
      where: { id },
    });

    return newUser;
  }
}
