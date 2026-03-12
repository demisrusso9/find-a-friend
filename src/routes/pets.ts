import { checkIfOrganizationIsAuthenticated } from '@/middlewares/check-if-organization-is-authenticated'
import { getByIdController } from '@/modules/pets/controllers/get-by-id.controller'
import { listController } from '@/modules/pets/controllers/list.controller'
import { registerController } from '@/modules/pets/controllers/register.controller'
import { FastifyInstance } from 'fastify'

export async function petsRoutes(app: FastifyInstance) {
	app.post(
		'/register',
		{ preHandler: [checkIfOrganizationIsAuthenticated] },
		registerController
	)

	app.get('/list', listController)
	app.get('/list/:id', getByIdController)
}
