import z from 'zod'

export const filterPetsSchema = z.object({
	city: z.string().nonempty(),
	age: z.coerce.number().int().positive().optional(),
	size: z.enum(['small', 'medium', 'large']).optional(),
	breed: z.string().max(30).optional()
})

export type FilterPetsDTO = z.infer<typeof filterPetsSchema>

export interface FilterPetsResponseDTO {
	id: string
	name: string
	age: number
	breed: string
	size: string
	contact: {
		email: string
		phone: string
		city: string
		state: string
	}
}
