import AppError from '@util/AppError';

type Types = 'string' | 'number';
type StrOrNum<T> = T extends 'string' ? string : number;

type OnlyType<T> = Record<string, T>;

export default class GenericValidator {
  isType<T extends object, U extends Types, R = StrOrNum<U>>(
    $object: T,
    type: U
  ): R {
    const entries = Object.entries($object) as Array<any>;
    const firstEntrie = entries[0] as [keyof T, any];
    const [_key, _value] = firstEntrie;
    const key = _key.toString().replace(/^(\$|_)*/, '');
    const value = type === 'number' ? parseInt(_value) : _value;

    if (typeof value !== type || (type === 'number' && /\D+/.test(_value))) {
      throw new AppError({
        message: `${key as string} is not a ${type}`,
        info: { [key]: _value },
      });
    }

    return value as R;
  }

  isNumber<T extends OnlyType<number>>($object: T): number {
    return this.isType($object, 'number');
  }

  isString<T extends OnlyType<string>>($object: T): string {
    return this.isType($object, 'string');
  }
}
