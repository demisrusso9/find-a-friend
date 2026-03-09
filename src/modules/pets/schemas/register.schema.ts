import z from 'zod'

export const registerPetSchema = z.object({
	name: z.string().max(30),
	age: z.number().int().positive(),
	size: z.enum(['small', 'medium', 'large'])
})

export type RegisterPetDTO = z.infer<typeof registerPetSchema>
