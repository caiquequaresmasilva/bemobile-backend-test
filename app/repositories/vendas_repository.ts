import Cliente from '#models/cliente'
import Livro from '#models/livro'
import Venda from '#models/venda'
import { DBVenda, PropsVenda, VendaFull, VendasFilter } from '#types/venda'
import db from '@adonisjs/lucid/services/db'

export default class VendasRepository {
  private MODELS = {
    Cliente,
    Livro,
  }

  private async _serializeVenda(raw: DBVenda): Promise<VendaFull> {
    return {
      id: raw.id,
      data: raw.data.toJSDate(),
      precoTotal: raw.precoTotal,
      precoUnitario: raw.precoUnitario,
      quantidade: raw.quantidade,
      livro: {
        id: raw.livro.id,
        titulo: raw.livro.titulo,
        subtitulo: raw.livro.subtitulo,
        autor: raw.livro.autor.nome,
      },
    }
  }

  private _filterFunction(ano: number, mes: number) {
    return ({ data }: Venda) => {
      return data.month === (mes || data.month) || data.year === (ano || data.year)
    }
  }

  async validateId(model: 'Cliente' | 'Livro', id: number): Promise<string> {
    let error = ''
    const data = await this.MODELS[model].findBy({ id })
    if (!data) {
      error = `${model} não encontrado.`
    }
    return error
  }
  async create({
    clienteId,
    livroId,
    precoTotal,
    precoUnitario,
    quantidade,
  }: PropsVenda): Promise<PropsVenda> {
    return await db.transaction(async (trx) => {
      const venda = await Venda.create(
        {
          clienteId,
          livroId,
          precoTotal,
          precoUnitario,
          quantidade,
        },
        { client: trx }
      )
      return {
        id: venda.id,
        quantidade: venda.quantidade,
        precoUnitario: venda.precoUnitario,
        precoTotal: venda.precoTotal,
        clienteId: venda.clienteId,
        livroId: venda.livroId,
      }
    })
  }

  async getVendasByCliente({ id, ano = 0, mes = 0 }: VendasFilter) {
    let vendas = await Venda.query()
      .where('id', id)
      .orderBy('data', 'asc')
      .preload('livro', (livroQuery) => {
        livroQuery.preload('autor')
      })
    vendas = vendas.filter(this._filterFunction(ano, mes))
    return vendas.map(this._serializeVenda)
  }
}
