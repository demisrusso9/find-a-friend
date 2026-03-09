import { InvalidCredentialsError } from '@/modules/organization/repositories/errors/invalid-credentials.error'
import { RegisterDTO } from '@/modules/organization/schemas/register.schema'
import { RegisterOrganizationService } from '@/modules/organization/services/register.service'
import { SessionOrganizationService } from '@/modules/organization/services/session.service'
import { InMemoryOrganizationRepository } from '@tests/unit/repositories/in-memory-organization.repository'
import { beforeEach, describe, expect, it } from 'vitest'

let organizationRepository: InMemoryOrganizationRepository
let registerSut: RegisterOrganizationService
let sut: SessionOrganizationService

describe('Session Organization', async () => {
	const organizationData: RegisterDTO = {
		name: 'Test Organization',
		email: 'test@example.com',
		password: 'password123',
		city: 'Test City',
		state: 'Test State',
		phone: '1234567890'
	}

	beforeEach(async () => {
		organizationRepository = new InMemoryOrganizationRepository()
		registerSut = new RegisterOrganizationService(organizationRepository)
		sut = new SessionOrganizationService(organizationRepository)

		await registerSut.execute(organizationData)
	})

	it('should create a session for an organization', async () => {
		const user = await sut.execute({
			email: 'test@example.com',
			password: 'password123'
		})

		expect(user).toBeTruthy()
		expect(user.email).toBe(organizationData.email)
	})

	it('should not login with a non-existing email', async () => {
		await expect(
			sut.execute({
				email: 'notfound@example.com',
				password: 'password'
			})
		).rejects.instanceOf(InvalidCredentialsError)
	})

	it('should not create a session with a invalid password', async () => {
		await expect(
			sut.execute({
				email: 'test@example.com',
				password: 'wrongpassword'
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
