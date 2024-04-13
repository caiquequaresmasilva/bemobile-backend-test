import vine from '@vinejs/vine'

export const createVendaValidator = vine.compile(
  vine.object({
    clienteId: vine.number().positive().min(1),
    livroId: vine.number().positive().min(1),
    quantidade: vine.number().positive().min(1),
  })
)
