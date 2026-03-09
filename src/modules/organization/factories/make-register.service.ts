import { PrismaOrganizationRepository } from '../repositories/prisma-organization.repository'
import { RegisterOrganizationService } from '../services/register.service'

export function makeRegisterService() {
	const organizationRepository = new PrismaOrganizationRepository()
	const registerService = new RegisterOrganizationService(
		organizationRepository
	)

	return registerService
}
