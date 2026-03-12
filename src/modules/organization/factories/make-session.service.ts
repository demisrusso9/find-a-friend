import { PrismaOrganizationRepository } from '@/modules/organization/repositories/prisma-organization.repository'
import { SessionOrganizationService } from '@/modules/organization/services/session.service'

export function makeSessionService() {
	const organizationRepository = new PrismaOrganizationRepository()
	const sessionService = new SessionOrganizationService(organizationRepository)

	return sessionService
}
