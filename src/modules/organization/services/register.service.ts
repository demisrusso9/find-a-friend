import bcrypt from 'bcrypt'
import { OrganizationRepository } from '../repositories/contracts/organization.repository'
import { OrganizationAlreadyExistsError } from '../repositories/errors/organization-already-exists.error'
import { RegisterDTO } from '../schemas/register.schema'

export class RegisterOrganizationService {
	constructor(private organizationRepository: OrganizationRepository) {}

	async execute(params: RegisterDTO) {
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
