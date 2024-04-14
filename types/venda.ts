import { DateTime } from 'luxon'

export type PropsVenda = {
  clienteId: number
  livroId: number
  quantidade: number
}

export type VendasFilter = {
  id: number
  mes?: number
  ano?: number
}

export type VendaFull = {
  id: number
  livro: {
    id: number
    titulo: string
    subtitulo: string | null
    autor: string
  }
  precoUnitario: number
  quantidade: number
  precoTotal: number
  data: DateTime
}
