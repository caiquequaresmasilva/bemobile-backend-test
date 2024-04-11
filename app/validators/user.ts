import vine from '@vinejs/vine'

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    senha: vine.string().trim().regex(PASSWORD_PATTERN),
  })
)
