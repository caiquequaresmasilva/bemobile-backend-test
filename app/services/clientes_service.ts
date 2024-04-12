import { inject } from '@adonisjs/core'
import ClientesRepository from '../repositories/clientes_repository.js'
import { ClienteWithDetails, UpdateCliente } from '#types/cliente'
import CpfRegisteredException from '#exceptions/cpf_registered_exception'
import ClienteNotFoundException from '#exceptions/cliente_not_found_exception'

@inject()
export default class ClientesService {
  constructor(private readonly repo: ClientesRepository) {}

  async create(props: ClienteWithDetails) {
    const exists = await this.repo.exists({ cpf: props.cpf })
    if (exists) {
      throw new CpfRegisteredException()
    }
    return this.repo.create(props)
  }

  async update(id: number, props: UpdateCliente) {
    const exists = await this.repo.exists({ id })
    if (!exists) {
      throw new ClienteNotFoundException()
    }
    return this.repo.updateCliente(id, props)
  }

  async getClientes() {
    return this.repo.getClientes()
  }

  async getClienteById(id: number) {
    const cliente = await this.repo.getClienteById(id)
    if (!cliente) {
      throw new ClienteNotFoundException()
    }
    return cliente
  }

  async delete(id: number) {
    await this.repo.deleteCliente(id)
  }
}
