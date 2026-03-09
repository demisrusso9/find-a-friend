import { FastifyInstance } from 'fastify'
import { registerController } from './modules/organization/controllers/register.controller'
import { sessionController } from './modules/organization/controllers/session.controller'

export async function organizationRoutes(app: FastifyInstance) {
	app.post('/register', registerController)
	app.post('/session', sessionController)
}
