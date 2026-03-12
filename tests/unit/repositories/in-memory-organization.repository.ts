import {
	OrganizationDTO,
	OrganizationResponseDTO
} from '@/modules/organization/schemas/organization.schema'
import { RegisterDTO } from '@/modules/organization/schemas/register.schema'
import { randomUUID } from 'node:crypto'
import { OrganizationRepository } from '@/modules/organization/repositories/contracts/organization.repository'

export class InMemoryOrganizationRepository implements OrganizationRepository {
	public organizations: OrganizationDTO[] = []

	async registerOrganization(
		params: RegisterDTO
	): Promise<OrganizationResponseDTO> {
		const organization: OrganizationDTO = {
			...params,
			id: randomUUID(),
			createdAt: new Date()
		}

		this.organizations.push(organization)

		const { password: _, ...organizationData } = organization

		return organizationData
	}

	async findOrganizationByEmail(
		email: string
	): Promise<OrganizationResponseDTO | null> {
		const organization = this.organizations.find((org) => org.email === email)

		if (!organization) return null

		const { password: _, ...organizationData } = organization

		return organizationData
	}

	async findOrganizationByEmailWithCredentials(
		email: string
	): Promise<OrganizationDTO | null> {
		const organization = this.organizations.find((org) => org.email === email)

		return organization ?? null
	}
}
