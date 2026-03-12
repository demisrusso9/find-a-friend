import {
	OrganizationDTO,
	OrganizationResponseDTO
} from '@/modules/organization/schemas/organization.schema'
import { RegisterDTO } from '@/modules/organization/schemas/register.schema'

export interface OrganizationRepository {
	registerOrganization(params: RegisterDTO): Promise<OrganizationResponseDTO>
	findOrganizationByEmail(
		email: string
	): Promise<OrganizationResponseDTO | null>
	findOrganizationByEmailWithCredentials(
		email: string
	): Promise<OrganizationDTO | null>
}
