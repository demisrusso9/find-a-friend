import { PrismaOrganizationRepository } from '@/modules/organization/repositories/prisma-organization.repository'
import { RegisterOrganizationService } from '@/modules/organization/services/register.service'

export function makeRegisterService() {
	const organizationRepository = new PrismaOrganizationRepository()
	const registerService = new RegisterOrganizationService(
		organizationRepository
	)

	return registerService
}
