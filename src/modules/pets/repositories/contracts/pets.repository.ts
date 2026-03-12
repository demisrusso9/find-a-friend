import {
	FilterPetsDTO,
	FilterPetsResponseDTO
} from '../../schemas/filters.schema'
import { PetDTO } from '../../schemas/pets.schema'
import { RegisterPetDTO } from '../../schemas/register.schema'

export interface PetsRepository {
	create(data: RegisterPetDTO): Promise<PetDTO>

	findById(id: string): Promise<FilterPetsResponseDTO | null>

	findManyByFilters(filters: FilterPetsDTO): Promise<FilterPetsResponseDTO[]>
}
