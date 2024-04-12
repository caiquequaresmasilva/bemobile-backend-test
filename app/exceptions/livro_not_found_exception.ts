import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class LivroNotFoundException extends Exception {
  constructor() {
    super('O livro não foi encontrado', { status: 404 })
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
