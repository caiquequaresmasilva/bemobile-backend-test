import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Livro from './livro.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Editora from './editora.js'
import Idioma from './idioma.js'

export default class DadosLivro extends BaseModel {
  static table = 'dados_livros'
  @column({ isPrimary: true })
  declare id: number

  @column({ serializeAs: null })
  declare livroId: number

  @belongsTo(() => Livro)
  declare livro: BelongsTo<typeof Livro>

  @column({ serializeAs: null })
  declare editoraId: number

  @belongsTo(() => Editora)
  declare editora: BelongsTo<typeof Editora>

  @column({ serializeAs: null })
  declare idiomaId: number

  @belongsTo(() => Idioma)
  declare idioma: BelongsTo<typeof Idioma>

  @column()
  declare dimensoes: string

  @column.date({
    serialize: (value: DateTime) => {
      return value.toFormat('dd-LL-yyyy')
    },
  })
  declare publicacao: DateTime
}
