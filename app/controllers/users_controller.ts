import UserService from '#services/users_service'
import { createUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(protected service: UserService) {}
  async signup({ request, response }: HttpContext) {
    const { email, senha } = request.body()
    const payload = await createUserValidator.validate({ email, senha })
    const user = await this.service.create(payload)

    response.status(201).json({ data: user })
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, senha } = request.body()
    const user = await this.service.verify({ email, senha })
    const token = await auth.use('jwt').generate(user)

    response.status(201).json({ data: token })
  }
}
