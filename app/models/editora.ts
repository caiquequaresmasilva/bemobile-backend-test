import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import DadosLivro from './dados_livro.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Editora extends BaseModel {
  static table = 'editoras'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @hasMany(() => DadosLivro)
  declare dadosLivros: HasMany<typeof DadosLivro>
}
