import {
	OrganizationDTO,
	OrganizationResponseDTO
} from '../../schemas/organization.schema'
import { RegisterDTO } from '../../schemas/register.schema'

export interface OrganizationRepository {
	registerOrganization(params: RegisterDTO): Promise<OrganizationResponseDTO>
	findOrganizationByEmail(
		email: string
	): Promise<OrganizationResponseDTO | null>
	findOrganizationByEmailWithCredentials(
		email: string
	): Promise<OrganizationDTO | null>
}
