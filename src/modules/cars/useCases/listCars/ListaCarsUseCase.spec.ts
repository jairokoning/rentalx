import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'M3',
      description: 'cor azul',
      daily_rate: 160,
      license_plate: 'PKF-2064',
      fine_amount: 90,
      brand: 'BMW',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Classe A',
      description: 'Prata',
      daily_rate: 160,
      license_plate: 'BFD-8525',
      fine_amount: 90,
      brand: 'Mercedes',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'BMW',
    });

    expect(cars).toEqual([car]);
  });
});
