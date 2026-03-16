import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'

export async function healthCheckRoutes(app: FastifyInstance) {
	app.get('/healthcheck', async (request, reply) => {
		await prisma.$queryRaw`SELECT 1`

		return reply.status(200).send({
			status: 'ok',
			database: 'ok',
			uptime: process.uptime()
		})
	})
}
