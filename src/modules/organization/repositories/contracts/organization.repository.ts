import { OrganizationDTO } from '@/types/organization.type'

export interface OrganizationRepository {
	registerOrganization(params: OrganizationDTO): Promise<OrganizationDTO>
	findOrganizationByEmail(email: string): Promise<OrganizationDTO | null>
}
