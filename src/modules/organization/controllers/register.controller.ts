import { organizationSchema } from '@/types/organization.type'
import { FastifyReply, FastifyRequest } from 'fastify'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists.error'
import { makeRegisterService } from '../factories/make-register.service'

export async function registerController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const body = organizationSchema.parse(request.body)

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
