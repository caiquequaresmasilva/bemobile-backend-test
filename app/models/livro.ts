import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Autor from './autor.js'
import DadosLivro from './dados_livro.js'

export default class Livro extends BaseModel {
  static table = 'livros'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titulo: string

  @column()
  declare subtitulo: string | null

  @column()
  declare preco: number

  @column({ serializeAs: null })
  declare autorId: number

  @belongsTo(() => Autor)
  declare autor: BelongsTo<typeof Autor>

  @hasOne(() => DadosLivro)
  declare dados: HasOne<typeof DadosLivro>
}
