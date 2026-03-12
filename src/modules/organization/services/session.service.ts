import bcrypt from 'bcrypt'
import { OrganizationRepository } from '@/modules/organization/repositories/contracts/organization.repository'
import { InvalidCredentialsError } from '@/modules/organization/repositories/errors/invalid-credentials.error'
import { SessionDTO } from '@/modules/organization/schemas/session.schema'

export class SessionOrganizationService {
	constructor(private organizationRepository: OrganizationRepository) {}

	async execute(params: SessionDTO) {
		const user =
			await this.organizationRepository.findOrganizationByEmailWithCredentials(
				params.email
			)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatch = await bcrypt.compare(
			params.password,
			user.password
		)

		if (!doesPasswordMatch) {
			throw new InvalidCredentialsError()
		}

		const { password, ...safeUser } = user

		return safeUser
	}
}
