import cookie from '@fastify/cookie'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import z, { ZodError } from 'zod'
import { env } from './envs/envs'
import { organizationRoutes } from './routes/organization'
import { petsRoutes } from './routes/pets'

export const app = fastify()

app.register(cookie)
app.register(jwt, {
	cookie: {
		cookieName: 'refreshToken',
		signed: false
	},
	sign: {
		expiresIn: '15m'
	},
	secret: env.JWT_SECRET
})

app.register(organizationRoutes, { prefix: '/organizations' })
app.register(petsRoutes, { prefix: '/pets' })

app.setErrorHandler((error, request, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation Error', errors: z.prettifyError(error) })
	}

	return reply.status(500).send({
		message: 'Internal Server Error'
	})
})
