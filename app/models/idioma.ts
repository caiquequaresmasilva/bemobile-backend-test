import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import DadosLivro from './dados_livro.js'

export default class Idioma extends BaseModel {
  static table = 'idiomas'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @hasMany(() => DadosLivro)
  declare dadosLivros: HasMany<typeof DadosLivro>
}
