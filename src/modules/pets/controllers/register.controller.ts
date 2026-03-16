import { makeRegisterPetService } from '@/modules/pets/factories/make-register.service'
import { registerPetSchema } from '@/modules/pets/schemas/register.schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function registerController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const log = request.log.child({ context: 'pets.register' })
	const body = registerPetSchema.parse(request.body)
	const organizationId = request.user.sub

	log.info({ organizationId }, 'Pet registration attempt')

	const data = {
		...body,
		organizationId
	}

	try {
		const registerPetService = makeRegisterPetService()
		const pet = await registerPetService.execute(data)

		log.info({ organizationId, petId: pet.id }, 'Pet registered successfully')
		return reply.status(201).send(pet)
	} catch (error) {
		throw error
	}
}
