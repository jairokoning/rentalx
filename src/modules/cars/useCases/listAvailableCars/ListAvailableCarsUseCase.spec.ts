import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Classe A',
      description: 'Prata',
      daily_rate: 160,
      license_plate: 'BFD-8525',
      fine_amount: 90,
      brand: 'Mercedes',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'BMW',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'A8',
      description: 'Perolizado',
      daily_rate: 160,
      license_plate: 'YTM-2078',
      fine_amount: 90,
      brand: 'Audi',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'A8',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Hilux',
      description: 'Turbinado',
      daily_rate: 160,
      license_plate: 'AHD-8521',
      fine_amount: 90,
      brand: 'Toyota',
      category_id: '123456',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '123456',
    });

    expect(cars).toEqual([car]);
  });
});
