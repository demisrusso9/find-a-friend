import { app } from '@/app'
import { createOrganizationAndLogin } from '@tests/e2e/helpers/setup'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('List Controller', () => {
	let token: string

	beforeAll(async () => {
		await app.ready()
		token = await createOrganizationAndLogin(app.server)

		await request(app.server)
			.post('/pets/register')
			.set('Authorization', `Bearer ${token}`)
			.send({ name: 'Buddy', age: 3, size: 'medium', breed: 'Labrador' })

		await request(app.server)
			.post('/pets/register')
			.set('Authorization', `Bearer ${token}`)
			.send({ name: 'Max', age: 1, size: 'small', breed: 'Poodle' })

		await request(app.server)
			.post('/pets/register')
			.set('Authorization', `Bearer ${token}`)
			.send({ name: 'Thor', age: 5, size: 'large', breed: 'Labrador' })
	})

	afterAll(async () => {
		await app.close()
	})

	it('should filter pets by breed', async () => {
		const response = await request(app.server)
			.get('/pets/list')
			.query({ city: 'Test City', breed: 'Labrador' })

		expect(response.status).toEqual(200)
		expect(
			response.body.every((p: { breed: string }) => p.breed === 'Labrador')
		).toBe(true)
	})

	it('should filter pets by age', async () => {
		const response = await request(app.server)
			.get('/pets/list')
			.query({ city: 'Test City', age: 3 })

		expect(response.status).toEqual(200)
		expect(response.body.every((p: { age: number }) => p.age === 3)).toBe(true)
	})

	it('should filter pets by size', async () => {
		const response = await request(app.server)
			.get('/pets/list')
			.query({ city: 'Test City', size: 'small' })

		expect(response.status).toEqual(200)
		expect(
			response.body.every((p: { size: string }) => p.size === 'small')
		).toBe(true)
	})

	it('should return 400 when city is missing', async () => {
		const response = await request(app.server).get('/pets/list')

		expect(response.status).toEqual(400)
	})

	it('should return empty array when no pets match the filters', async () => {
		const response = await request(app.server)
			.get('/pets/list')
			.query({ city: 'Nonexistent City XYZ' })

		expect(response.status).toEqual(200)
		expect(response.body).toEqual([])
	})
})
