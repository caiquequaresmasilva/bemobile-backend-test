import Cliente from '#models/cliente'
import Livro from '#models/livro'
import Venda from '#models/venda'
import { PropsVenda, VendaFull, VendasFilter } from '#types/venda'
import db from '@adonisjs/lucid/services/db'
export default class VendasRepository {
  private MODELS = {
    Cliente,
    Livro,
  }

  private async _serializeVenda(venda: Venda): Promise<VendaFull> {
    const raw = venda.toJSON()
    return {
      id: raw.id,
      data: raw.data,
      precoTotal: Number(raw.precoTotal),
      precoUnitario: Number(raw.precoUnitario),
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
      const localDate = data.setZone('UTC-3')
      return (
        localDate.month === (mes || localDate.month) && localDate.year === (ano || localDate.year)
      )
    }
  }

  async validateId(model: 'Cliente' | 'Livro', id: number): Promise<string> {
    const data = await this.MODELS[model].findBy({ id })
    if (!data) {
      return `${model} não encontrado.`
    }
    return ''
  }
  async create({ clienteId, livroId, quantidade }: PropsVenda): Promise<PropsVenda> {
    return await db.transaction(async (trx) => {
      // Resgata a informação de preco direto do livro e calcula o total
      const livro = await Livro.findOrFail(livroId)
      const venda = await Venda.create(
        {
          clienteId,
          livroId,
          precoTotal: quantidade * livro.preco,
          precoUnitario: livro.preco,
          quantidade,
        },
        { client: trx }
      )
      return {
        id: venda.id,
        quantidade: venda.quantidade,
        precoUnitario: Number(venda.precoUnitario),
        precoTotal: venda.precoTotal,
        clienteId: venda.clienteId,
        livroId: venda.livroId,
      }
    })
  }

  async getVendasByCliente({ id, ano = 0, mes = 0 }: VendasFilter) {
    let vendas = await Venda.query()
      .where('cliente_id', id)
      .orderBy('data', 'asc')
      .preload('livro', (livroQuery) => {
        livroQuery.preload('autor')
      })
    vendas = vendas.filter(this._filterFunction(ano, mes))
    return Promise.all(vendas.map(this._serializeVenda))
  }
}
