import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class UnauthorizedException extends Exception {
  constructor() {
    super('Token de autenticação inválido. Acesso não autorizado', { status: 401 })
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      errors: [
        {
          message: error.message,
          rule: 'token',
          field: 'token',
        },
      ],
    })
  }

  async report(error: this, ctx: HttpContext) {
    ctx.logger.error({ err: error }, error.message)
  }
}
