import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'

export async function healthCheckRoutes(app: FastifyInstance) {
	app.get('/healthcheck', async (request, reply) => {
		await prisma.$queryRaw`SELECT 1`

		const log = request.log.child({ context: 'healthcheck' })
		log.info('Healthcheck endpoint accessed')

		return reply.status(200).send({
			status: 'ok',
			database: 'ok',
			uptime: process.uptime()
		})
	})
}
