import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/IcreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate a user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '0112075012',
      email: 'user@example.com',
      password: '123456',
      name: 'User Test',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a non existent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'invalid.email@example.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('it should not be able to authenticate with incorret password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '141516',
        email: 'user@email.com',
        password: '123456',
        name: 'User Test Error',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'user@email.com',
        password: 'incorretPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
