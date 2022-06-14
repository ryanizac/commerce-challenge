import AppError from '@util/AppError';
import { User, UserCreate, UserPrivateKeys, UserPublicKeys } from 'types/user';

const publicKeys: UserPublicKeys[] = [
  'email',
  'password',
  'name',
  'address',
  'cellphone',
];

const privateKeys: UserPrivateKeys[] = ['id', 'active', 'level', 'validated'];

export default class UsersValidator {
  create<T extends UserCreate>(data: T): boolean {
    console.log('validate', data);
    const requiredKeys = publicKeys.reduce<UserPublicKeys[]>((list, item) => {
      if (!(item in data)) return [...list, item];
      return list;
    }, []);

    if (requiredKeys.length > 0) {
      throw new AppError({
        code: 400,
        message: 'required keys missing',
        info: requiredKeys,
      });
    }

    const hasPrivateKeys = privateKeys.reduce<UserPrivateKeys[]>(
      (list, item) => {
        if (item in data) return [...list, item];
        return list;
      },
      []
    );

    if (hasPrivateKeys.length > 0) {
      throw new AppError({
        code: 400,
        message: 'private keys is not valid',
        info: hasPrivateKeys,
      });
    }

    return true;
  }
}
