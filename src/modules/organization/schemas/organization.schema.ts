import z from 'zod'

export const organizationSchema = z.object({
	id: z.string(),
	name: z.string().max(30),
	description: z.string().max(100).nullish(),
	email: z.email(),
	password: z.string().min(6),
	city: z.string(),
	state: z.string().max(30),
	phone: z.string(),
	createdAt: z.date()
})

export type OrganizationDTO = z.infer<typeof organizationSchema>
export type OrganizationResponseDTO = Omit<OrganizationDTO, 'password'>
