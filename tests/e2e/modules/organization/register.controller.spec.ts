import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Controller', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should register a new organization', async () => {
		const response = await request(app.server)
			.post('/organizations/register')
			.send({
				name: 'Test Organization',
				email: 'test@example.com',
				password: 'password123',
				city: 'Test City',
				state: 'Test State',
				phone: '1234567890'
			})

		expect(response.status).toBe(201)
	})
})
