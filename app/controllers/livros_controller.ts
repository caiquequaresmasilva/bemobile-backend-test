import LivrosService from '#services/livros_service'
import { createLivroValidator, updateLivroValidator } from '#validators/livro'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class LivrosController {
  constructor(private readonly service: LivrosService) {}
  async store({ request, response }: HttpContext) {
    const props = request.body()
    const payload = await createLivroValidator.validate(props)
    const livro = await this.service.create(payload)
    response.status(201).json({ data: livro })
  }
  async update({ params, request, response }: HttpContext) {
    const props = request.body()
    const { id } = params
    const payload = await updateLivroValidator.validate(props)
    const livro = await this.service.update(id, payload)
    response.status(200).json({ data: livro })
  }

  async delete({ params, response }: HttpContext) {
    const { id } = params
    await this.service.delete(id)
    response.status(204)
  }

  async index({ response }: HttpContext) {
    const livros = await this.service.getLivros()
    response.status(200).json({ data: livros })
  }

  async show({ params, response }: HttpContext) {
    const { id } = params
    const livro = await this.service.getLivroById(id)
    response.status(200).json({ data: livro })
  }
}
