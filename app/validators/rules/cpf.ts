import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'
// Algoritmo oficial pra validação de número de CPF
const calculateDigit = (baseDigits: string, initialFactor: number = 0) => {
  let digit = 0
  for (let s of baseDigits) {
    digit += initialFactor * Number(s)
    initialFactor += 1
  }
  return (digit % 11).toString().slice(-1)
}

async function cpf(value: unknown, _options: undefined, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }
  let baseDigits = value.slice(0, 9)
  baseDigits += calculateDigit(baseDigits, 1)
  baseDigits += calculateDigit(baseDigits)

  if (baseDigits.slice(-2) !== value.slice(-2)) {
    field.report('O CPF fornecido não é valido', 'cpf', field)
  }
}

export const cpfRule = vine.createRule(cpf)
