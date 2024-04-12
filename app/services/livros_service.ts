import { LivroWithDetails, UpdateLivro } from '#types/livros'
import { inject } from '@adonisjs/core'
import LivrosRepository from '../repositories/livros_repository.js'
import LivrosAlreadyExistsException from '#exceptions/livros_already_exists_exception'
import LivroNotFoundException from '#exceptions/livro_not_found_exception'

@inject()
export default class LivrosService {
  constructor(private readonly repo: LivrosRepository) {}

  async create(payload: LivroWithDetails) {
    const exists = await this.repo.exists({ titulo: payload.titulo, subtitulo: payload.subtitulo })
    if (exists) {
      throw new LivrosAlreadyExistsException()
    }
    return this.repo.create(payload)
  }

  async update(id: number, payload: UpdateLivro) {
    const exists = await this.repo.exists({ id })
    if (!exists) {
      throw new LivroNotFoundException()
    }
    return await this.repo.update(id, payload)
  }

  async delete(id: number) {
    const exists = await this.repo.exists({ id })
    if (!exists) {
      throw new LivroNotFoundException()
    }
    await this.repo.delete(id)
  }

  async getLivros() {
    this.repo.getLivros()
  }

  async getLivroById(id: number) {
    const exists = await this.repo.exists({ id })
    if (!exists) {
      throw new LivroNotFoundException()
    }
    return this.repo.getLivroById(id)
  }
}
