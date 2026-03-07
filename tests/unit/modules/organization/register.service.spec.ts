import { OrganizationAlreadyExistsError } from '@/modules/organization/errors/organization-already-exists.error'
import { RegisterOrganizationService } from '@/modules/organization/services/register.services'
import { OrganizationDTO } from '@/types/organization.type'
import { InMemoryOrganizationRepository } from '@tests/unit/repositories/in-memory-organization.repository'
import bcrypt from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'

let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterOrganizationService

describe('Register Organization', async () => {
	const organizationData: OrganizationDTO = {
		name: 'Test Organization',
		email: 'test@example.com',
		password: 'password123',
		city: 'Test City',
		state: 'Test State',
		phone: '1234567890'
	}

	beforeEach(() => {
		organizationRepository = new InMemoryOrganizationRepository()
		sut = new RegisterOrganizationService(organizationRepository)
	})

	it('should register an organization', async () => {
		const result = await sut.execute(organizationData)

		expect(organizationRepository.organizations).toHaveLength(1)
		expect(result.organization).not.toHaveProperty('password')
		expect(result.organization.email).toBe('test@example.com')
	})

	it('should hash the password before saving', async () => {
		await sut.execute(organizationData)

		const isPasswordHashed = await bcrypt.compare(
			'password123',
			organizationRepository.organizations[0].password
		)

		expect(isPasswordHashed).toBe(true)
	})

	it('should not register an organization with an existing email', async () => {
		await sut.execute(organizationData)

		await expect(sut.execute(organizationData)).rejects.toBeInstanceOf(
			OrganizationAlreadyExistsError
		)
	})
})
