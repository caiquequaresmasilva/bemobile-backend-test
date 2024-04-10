import { inject } from '@adonisjs/core'
import UsersRepository from '../repositories/users_repository.js'
import { UserProps } from '#types/user'
import UserAlreadyRegisteredException from '#exceptions/user_already_registered_exception'

@inject()
export default class UserService {
  constructor(protected repo: UsersRepository) {}
  async create({ email, senha }: UserProps): Promise<Omit<UserProps, 'senha'>> {
    const user = await this.repo.findByEmail(email)
    if (user) {
      throw new UserAlreadyRegisteredException()
    }
    const newUser = await this.repo.create({ email, senha })
    return {
      id: newUser.id,
      email: newUser.email,
    }
  }

  async verify(user: UserProps): Promise<Omit<UserProps, 'senha'>> {
    return this.repo.verify(user)
  }
}
