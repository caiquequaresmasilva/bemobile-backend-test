import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Cep from './cep.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Bairro extends BaseModel {
  static table = 'bairros'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @hasMany(() => Cep)
  declare ceps: HasMany<typeof Cep>
}
