import vine from '@vinejs/vine'
import { cpfRule } from './rules/cpf.js'

export const createClienteValidation = vine.compile(
  vine.object({
    nome: vine.string().alpha().trim().minLength(3),
    email: vine.string().trim().email(),
    logradouro: vine.string().alphaNumeric({ allowSpaces: true }).minLength(5).trim(),
    bairro: vine.string().alpha().minLength(1).trim(),
    numero: vine
      .string()
      .trim()
      .regex(/^[0-9]*$/),
    cidade: vine.string().alpha().minLength(3).trim(),
    uf: vine
      .string()
      .trim()
      .regex(/^[a-zA-Z]*$/)
      .fixedLength(2)
      .toUpperCase(),
    cep: vine.string().postalCode({ countryCode: ['BR'] }),
    telefone: vine
      .string()
      .trim()
      .regex(/^[0-9]*$/)
      .minLength(10)
      .maxLength(11),
    complemento: vine.string().alphaNumeric({ allowSpaces: true }).optional(),
    cpf: vine
      .string()
      .trim()
      .regex(/^[0-9]*$/)
      .fixedLength(11)
      .use(cpfRule()),
  })
)
export const updateClienteVavidator = vine.compile(
  vine.object({
    cliente: vine
      .object({
        nome: vine.string().alpha().trim().minLength(3).optional(),
        email: vine.string().trim().email().optional(),
      })
      .optional(),
    dados: vine
      .object({
        cpf: vine
          .string()
          .trim()
          .regex(/^[0-9]*$/)
          .fixedLength(11)
          .use(cpfRule())
          .optional(),
        telefone: vine
          .string()
          .trim()
          .regex(/^[0-9]*$/)
          .minLength(10)
          .maxLength(11)
          .optional(),
      })
      .optional(),
    endereco: vine
      .object({
        numero: vine
          .string()
          .trim()
          .regex(/^[0-9]*$/)
          .optional(),
        complemento: vine.string().alphaNumeric({ allowSpaces: true }).optional(),
      })
      .optional(),
    cep: vine
      .object({
        logradouro: vine.string().alphaNumeric({ allowSpaces: true }).minLength(5).trim(),
        bairro: vine.string().alpha().minLength(1).trim(),
        uf: vine
          .string()
          .trim()
          .regex(/^[a-zA-Z]*$/)
          .fixedLength(2)
          .toUpperCase(),
        cep: vine.string().postalCode({ countryCode: ['BR'] }),
        cidade: vine.string().alpha().minLength(3).trim(),
      })
      .optional(),
  })
)
