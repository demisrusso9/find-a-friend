import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const organizationBody = {
	name: 'Test Organization',
	email: 'session-spec@example.com',
	password: 'password123',
	city: 'Test City',
	state: 'Test State',
	phone: '1234567890'
}

describe('Session Controller', () => {
	beforeAll(async () => {
		await app.ready()

		await request(app.server)
			.post('/organizations/register')
			.send(organizationBody)
	})

	afterAll(async () => {
		await app.close()
	})

	it('should create a new session', async () => {
		const response = await request(app.server)
			.post('/organizations/session')
			.send({
				email: organizationBody.email,
				password: organizationBody.password
			})

		expect(response.status).toBe(200)
		expect(response.body).toEqual(
			expect.objectContaining({
				token: expect.any(String)
			})
		)
	})

	it('should set a refreshToken cookie in the response', async () => {
		const response = await request(app.server)
			.post('/organizations/session')
			.send({
				email: organizationBody.email,
				password: organizationBody.password
			})

		const cookies = response.headers['set-cookie']

		expect(cookies).toBeDefined()
		expect(cookies[0]).toContain('refreshToken')
		expect(cookies[0]).toContain('HttpOnly')
	})

	it('should return 401 when password is wrong', async () => {
		const response = await request(app.server)
			.post('/organizations/session')
			.send({
				email: organizationBody.email,
				password: 'wrongpassword'
			})

		expect(response.status).toBe(401)
	})

	it('should return 401 when email does not exist', async () => {
		const response = await request(app.server)
			.post('/organizations/session')
			.send({
				email: 'nonexistent@example.com',
				password: 'password123'
			})

		expect(response.status).toBe(401)
	})

	it('should return 400 when required fields are missing', async () => {
		const response = await request(app.server)
			.post('/organizations/session')
			.send({ email: organizationBody.email })

		expect(response.status).toBe(400)
	})
})
