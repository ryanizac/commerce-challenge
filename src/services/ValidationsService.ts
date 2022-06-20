import ValidationModel from '@models/ValidationsModel';
import { User, Validation } from '@prisma/client';
import { randomUUID } from 'crypto';
import EmailsService from './EmailsService';

type RequiredKey<T extends object, U extends keyof T> = Partial<T> & Pick<T, U>;

type SimpleUser = RequiredKey<User, 'id' | 'email' | 'name'>;

export default class ValidationsService {
  model;
  emailsService: EmailsService;

  constructor() {
    this.model = ValidationModel;
    this.emailsService = new EmailsService();
  }

  async create(user: RequiredKey<User, 'id'>): Promise<Validation> {
    const validation = await this.model.create({
      data: { code: randomUUID(), userId: user.id },
    });
    return validation;
  }

  async expireMany(listId: number[]) {
    const validations = this.model.updateMany({
      data: { expired: true },
      where: { id: { in: listId } },
    });
    return true;
  }

  async send(
    user: SimpleUser,
    validation: RequiredKey<Validation, 'code'>
  ): Promise<boolean> {
    const data = {
      to: user.email,
      subject: 'validate your email',
      name: user.name,
      code: validation.code,
      url: `http://localhost:3000/users/validate/${user.id}/${validation.code}`,
    };
    const email = await this.emailsService.send('validation', data);
    return true;
  }

  async createAndSend(user: SimpleUser): Promise<boolean> {
    const validation = await this.create(user);
    return this.send(user, validation);
  }
}
