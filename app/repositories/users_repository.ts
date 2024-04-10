import Usuario from '#models/usuario'
import { PropsUsuario } from '#types/usuario'

export default class UsuariosRepository {
  async create({ email, senha }: PropsUsuario): Promise<Usuario> {
    return Usuario.create({
      email,
      senha,
    })
  }

  async verify({ email, senha }: PropsUsuario): Promise<Usuario> {
    return Usuario.verifyCredentials(email, senha)
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return Usuario.findBy('email', email)
  }
}
