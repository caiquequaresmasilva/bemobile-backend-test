import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class LivrosAlreadyExistsException extends Exception {
  constructor() {
    super('O livro já existe', { status: 400 })
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      errors: [
        {
          message: error.message,
          rule: 'livro',
          field: 'livro',
        },
      ],
    })
  }

  async report(error: this, ctx: HttpContext) {
    ctx.logger.error({ err: error }, error.message)
  }
}
