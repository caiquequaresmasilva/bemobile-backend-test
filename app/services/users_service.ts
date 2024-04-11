import { inject } from '@adonisjs/core'
import UsersRepository from '../repositories/users_repository.js'
import { PropsUsuario } from '#types/usuario'
import UserAlreadyRegisteredException from '#exceptions/user_already_registered_exception'

@inject()
export default class UserService {
  constructor(protected repo: UsersRepository) {}
  async create({ email, senha }: PropsUsuario): Promise<Omit<PropsUsuario, 'senha'>> {
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

  async verify(user: PropsUsuario): Promise<Omit<PropsUsuario, 'senha'>> {
    return this.repo.verify(user)
  }
}
