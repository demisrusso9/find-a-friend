import { makeSessionService } from '@/modules/organization/factories/make-session.service'
import { InvalidCredentialsError } from '@/modules/organization/repositories/errors/invalid-credentials.error'
import { OrganizationAlreadyExistsError } from '@/modules/organization/repositories/errors/organization-already-exists.error'
import { sessionSchema } from '@/modules/organization/schemas/session.schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function sessionController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const log = request.log.child({ context: 'organization.session' })
	const body = sessionSchema.parse(request.body)

	log.info({ email: body.email }, 'Organization login attempt')

	try {
		const sessionService = makeSessionService()
		const user = await sessionService.execute(body)

		const token = await reply.jwtSign({ sub: user.id })
		const refreshToken = await reply.jwtSign(
			{ sub: user.id },
			{ sign: { expiresIn: '7d' } }
		)

		log.info({ organizationId: user.id }, 'Organization logged in successfully')
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
			log.warn({ email: body.email }, 'Invalid credentials')
			return reply.status(401).send({ message: error.message })
		}

		throw error
	}
}
