import { inject } from '@adonisjs/core'
import VendasRepository from '../repositories/vendas_repository.js'
import { PropsVenda, VendasFilter } from '#types/venda'
import VendarsInvalidException from '#exceptions/vendars_invalid_exception'
import PrecoTotalException from '#exceptions/preco_total_exception'
import ClienteNotFoundException from '#exceptions/cliente_not_found_exception'

@inject()
export default class VendasService {
  constructor(private readonly repo: VendasRepository) {}

  async create({ clienteId, livroId, precoTotal, precoUnitario, quantidade }: PropsVenda) {
    let error = await this.repo.validateId('Cliente', clienteId)
    error += await this.repo.validateId('Livro', livroId)
    if (error) {
      throw new VendarsInvalidException(error)
    }
    if (quantidade * precoUnitario !== precoTotal) {
      throw new PrecoTotalException()
    }
    return await this.repo.create({ clienteId, livroId, precoTotal, precoUnitario, quantidade })
  }

  async getVendasByCliente({ id, ano, mes }: VendasFilter) {
    const error = await this.repo.validateId('Cliente', id)
    if (error) {
      throw new ClienteNotFoundException()
    }
    return await this.repo.getVendasByCliente({ id, ano, mes })
  }
}
