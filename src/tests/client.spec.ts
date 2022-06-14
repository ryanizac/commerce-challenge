import UsersService from '@services/UsersService';

/**
 * for first test, you need RESET the database
 * before execute this test with following cmd:
 * - yarn prisma migrate reset
 *
 * After, run test:
 * - yarn test
 */

test('create - valid user', () => {
  const usersService = new UsersService();
  const data = {
    name: 'gabriela',
    email: 'gabriela@gmail.com',
    password: '1234',
    cellphone: '84000000',
    address: 'rua x',
  };

  return usersService.create(data).then((res) => {
    expect(res).toMatchObject(res);
  });
});
