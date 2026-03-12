import { PrismaPetsRepository } from '../repositories/prisma-pet.repository'
import { ListPetsService } from '../services/list.service'

export function makeListPetsService() {
	const petsRepository = new PrismaPetsRepository()
	const listService = new ListPetsService(petsRepository)

	return listService
}
