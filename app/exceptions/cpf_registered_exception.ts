import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class CpfRegisteredException extends Exception {
  constructor() {
    super('CPF já registrado.', { status: 400 })
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      errors: [
        {
          message: error.message,
          rule: 'cpf',
          field: 'cpf',
        },
      ],
    })
  }

  async report(error: this, ctx: HttpContext) {
    ctx.logger.error({ err: error }, error.message)
  }
}
