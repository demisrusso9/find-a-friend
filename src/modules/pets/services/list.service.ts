import { PetsRepository } from '../repositories/contracts/pets.repository'
import { FilterPetsDTO } from '../schemas/filters.schema'

export class ListPetsService {
	constructor(private petsRepository: PetsRepository) {}

	async execute(filters: FilterPetsDTO) {
		const pet = await this.petsRepository.findManyByFilters(filters)

		return pet
	}
}
