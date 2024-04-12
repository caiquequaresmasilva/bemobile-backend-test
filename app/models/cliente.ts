import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import DadosCliente from './dados_cliente.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Venda from './venda.js'

export default class Cliente extends BaseModel {
  static table = 'clientes'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare email: string

  @hasOne(() => DadosCliente)
  declare dados: HasOne<typeof DadosCliente>

  @hasMany(() => Venda)
  declare vendas: HasMany<typeof Venda>
}
