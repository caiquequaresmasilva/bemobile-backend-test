import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Endereco from './endereco.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Bairro from './bairro.js'
import Cidade from './cidade.js'
import Uf from './uf.js'

export default class Cep extends BaseModel {
  static table = 'ceps'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cep: string

  @column()
  declare logradouro: string

  @hasMany(() => Endereco)
  declare enderecos: HasMany<typeof Endereco>

  @column({ serializeAs: null })
  declare bairroId: number

  @belongsTo(() => Bairro)
  declare bairro: BelongsTo<typeof Bairro>

  @column({ serializeAs: null })
  declare cidadeId: number

  @belongsTo(() => Cidade)
  declare cidade: BelongsTo<typeof Cidade>

  @column({ serializeAs: null })
  declare ufId: number

  @belongsTo(() => Uf)
  declare uf: BelongsTo<typeof Uf>
}
