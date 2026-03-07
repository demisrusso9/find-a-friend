import { app } from './app'
import { env } from './envs/envs'

app
	.listen({
		port: env.PORT,
		host: env.HOST
	})
	.then(() => console.log(`Listening on ${env.HOST}:${env.PORT}`))
