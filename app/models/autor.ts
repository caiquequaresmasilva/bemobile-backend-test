import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Livro from './livro.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Autor extends BaseModel {
  static table = 'autores'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @hasMany(() => Livro)
  declare livros: HasMany<typeof Livro>
}
