import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterService } from '../factories/make-register.service'
import { OrganizationAlreadyExistsError } from '../repositories/errors/organization-already-exists.error'
import { registerSchema } from '../schemas/register.schema'

export async function registerController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const body = registerSchema.parse(request.body)

	try {
		const registerService = makeRegisterService()
		const organization = await registerService.execute(body)

		return reply.status(201).send(organization)
	} catch (error) {
		if (error instanceof OrganizationAlreadyExistsError) {
			return reply.status(409).send({ message: error.message })
		}

		throw error
	}
}
