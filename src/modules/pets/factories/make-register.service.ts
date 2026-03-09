import { PrismaPetsRepository } from '../repositories/prisma-pet.repository'
import { RegisterPetService } from '../services/register.service'

export function makeRegisterPetService() {
	const petsRepository = new PrismaPetsRepository()
	const registerService = new RegisterPetService(petsRepository)

	return registerService
}
