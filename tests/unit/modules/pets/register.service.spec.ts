import { RegisterPetDTO } from '@/modules/pets/schemas/register.schema'
import { RegisterPetService } from '@/modules/pets/services/register.service'
import { InMemoryPetsRepository } from '@tests/unit/repositories/in-memory-pets.repository'
import { beforeEach, describe, expect, it } from 'vitest'

let petRepository: InMemoryPetsRepository
let sut: RegisterPetService

describe('Register Pet', () => {
	const petData: RegisterPetDTO = {
		name: 'pet name1',
		age: 5,
		size: 'medium'
	}

	beforeEach(() => {
		petRepository = new InMemoryPetsRepository()
		sut = new RegisterPetService(petRepository)
	})

	it('should register a pet', async () => {
		const result = await sut.execute({ ...petData, organizationId: 'org-123' })

		expect(petRepository.pets).toHaveLength(1)
		expect(petRepository.pets[0].id).toBeTruthy()
		expect(petRepository.pets[0].createdAt).toBeTruthy()
		expect(result.name).toBe('pet name1')
	})
})
