import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import DadosCliente from './dados_cliente.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Cep from './cep.js'

export default class Endereco extends BaseModel {
  static table = 'enderecos'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numero: string

  @column()
  declare complemento: string

  @hasMany(() => DadosCliente)
  declare dadosCliente: HasMany<typeof DadosCliente>

  @column({ serializeAs: null })
  declare cepId: number

  @belongsTo(() => Cep)
  declare cep: BelongsTo<typeof Cep>
}
