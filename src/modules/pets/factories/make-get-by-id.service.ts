import { PrismaPetsRepository } from '../repositories/prisma-pet.repository'
import { GetByIdPetsService } from '../services/get-by-id.service'

export function makeGetByIdPetsService() {
	const petsRepository = new PrismaPetsRepository()
	const getByIdService = new GetByIdPetsService(petsRepository)

	return getByIdService
}
