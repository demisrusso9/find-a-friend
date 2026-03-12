import { app } from '@/app'
import { createOrganizationAndLogin } from '@tests/e2e/helpers/setup'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get By Id Controller', () => {
	let token: string
	let petId: string

	beforeAll(async () => {
		await app.ready()
		token = await createOrganizationAndLogin(app.server)

		const response = await request(app.server)
			.post('/pets/register')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Bella',
				age: 2,
				size: 'medium',
				breed: 'Golden Retriever'
			})

		petId = response.body.id
	})

	afterAll(async () => {
		await app.close()
	})

	it('should return a pet by id', async () => {
		const response = await request(app.server).get(`/pets/list/${petId}`)

		expect(response.status).toEqual(200)
		expect(response.body).toMatchObject({
			id: petId,
			name: 'Bella',
			age: 2,
			size: 'medium',
			breed: 'Golden Retriever',
			contact: expect.objectContaining({
				email: expect.any(String),
				phone: expect.any(String),
				city: expect.any(String),
				state: expect.any(String)
			})
		})
	})

	it('should return 404 when pet does not exist', async () => {
		const response = await request(app.server).get(
			'/pets/list/00000000-0000-0000-0000-000000000000'
		)

		expect(response.status).toEqual(404)
	})
})
