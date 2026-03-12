import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListPetsService } from '../factories/make-list.service'
import { filterPetsSchema } from '../schemas/filters.schema'

export async function listController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const query = filterPetsSchema.parse(request.query)

	try {
		const listPetsService = makeListPetsService()
		const pet = await listPetsService.execute(query)

		return reply.status(200).send(pet)
	} catch (error) {
		throw error
	}
}
