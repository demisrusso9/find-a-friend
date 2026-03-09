import { prisma } from '@/lib/prisma'
import { RegisterDTO } from '../schemas/register.schema'
import { OrganizationRepository } from './contracts/organization.repository'

export class PrismaOrganizationRepository implements OrganizationRepository {
	async registerOrganization(params: RegisterDTO) {
		return await prisma.organization.create({
			data: params,
			omit: { password: true }
		})
	}

	async findOrganizationByEmail(email: string) {
		return prisma.organization.findUnique({
			where: { email },
			omit: { password: true }
		})
	}

	async findOrganizationByEmailWithCredentials(email: string) {
		return prisma.organization.findUnique({ where: { email } })
	}
}
