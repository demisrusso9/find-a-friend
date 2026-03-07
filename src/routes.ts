import { FastifyInstance } from 'fastify'
import { registerController } from './modules/organization/controllers/register.controller'

export async function organizationRoutes(app: FastifyInstance) {
	app.post('/register', registerController)
}
