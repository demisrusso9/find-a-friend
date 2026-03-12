import { prisma } from '@/lib/prisma'
import { Prisma } from '../../../../prisma/generated/client'
import { FilterPetsDTO, FilterPetsResponseDTO } from '../schemas/filters.schema'
import { PetDTO } from '../schemas/pets.schema'
import { RegisterPetDTO } from '../schemas/register.schema'
import { PetsRepository } from './contracts/pets.repository'

type PetWithOrganizationRaw = {
	id: string
	name: string
	age: number
	breed: string
	size: string
	email: string
	phone: string
	city: string
	state: string
}

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
		const conditions = this.getConditions(filters)
		const where = Prisma.join(conditions, ' AND ')

		const pets = await prisma.$queryRaw<PetWithOrganizationRaw[]>`
			SELECT
				p.id,
				p.name,
				p.age,
				p.breed,
				p.size,
				o.email,
				o.phone,
				o.city,
				o.state
			FROM "Pet" p
			JOIN "Organization" o ON o.id = p."organizationId"
			WHERE ${where}
		`

		return pets.map((pet) => ({
			id: pet.id,
			name: pet.name,
			age: pet.age,
			breed: pet.breed,
			size: pet.size,
			contact: {
				email: pet.email,
				phone: pet.phone,
				city: pet.city,
				state: pet.state
			}
		}))
	}

	getConditions(filters: FilterPetsDTO): Prisma.Sql[] {
		const conditions: Prisma.Sql[] = [
			Prisma.sql`unaccent(o.city) ILIKE unaccent(${`%${filters.city}%`})`
		]

		if (filters.breed) {
			conditions.push(
				Prisma.sql`unaccent(p.breed) ILIKE unaccent(${`%${filters.breed}%`})`
			)
		}

		if (filters.age !== undefined) {
			conditions.push(Prisma.sql`p.age = ${filters.age}`)
		}

		if (filters.size) {
			conditions.push(Prisma.sql`p.size = ${filters.size}::"Size"`)
		}

		return conditions
	}
}
