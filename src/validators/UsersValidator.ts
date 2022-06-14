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

    const receivedKeys = Object.keys(data);
    const hasAnyKeys = receivedKeys.reduce<string[]>((list, key) => {
      if (!publicKeys.includes(key as UserPublicKeys)) return [...list, key];
      return list;
    }, []);

    if (hasAnyKeys.length > 0) {
      throw new AppError({
        code: 400,
        message: 'keys not valid',
        info: hasAnyKeys,
      });
    }

    return true;
  }
}
