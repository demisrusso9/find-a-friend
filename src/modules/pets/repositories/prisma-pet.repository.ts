import { prisma } from '@/lib/prisma'
import {
	FilterPetsDTO,
	FilterPetsResponseDTO
} from '@/modules/pets/schemas/filters.schema'
import { PetDTO } from '@/modules/pets/schemas/pets.schema'
import { RegisterPetDTO } from '@/modules/pets/schemas/register.schema'
import { PetsRepository } from './contracts/pets.repository'

export class PrismaPetsRepository implements PetsRepository {
	async create(
		data: RegisterPetDTO & { organizationId: string }
	): Promise<PetDTO> {
		return await prisma.pet.create({ data })
	}

	async findById(id: string): Promise<FilterPetsResponseDTO | null> {
		const pet = await prisma.pet.findUnique({
			relationLoadStrategy: 'join',
			select: {
				id: true,
				name: true,
				age: true,
				breed: true,
				size: true,
				organization: {
					select: {
						email: true,
						phone: true,
						city: true,
						state: true
					}
				}
			},
			where: {
				id
			}
		})

		return pet
			? {
					id: pet.id,
					name: pet.name,
					age: pet.age,
					breed: pet.breed,
					size: pet.size,
					contact: {
						email: pet.organization.email,
						phone: pet.organization.phone,
						city: pet.organization.city,
						state: pet.organization.state
					}
				}
			: null
	}

	async findManyByFilters(
		filters: FilterPetsDTO
	): Promise<FilterPetsResponseDTO[]> {
		const pets = await prisma.pet.findMany({
			relationLoadStrategy: 'join',
			select: {
				id: true,
				name: true,
				age: true,
				breed: true,
				size: true,
				organization: {
					select: {
						email: true,
						phone: true,
						city: true,
						state: true
					}
				}
			},
			where: {
				organization: {
					city: { contains: filters.city, mode: 'insensitive' }
				},
				...(filters.breed && {
					breed: { contains: filters.breed, mode: 'insensitive' }
				}),
				...(filters.age !== undefined && { age: filters.age }),
				...(filters.size && { size: filters.size })
			}
		})

		return pets.map((pet) => ({
			id: pet.id,
			name: pet.name,
			age: pet.age,
			breed: pet.breed,
			size: pet.size,
			contact: {
				email: pet.organization.email,
				phone: pet.organization.phone,
				city: pet.organization.city,
				state: pet.organization.state
			}
		}))
	}
}
