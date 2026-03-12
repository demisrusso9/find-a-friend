import {
	FilterPetsDTO,
	FilterPetsResponseDTO
} from '@/modules/pets/schemas/filters.schema'
import { PetDTO } from '@/modules/pets/schemas/pets.schema'
import { RegisterPetDTO } from '@/modules/pets/schemas/register.schema'

export interface PetsRepository {
	create(data: RegisterPetDTO): Promise<PetDTO>

	findById(id: string): Promise<FilterPetsResponseDTO | null>

	findManyByFilters(filters: FilterPetsDTO): Promise<FilterPetsResponseDTO[]>
}
