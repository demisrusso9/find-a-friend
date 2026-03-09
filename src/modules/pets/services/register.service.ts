import { PetsRepository } from '../repositories/contracts/pets.repository'
import { RegisterPetDTO } from '../schemas/register.schema'

export class RegisterPetService {
	constructor(private petsRepository: PetsRepository) {}

	async execute(data: RegisterPetDTO & { organizationId: string }) {
		const pet = await this.petsRepository.create(data)

		return pet
	}
}
