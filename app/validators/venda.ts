import vine from '@vinejs/vine'

const createVendaValidator = vine.compile(
  vine.object({
    clienteId: vine.number().positive().min(1),
    livroId: vine.number().positive().min(1),
    quantidade: vine.number().positive().min(1),
    precoUnitario: vine.number().decimal(2).positive().min(1),
    precoTotal: vine.number().decimal(2).positive().min(1),
  })
)
