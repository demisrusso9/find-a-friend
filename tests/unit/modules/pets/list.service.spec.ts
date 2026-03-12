import { FilterPetsResponseDTO } from '@/modules/pets/schemas/filters.schema'
import { ListPetsService } from '@/modules/pets/services/list.service'
import { InMemoryPetsRepository } from '@tests/unit/repositories/in-memory-pets.repository'
import { beforeEach, describe, expect, it } from 'vitest'

let petRepository: InMemoryPetsRepository
let sut: ListPetsService

describe('List Pets', () => {
	beforeEach(async () => {
		petRepository = new InMemoryPetsRepository()
		sut = new ListPetsService(petRepository)

		// Seed a mix of pets with different cities/breeds/ages/sizes
		petRepository.pets.push(
			{
				id: 'pet-1',
				name: 'Rex',
				age: 2,
				size: 'large',
				breed: 'Labrador',
				organizationId: 'org-1',
				createdAt: new Date(),
				contact: {
					email: 'a@org.com',
					phone: '111',
					city: 'São Paulo',
					state: 'SP'
				}
			},
			{
				id: 'pet-2',
				name: 'Bolinha',
				age: 4,
				size: 'small',
				breed: 'Poodle',
				organizationId: 'org-1',
				createdAt: new Date(),
				contact: {
					email: 'a@org.com',
					phone: '111',
					city: 'São Paulo',
					state: 'SP'
				}
			},
			{
				id: 'pet-3',
				name: 'Toby',
				age: 2,
				size: 'medium',
				breed: 'Beagle',
				organizationId: 'org-2',
				createdAt: new Date(),
				contact: {
					email: 'b@org.com',
					phone: '222',
					city: 'Campinas',
					state: 'SP'
				}
			}
		)
	})

	it('should return all pets from a city', async () => {
		const result = await sut.execute({ city: 'São Paulo' })

		expect(result).toHaveLength(2)
		expect(
			result.every((p: FilterPetsResponseDTO) => p.contact.city === 'São Paulo')
		).toBe(true)
	})

	it('should filter by breed', async () => {
		const result = await sut.execute({ city: 'São Paulo', breed: 'Labrador' })

		expect(result).toHaveLength(1)
		expect(result[0].breed).toBe('Labrador')
	})

	it('should filter by age', async () => {
		const result = await sut.execute({ city: 'São Paulo', age: 2 })

		expect(result).toHaveLength(1)
		expect(result[0].name).toBe('Rex')
	})

	it('should filter by size', async () => {
		const result = await sut.execute({ city: 'São Paulo', size: 'small' })

		expect(result).toHaveLength(1)
		expect(result[0].name).toBe('Bolinha')
	})

	it('should return empty array when no pets match', async () => {
		const result = await sut.execute({ city: 'Rio de Janeiro' })

		expect(result).toHaveLength(0)
	})

	it('should apply multiple filters together', async () => {
		const result = await sut.execute({
			city: 'São Paulo',
			age: 4,
			size: 'small'
		})

		expect(result).toHaveLength(1)
		expect(result[0].name).toBe('Bolinha')
	})
})
