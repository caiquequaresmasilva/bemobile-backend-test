import vine from '@vinejs/vine'
import { cpfRule } from './rules/cpf.js'
const NOME_PATTERN = /^(?=.*[a-zA-Z])[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]{1,}$/
const ENDERECO_PATTERN = /^(?=.*[a-zA-Z])[a-zA-Z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ',.\s]{1,}$/
export const createClienteValidation = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3).regex(NOME_PATTERN),
    email: vine.string().trim().email(),
    logradouro: vine.string().minLength(5).regex(ENDERECO_PATTERN).trim(),
    bairro: vine.string().regex(ENDERECO_PATTERN).minLength(1).trim(),
    numero: vine
      .string()
      .trim()
      .regex(/^[0-9]*$/),
    cidade: vine.string().regex(NOME_PATTERN).minLength(3).trim(),
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
    complemento: vine.string().regex(ENDERECO_PATTERN).optional(),
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
        nome: vine.string().trim().minLength(3).regex(NOME_PATTERN).optional(),
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
        complemento: vine.string().regex(ENDERECO_PATTERN).optional(),
      })
      .optional(),
    cep: vine
      .object({
        logradouro: vine.string().minLength(5).regex(ENDERECO_PATTERN).trim(),
        bairro: vine.string().regex(ENDERECO_PATTERN).minLength(1).trim(),
        uf: vine.string().trim().alpha().fixedLength(2).toUpperCase(),
        cep: vine.string().postalCode({ countryCode: ['BR'] }),
        cidade: vine.string().regex(NOME_PATTERN).minLength(3).trim(),
      })
      .optional(),
  })
)
