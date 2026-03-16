import { makeListPetsService } from '@/modules/pets/factories/make-list.service'
import { filterPetsSchema } from '@/modules/pets/schemas/filters.schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const log = request.log.child({ context: 'pets.list' })
	const query = filterPetsSchema.parse(request.query)

	log.info({ filters: query }, 'Listing pets')

	try {
		const listPetsService = makeListPetsService()
		const pet = await listPetsService.execute(query)

		return reply.status(200).send(pet)
	} catch (error) {
		throw error
	}
}
