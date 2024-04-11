import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import DadosCliente from './dados_cliente.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

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
}
