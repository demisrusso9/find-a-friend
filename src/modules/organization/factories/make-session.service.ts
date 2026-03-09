import { PrismaOrganizationRepository } from '../repositories/prisma-organization.repository'
import { SessionOrganizationService } from '../services/session.service'

export function makeSessionService() {
	const organizationRepository = new PrismaOrganizationRepository()
	const sessionService = new SessionOrganizationService(organizationRepository)

	return sessionService
}
