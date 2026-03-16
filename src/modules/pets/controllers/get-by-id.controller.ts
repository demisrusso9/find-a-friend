import { makeGetByIdPetsService } from '@/modules/pets/factories/make-get-by-id.service'
import { getByIdPetsSchema } from '@/modules/pets/schemas/get-by-id.schema'
import { PetNotFoundError } from '@/modules/pets/services/errors/pet-not-found.error'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getByIdController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const log = request.log.child({ context: 'pets.getById' })
	const params = getByIdPetsSchema.parse(request.params)

	log.info({ petId: params.id }, 'Fetching pet by id')

	try {
		const getByIdPetsService = makeGetByIdPetsService()
		const pet = await getByIdPetsService.execute(params.id)

		return reply.status(200).send(pet)
	} catch (error) {
		if (error instanceof PetNotFoundError) {
			log.warn({ petId: params.id }, 'Pet not found')
			return reply.status(404).send({ message: error.message })
		}

		throw error
	}
}
