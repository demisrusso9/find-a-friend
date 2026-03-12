import { PetsRepository } from '@/modules/pets/repositories/contracts/pets.repository'
import {
	FilterPetsDTO,
	FilterPetsResponseDTO
} from '@/modules/pets/schemas/filters.schema'
import { PetDTO } from '@/modules/pets/schemas/pets.schema'
import { RegisterPetDTO } from '@/modules/pets/schemas/register.schema'
import { randomUUID } from 'node:crypto'

type InMemoryPet = PetDTO & {
	contact: FilterPetsResponseDTO['contact']
}

export class InMemoryPetsRepository implements PetsRepository {
	public pets: InMemoryPet[] = []

	async create(
		data: RegisterPetDTO & { organizationId: string }
	): Promise<PetDTO> {
		const pet: InMemoryPet = {
			...data,
			id: randomUUID(),
			createdAt: new Date(),
			contact: {
				email: 'test@org.com',
				phone: '11999999999',
				city: 'Test City',
				state: 'SP'
			}
		}

		this.pets.push(pet)

		return pet
	}

	async findById(id: string): Promise<FilterPetsResponseDTO | null> {
		const pet = this.pets.find((pet) => pet.id === id)

		if (!pet) return null

		return {
			id: pet.id,
			name: pet.name,
			age: pet.age,
			breed: pet.breed,
			size: pet.size,
			contact: pet.contact
		}
	}

	async findManyByFilters(
		filters: FilterPetsDTO
	): Promise<FilterPetsResponseDTO[]> {
		return this.pets
			.filter((pet) => {
				const cityMatch = pet.contact.city
					.toLowerCase()
					.includes(filters.city.toLowerCase())
				const breedMatch =
					!filters.breed ||
					pet.breed.toLowerCase().includes(filters.breed.toLowerCase())
				const ageMatch = filters.age === undefined || pet.age === filters.age
				const sizeMatch = !filters.size || pet.size === filters.size

				return cityMatch && breedMatch && ageMatch && sizeMatch
			})
			.map((pet) => ({
				id: pet.id,
				name: pet.name,
				age: pet.age,
				breed: pet.breed,
				size: pet.size,
				contact: pet.contact
			}))
	}
}
