import z from 'zod'

export const petsSchema = z.object({
	id: z.string(),
	name: z.string().max(30),
	age: z.number().int().positive(),
	size: z.enum(['small', 'medium', 'large']),
	organizationId: z.string(),
	createdAt: z.date()
})

export type PetDTO = z.infer<typeof petsSchema>
