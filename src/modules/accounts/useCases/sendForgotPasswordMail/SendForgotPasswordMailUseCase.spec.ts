import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '111222',
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: '123456',
    });

    await sendForgotPasswordMailUseCase.execute('john.doe@example.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('it should not be able to send email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('john@email.com')
    ).rejects.toEqual(new AppError('Users does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');

    usersRepositoryInMemory.create({
      driver_license: '334455',
      email: 'victoria.hanz@example.com',
      name: 'Victoria Hanz',
      password: '123456',
    });

    await sendForgotPasswordMailUseCase.execute('victoria.hanz@example.com');

    expect(generateTokenMail).toBeCalled();
  });
});
