import { request, response, Router } from 'express';
import { CreateSpecificationService } from 'modules/cars/services/CreateCategoryService';

import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository
  );

  createSpecificationService.
});
