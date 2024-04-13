import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class VendarsInvalidException extends Exception {
  constructor(message: string) {
    super(message, { status: 404 })
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      errors: [
        {
          message: error.message,
          rule: 'ids',
          field: 'ids',
        },
      ],
    })
  }

  async report(error: this, ctx: HttpContext) {
    ctx.logger.error({ err: error }, error.message)
  }
}
