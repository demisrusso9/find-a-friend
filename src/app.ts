import fastify from 'fastify'
import z, { ZodError } from 'zod'
import { organizationRoutes } from './routes'

export const app = fastify()

app.register(organizationRoutes, { prefix: '/organizations' })

app.setErrorHandler((error, request, reply) => {
	console.error(error)
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation Error', errors: z.prettifyError(error) })
	}

	reply.status(500).send({ message: 'Internal Server Error' })
})
