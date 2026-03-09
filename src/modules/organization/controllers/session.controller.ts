import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSessionService } from '../factories/make-session.service'
import { InvalidCredentialsError } from '../repositories/errors/invalid-credentials.error'
import { OrganizationAlreadyExistsError } from '../repositories/errors/organization-already-exists.error'
import { sessionSchema } from '../schemas/session.schema'

export async function sessionController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const body = sessionSchema.parse(request.body)

	try {
		const sessionService = makeSessionService()
		const user = await sessionService.execute(body)

		const token = await reply.jwtSign({ sub: user.id })
		const refreshToken = await reply.jwtSign(
			{ sub: user.id },
			{ sign: { expiresIn: '7d' } }
		)

		return reply
			.setCookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				path: '/'
			})
			.status(200)
			.send({ token })
	} catch (error) {
		if (error instanceof OrganizationAlreadyExistsError) {
			return reply.status(409).send({ message: error.message })
		}

		if (error instanceof InvalidCredentialsError) {
			return reply.status(401).send({ message: error.message })
		}

		throw error
	}
}
