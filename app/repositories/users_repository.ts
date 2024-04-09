import User from '#models/user'
import { UserProps } from '#types/user'

export default class UsersRepository {
  async create({ email, password }: UserProps): Promise<User> {
    return User.create({
      email,
      password,
    })
  }

  async verify({ email, password }: UserProps): Promise<User> {
    return User.verifyCredentials(email, password)
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findBy('email', email)
  }
}
