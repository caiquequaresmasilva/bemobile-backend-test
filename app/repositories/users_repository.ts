import User from '#models/user'
import { UserProps } from '#types/user'

export default class UsersRepository {
  async create({ email, senha }: UserProps): Promise<User> {
    return User.create({
      email,
      senha,
    })
  }

  async verify({ email, senha }: UserProps): Promise<User> {
    return User.verifyCredentials(email, senha)
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findBy('email', email)
  }
}
