import z from 'zod'

export const getByIdPetsSchema = z.object({
	id: z.string()
})
