import { makeRegisterService } from '@/modules/organization/factories/make-register.service'
import { OrganizationAlreadyExistsError } from '@/modules/organization/repositories/errors/organization-already-exists.error'
import { registerSchema } from '@/modules/organization/schemas/register.schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function registerController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const log = request.log.child({ context: 'organization.register' })
	const body = registerSchema.parse(request.body)

	log.info({ email: body.email }, 'Organization registration attempt')

	try {
		const registerService = makeRegisterService()
		const organization = await registerService.execute(body)

		log.info({ email: body.email }, 'Organization registered successfully')
		return reply.status(201).send(organization)
	} catch (error) {
		if (error instanceof OrganizationAlreadyExistsError) {
			log.warn({ email: body.email }, 'Organization already exists')
			return reply.status(409).send({ message: error.message })
		}

		throw error
	}
}
