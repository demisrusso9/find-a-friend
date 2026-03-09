import { PetsRepository } from '@/modules/pets/repositories/contracts/pets.repository'
import { PetDTO } from '@/modules/pets/schemas/pets.schema'
import { RegisterPetDTO } from '@/modules/pets/schemas/register.schema'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
	public pets: PetDTO[] = []

	async create(data: RegisterPetDTO): Promise<PetDTO> {
		const pet: PetDTO = {
			...data,
			id: randomUUID(),
			organizationId: randomUUID(),
			createdAt: new Date()
		}

		this.pets.push(pet)

		return pet
	}

	async findById(id: string, organizationId: string): Promise<PetDTO | null> {
		const pet = this.pets.find(
			(pet) => pet.id === id && pet.organizationId === organizationId
		)

		return pet ?? null
	}
}
