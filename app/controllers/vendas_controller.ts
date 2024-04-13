import VendasService from '#services/vendas_service'
import { createVendaValidator } from '#validators/venda'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
@inject()
export default class VendasController {
  constructor(private readonly service: VendasService) {}

  async store({ request, response }: HttpContext) {
    const props = request.body()
    const payload = await createVendaValidator.validate(props)
    const venda = await this.service.create(payload)
    response.status(201).json({ data: venda })
  }

  async filterByCliente({ request, response, params }: HttpContext) {
    const { mes, ano } = request.qs()
    const { id } = params
    const vendas = await this.service.getVendasByCliente({
      id,
      mes: Number.isNaN(mes) ? 0 : Number(mes),
      ano: Number.isNaN(ano) ? 0 : Number(ano),
    })
    response.status(200).json({ data: vendas })
  }
}
