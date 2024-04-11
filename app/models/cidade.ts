import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Cep from './cep.js'

export default class Cidade extends BaseModel {
  static table = 'cidades'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @hasMany(() => Cep)
  declare ceps: HasMany<typeof Cep>
}
