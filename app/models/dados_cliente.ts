import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Cliente from './cliente.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Endereco from './endereco.js'

export default class DadosCliente extends BaseModel {
  static table = 'dados_clientes'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cpf: string

  @column()
  declare telefone: string

  @column({ serializeAs: null })
  declare clienteId: number

  @belongsTo(() => Cliente)
  declare cliente: BelongsTo<typeof Cliente>

  @column({ serializeAs: null })
  declare enderecoId: number

  @belongsTo(() => Endereco)
  declare endereco: BelongsTo<typeof Endereco>
}
