import { PrismaPetsRepository } from '@/modules/pets/repositories/prisma-pet.repository'
import { ListPetsService } from '@/modules/pets/services/list.service'

export function makeListPetsService() {
	const petsRepository = new PrismaPetsRepository()
	const listService = new ListPetsService(petsRepository)

	return listService
}
