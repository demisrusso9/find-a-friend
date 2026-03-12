import { PrismaPetsRepository } from '@/modules/pets/repositories/prisma-pet.repository'
import { RegisterPetService } from '@/modules/pets/services/register.service'

export function makeRegisterPetService() {
	const petsRepository = new PrismaPetsRepository()
	const registerService = new RegisterPetService(petsRepository)

	return registerService
}
