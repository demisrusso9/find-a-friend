import { prisma } from '@/lib/prisma'
import { PetDTO } from '../schemas/pets.schema'
import { RegisterPetDTO } from '../schemas/register.schema'
import { PetsRepository } from './contracts/pets.repository'

export class PrismaPetsRepository implements PetsRepository {
	async create(
		data: RegisterPetDTO & { organizationId: string }
	): Promise<PetDTO> {
		return await prisma.pet.create({ data })
	}

	async findById(id: string): Promise<PetDTO | null> {
		return await prisma.pet.findUnique({ where: { id } })
	}
}
