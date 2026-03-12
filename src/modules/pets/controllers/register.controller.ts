import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterPetService } from '@/modules/pets/factories/make-register.service'
import { registerPetSchema } from '@/modules/pets/schemas/register.schema'

export async function registerController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const body = registerPetSchema.parse(request.body)
	const organizationId = request.user.sub

	const data = {
		...body,
		organizationId
	}

	try {
		const registerPetService = makeRegisterPetService()
		const pet = await registerPetService.execute(data)

		return reply.status(201).send(pet)
	} catch (error) {
		throw error
	}
}
