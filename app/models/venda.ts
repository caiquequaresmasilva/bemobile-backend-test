import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Livro from './livro.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cliente from './cliente.js'

export default class Venda extends BaseModel {
  static table = 'vendas'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare quantidade: number

  @column()
  declare precoUnitario: number

  @column()
  declare precoTotal: number

  @column()
  declare data: DateTime

  @column({ serializeAs: null })
  declare livroId: number

  @belongsTo(() => Livro)
  declare livro: BelongsTo<typeof Livro>

  @column({ serializeAs: null })
  declare clienteId: number

  @belongsTo(() => Cliente)
  declare cliente: BelongsTo<typeof Cliente>
}
