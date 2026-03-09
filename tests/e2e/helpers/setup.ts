import { Server } from 'node:http'
import request from 'supertest'

const DEFAULT_ORG = {
	name: 'Test Organization',
	email: 'register-spec@example.com',
	password: 'password123',
	city: 'Test City',
	state: 'Test State',
	phone: '1234567890'
}

export async function createOrganizationAndLogin(
	server: Server
): Promise<string> {
	await request(server).post('/organizations/register').send(DEFAULT_ORG)

	const sessionResponse = await request(server)
		.post('/organizations/session')
		.send({
			email: DEFAULT_ORG.email,
			password: DEFAULT_ORG.password
		})

	return sessionResponse.body.token
}
