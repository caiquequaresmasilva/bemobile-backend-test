import vine from '@vinejs/vine'

export const createLivroValidator = vine.compile(
  vine.object({
    titulo: vine.string().alphaNumeric({ allowSpaces: true }).minLength(2),
    subtitulo: vine.string().alphaNumeric({ allowSpaces: true }).minLength(1).optional(),
    autor: vine.string().alpha({ allowSpaces: true }).minLength(2),
    preco: vine.number().decimal(2).positive(),
    editora: vine.string().alphaNumeric({ allowSpaces: true }).minLength(2),
    idioma: vine.string().alpha().minLength(2),
    publicacao: vine.date({ formats: 'dd-mm-yy' }),
    dimensoes: vine
      .string()
      .trim()
      .regex(/^\d?\d.\d\sx\s\d?\d.\d\sx\s\d?\d.\d$/),
  })
)

export const updateLivroValidator = vine.compile(
  vine.object({
    titulo: vine.string().alphaNumeric({ allowSpaces: true }).minLength(2),
    subtitulo: vine.string().alphaNumeric({ allowSpaces: true }).minLength(1).optional(),
    preco: vine.number().decimal(2).positive(),
  })
)
