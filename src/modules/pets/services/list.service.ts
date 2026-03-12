import { PetsRepository } from '@/modules/pets/repositories/contracts/pets.repository'
import { FilterPetsDTO } from '@/modules/pets/schemas/filters.schema'

export class ListPetsService {
	constructor(private petsRepository: PetsRepository) {}

	async execute(filters: FilterPetsDTO) {
		const pet = await this.petsRepository.findManyByFilters(filters)

		return pet
	}
}
