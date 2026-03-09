import { z } from 'zod'
import { organizationSchema } from './organization.schema'

export const registerSchema = organizationSchema.omit({
	id: true,
	createdAt: true
})
export type RegisterDTO = z.infer<typeof registerSchema>
