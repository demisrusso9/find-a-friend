import { PetNotFoundError } from '@/modules/pets/services/errors/pet-not-found.error'
import { GetByIdPetsService } from '@/modules/pets/services/get-by-id.service'
import { InMemoryPetsRepository } from '@tests/unit/repositories/in-memory-pets.repository'
import { beforeEach, describe, expect, it } from 'vitest'

let petRepository: InMemoryPetsRepository
let sut: GetByIdPetsService

describe('Get Pet By Id', () => {
	beforeEach(() => {
		petRepository = new InMemoryPetsRepository()
		sut = new GetByIdPetsService(petRepository)
	})

	it('should return a pet by id', async () => {
		const created = await petRepository.create({
			name: 'Rex',
			age: 3,
			size: 'large',
			breed: 'Labrador',
			organizationId: 'org-1'
		})

		const result = await sut.execute(created.id)

		expect(result.id).toBe(created.id)
		expect(result.name).toBe('Rex')
		expect(result.age).toBe(3)
		expect(result.breed).toBe('Labrador')
		expect(result.size).toBe('large')
		expect(result.contact).toBeTruthy()
	})

	it('should throw PetNotFoundError when pet does not exist', async () => {
		await expect(sut.execute('non-existent-id')).rejects.toBeInstanceOf(
			PetNotFoundError
		)
	})
})
