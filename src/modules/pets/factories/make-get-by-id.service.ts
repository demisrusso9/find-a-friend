import { PrismaPetsRepository } from '@/modules/pets/repositories/prisma-pet.repository'
import { GetByIdPetsService } from '@/modules/pets/services/get-by-id.service'

export function makeGetByIdPetsService() {
	const petsRepository = new PrismaPetsRepository()
	const getByIdService = new GetByIdPetsService(petsRepository)

	return getByIdService
}
