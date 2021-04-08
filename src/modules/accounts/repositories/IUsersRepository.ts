import { ICreateUserDTO } from '../dtos/IcreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
