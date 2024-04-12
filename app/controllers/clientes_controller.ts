import ClientesService from '#services/clientes_service'
import { ClienteWithDetails, UpdateCliente } from '#types/cliente'
import { createClienteValidation, updateClienteVavidator } from '#validators/cliente'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
@inject()
export default class ClientesController {
  constructor(private readonly service: ClientesService) {}
  async index({ response }: HttpContext) {
    const clientes = await this.service.getClientes()
    response.status(200).json({ data: clientes })
  }

  async show({ params, response }: HttpContext) {
    const { id } = params
    const cliente = await this.service.getClienteById(Number(id))
    response.status(200).json({ data: cliente })
  }

  async store({ request, response }: HttpContext) {
    const props = request.body() as ClienteWithDetails
    const payload = await createClienteValidation.validate(props)
    const cliente = await this.service.create(payload)
    response.status(201).json({ data: cliente })
  }

  async update({ params, request, response }: HttpContext) {
    const props = request.body() as UpdateCliente
    const payload = await updateClienteVavidator.validate(props)
    const { id } = params
    const cliente = await this.service.update(Number(id), payload)
    response.status(200).json({ data: cliente })
  }

  async delete({ params, response }: HttpContext) {
    const { id } = params
    await this.service.delete(Number(id))
    response.status(204)
  }
}
