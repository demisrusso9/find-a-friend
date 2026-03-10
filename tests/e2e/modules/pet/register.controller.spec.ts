import { app } from '@/app'
import { createOrganizationAndLogin } from '@tests/e2e/helpers/setup'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Controller', () => {
	let token: string

	beforeAll(async () => {
		await app.ready()
		token = await createOrganizationAndLogin(app.server)
	})

	afterAll(async () => {
		await app.close()
	})

	it('should register a pet', async () => {
		const response = await request(app.server)
			.post('/pets/register')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'pet name1',
				age: 5,
				size: 'medium',
				breed: 'breed1'
			})

		expect(response.status).toEqual(201)
	})
})
