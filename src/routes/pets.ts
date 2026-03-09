import { checkIfOrganizationIsAuthenticated } from '@/middlewares/check-if-organization-is-authenticated'
import { registerController } from '@/modules/pets/controllers/register.controller'
import { FastifyInstance } from 'fastify'

export async function petsRoutes(app: FastifyInstance) {
	app.post(
		'/register',
		{ preHandler: [checkIfOrganizationIsAuthenticated] },
		registerController
	)
}
