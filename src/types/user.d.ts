import { User } from '@prisma/client';

type UserAllKeys = keyof User;

type UserPrivateKeys = 'id' | 'validated' | 'active' | 'level';

type UserPublicKeys = Exclude<UserAllKeys, UserPrivateKeys>;

type UserCreate = Omit<User, UserPrivateKeys>;

type UserResponse = Omit<User, 'password'>;

type UserUpdate = Omit<UserCreate, 'email'>;

type UserUpdateKeys = keyof UserUpdate;

export type {
  User,
  UserAllKeys,
  UserPrivateKeys,
  UserPublicKeys,
  UserCreate,
  UserResponse,
  UserUpdate,
  UserUpdateKeys,
};
