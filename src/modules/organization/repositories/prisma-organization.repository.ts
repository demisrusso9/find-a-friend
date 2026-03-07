import { prisma } from '@/lib/prisma'
import { OrganizationDTO } from '@/types/organization.type'
import { OrganizationRepository } from './contracts/organization.repository'

export class PrismaOrganizationRepository implements OrganizationRepository {
	async registerOrganization(params: OrganizationDTO) {
		const organization = await prisma.organization.create({ data: params })

		return organization
	}

	async findOrganizationByEmail(email: string) {
		const organization = await prisma.organization.findUnique({
			where: { email }
		})

		return organization ? (organization as OrganizationDTO) : null
	}
}
