import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const organizationBody = {
	name: 'Test Organization',
	email: 'register-spec@example.com',
	password: 'password123',
	city: 'Test City',
	state: 'Test State',
	phone: '1234567890'
}

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
			.send(organizationBody)

		expect(response.status).toBe(201)
	})

	it('should not return the password in the response body', async () => {
		const response = await request(app.server)
			.post('/organizations/register')
			.send({ ...organizationBody, email: 'register-spec-no-password@example.com' })

		expect(response.status).toBe(201)
		expect(response.body.organization).not.toHaveProperty('password')
	})

	it('should return 409 when email is already registered', async () => {
		await request(app.server)
			.post('/organizations/register')
			.send({ ...organizationBody, email: 'register-spec-duplicate@example.com' })

		const response = await request(app.server)
			.post('/organizations/register')
			.send({ ...organizationBody, email: 'register-spec-duplicate@example.com' })

		expect(response.status).toBe(409)
	})

	it('should return 400 when required fields are missing', async () => {
		const response = await request(app.server)
			.post('/organizations/register')
			.send({ email: 'register-spec-invalid@example.com' })

		expect(response.status).toBe(400)
	})
})
