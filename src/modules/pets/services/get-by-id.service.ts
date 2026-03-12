import { PetsRepository } from '../repositories/contracts/pets.repository'
import { PetNotFoundError } from './errors/pet-not-found.error'

export class GetByIdPetsService {
	constructor(private petsRepository: PetsRepository) {}

	async execute(id: string) {
		const pet = await this.petsRepository.findById(id)

		if (!pet) {
			throw new PetNotFoundError()
		}

		return pet
	}
}
