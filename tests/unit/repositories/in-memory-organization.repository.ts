import { OrganizationDTO } from '@/types/organization.type'
import { OrganizationRepository } from '../../../src/modules/organization/repositories/contracts/organization.repository'

export class InMemoryOrganizationRepository implements OrganizationRepository {
	public organizations: OrganizationDTO[] = []

	async registerOrganization(
		params: OrganizationDTO
	): Promise<OrganizationDTO> {
		this.organizations.push(params)

		return params
	}

	async findOrganizationByEmail(
		email: string
	): Promise<OrganizationDTO | null> {
		const organization = this.organizations.find((org) => org.email === email)

		return organization ?? null
	}
}
