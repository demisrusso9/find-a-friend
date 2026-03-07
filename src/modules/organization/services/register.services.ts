import { OrganizationDTO } from '@/types/organization.type'
import bcrypt from 'bcrypt'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists.error'
import { OrganizationRepository } from '../repositories/contracts/organization.repository'

export class RegisterOrganizationService {
	constructor(private organizationRepository: OrganizationRepository) {}

	async execute(params: OrganizationDTO) {
		const checkIfExists =
			await this.organizationRepository.findOrganizationByEmail(params.email)

		if (checkIfExists) {
			throw new OrganizationAlreadyExistsError()
		}

		const hashedPassword = await bcrypt.hash(params.password, 6)
		const organization = await this.organizationRepository.registerOrganization(
			{
				...params,
				password: hashedPassword
			}
		)

		return {
			organization
		}
	}
}
