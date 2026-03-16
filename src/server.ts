import { app } from './app'
import { env } from './envs/envs'

app
	.listen({
		port: env.PORT,
		host: env.HOST
	})
	.then(() =>
		console.log(`[${env.NODE_ENV}] Server listening on port ${env.PORT}`)
	)
