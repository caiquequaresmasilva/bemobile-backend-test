import {
  DBLivro,
  LivroExistsParams,
  LivroWithDetails,
  PropsLivro,
  UpdateLivro,
} from '#types/livros'
import Autor from '#models/autor'
import Editora from '#models/editora'
import Idioma from '#models/idioma'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import Livro from '#models/livro'
import { DateTime } from 'luxon'

export default class LivrosRepository {
  private MODELS = {
    Autor,
    Editora,
    Idioma,
  }
  private async _findOrCreate(
    payload: { nome: string },
    model: 'Autor' | 'Editora' | 'Idioma',
    trx: TransactionClientContract
  ) {
    const entity = await this.MODELS[model].firstOrCreate(payload, payload, { client: trx })
    return entity
  }

  private async _serializeLivro(livro: DBLivro): Promise<PropsLivro> {
    return {
      id: livro.id,
      titulo: livro.titulo,
      subtitulo: livro.subtitulo,
      preco: Number(livro.preco),
      autor: livro.autor.nome,
    }
  }
  private async _serializeFullLivro(raw: Livro): Promise<LivroWithDetails> {
    const livro = raw.toJSON()
    return {
      id: livro.id,
      titulo: livro.titulo,
      subtitulo: livro.subtitulo,
      preco: Number(livro.preco),
      autor: livro.autor.nome,
      dimensoes: livro.dados.dimensoes,
      editora: livro.dados.editora.nome,
      idioma: livro.dados.idioma.nome,
      publicacao: livro.dados.publicacao,
    }
  }

  async exists({ id, titulo, subtitulo = null }: LivroExistsParams) {
    const filter = id ? { id } : { titulo, subtitulo }
    const dados = await Livro.findBy(filter)
    return Boolean(dados)
  }
  async create(payload: LivroWithDetails): Promise<PropsLivro> {
    return await db.transaction(async (trx) => {
      // Primeiro, cria ou busca as entidades independentes.
      const autor = (await this._findOrCreate({ nome: payload.autor }, 'Autor', trx)) as Autor
      const idioma = (await this._findOrCreate({ nome: payload.idioma }, 'Idioma', trx)) as Idioma
      const editora = (await this._findOrCreate(
        { nome: payload.editora },
        'Editora',
        trx
      )) as Editora
      // Cria novo Livro vinculado ao autor
      const livro = await autor.related('livros').create(
        {
          titulo: payload.titulo,
          subtitulo: payload.subtitulo,
          preco: payload.preco,
        },
        { client: trx }
      )
      // Cria dados livro vinculado ao livro
      await livro.related('dados').create(
        {
          editoraId: editora.id,
          idiomaId: idioma.id,
          dimensoes: payload.dimensoes,
          publicacao: DateTime.fromJSDate(payload.publicacao),
        },
        { client: trx }
      )
      return {
        id: livro.id,
        titulo: livro.titulo,
        subtitulo: livro.subtitulo || null,
        autor: autor.nome,
        preco: livro.preco,
      }
    })
  }

  async update(
    id: number,
    { preco, subtitulo = '', titulo }: UpdateLivro
  ): Promise<PropsLivro | null> {
    await db.transaction(async (trx) => {
      const livro = await Livro.findOrFail(id)
      livro.useTransaction(trx)
      await livro.load('autor')
      await livro.merge({ preco, subtitulo, titulo }).save()
    })
    const response = await Livro.findOrFail(id)
    await response.load('autor')
    return this._serializeLivro(response)
  }

  async getLivros(): Promise<PropsLivro[]> {
    const livros = await Livro.query().preload('autor')
    const mapedLivros = await Promise.all(livros.map(this._serializeLivro))
    // Organiza os livros em ordem alfabetica considerando titulo e subtitulo
    return mapedLivros.sort((a, b) =>
      `${a.titulo}${a.subtitulo || ''}`.localeCompare(`${b.titulo}${b.subtitulo || ''}`)
    )
  }

  async getLivroById(id: number): Promise<PropsLivro | null> {
    const livro = await Livro.query()
      .where('id', id)
      .preload('autor')
      .preload('dados', (dadosQuery) => {
        dadosQuery.preload('editora').preload('idioma')
      })
    return livro.length === 0 ? null : this._serializeFullLivro(livro[0])
  }

  async delete(id: number) {
    // Executa soft delete através do plugin 'adonis-lucid-soft-deletes'
    const livro = await Livro.findOrFail(id)
    await livro.delete()
  }
}
