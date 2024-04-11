import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import DadosCliente from './dados_cliente.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Cep from './cep.js'

export default class Endereco extends BaseModel {
  static table = 'enderecos'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numero: string

  @column()
  declare complemento: string

  @hasOne(() => DadosCliente)
  declare dadosCliente: HasOne<typeof DadosCliente>

  @column({ serializeAs: null })
  declare cepId: number

  @belongsTo(() => Cep)
  declare cep: BelongsTo<typeof Cep>
}
