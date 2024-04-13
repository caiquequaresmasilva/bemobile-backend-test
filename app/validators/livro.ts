import vine from '@vinejs/vine'
const TEXT_PATTERN = /^(?=.*[a-zA-Z])[a-zA-Z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ',.\s]{1,}$/
const IDIOMA_PATTERN = /^(?=.*[a-zA-Z])[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]{1,}$/
export const createLivroValidator = vine.compile(
  vine.object({
    titulo: vine.string().minLength(2).regex(TEXT_PATTERN),
    subtitulo: vine.string().minLength(1).regex(TEXT_PATTERN).optional(),
    autor: vine.string().minLength(2).regex(TEXT_PATTERN),
    preco: vine.number().decimal(2).positive(),
    editora: vine.string().minLength(2).regex(TEXT_PATTERN),
    idioma: vine.string().minLength(2).regex(IDIOMA_PATTERN),
    publicacao: vine.date({ formats: ['DD-MM-YYYY'] }),
    dimensoes: vine
      .string()
      .trim()
      .regex(/^\d?\d.\d\sx\s\d?\d.\d\sx\s\d?\d.\d$/),
  })
)

export const updateLivroValidator = vine.compile(
  vine.object({
    titulo: vine.string().minLength(2).regex(TEXT_PATTERN).optional(),
    subtitulo: vine.string().minLength(1).regex(TEXT_PATTERN).optional(),
    preco: vine.number().decimal(2).positive().optional(),
  })
)
