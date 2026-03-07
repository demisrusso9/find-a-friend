import z from 'zod'

export const organizationSchema = z.object({
	name: z.string().max(30),
	description: z.string().max(100).nullish(),
	email: z.email(),
	password: z.string().min(6),
	city: z.string(),
	state: z.string().max(30),
	phone: z.string()
})

export type OrganizationDTO = z.infer<typeof organizationSchema>

export type OrganizationResponseDTO = Omit<OrganizationDTO, 'password'>
