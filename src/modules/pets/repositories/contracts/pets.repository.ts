import { PetDTO } from '../../schemas/pets.schema'
import { RegisterPetDTO } from '../../schemas/register.schema'

export interface PetsRepository {
	create(data: RegisterPetDTO): Promise<PetDTO>
	findById(id: string, organizationId: string): Promise<PetDTO | null>
}
