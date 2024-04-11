import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Cep from './cep.js'

export default class Uf extends BaseModel {
  static table = 'ufs'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @hasMany(() => Cep)
  declare ceps: HasMany<typeof Cep>
}
