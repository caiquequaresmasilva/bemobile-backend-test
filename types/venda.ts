import { DateTime } from 'luxon'

export type PropsVenda = {
  clienteId: number
  livroId: number
  quantidade: number
  precoUnitario: number
  precoTotal: number
}

export type VendasFilter = {
  id: number
  mes?: number
  ano?: number
}
export type DBVenda = {
  id: number
  livro: {
    id: number
    titulo: string
    subtitulo: string | null
    autor: {
      id: number
      nome: string
    }
    preco: number
  }
  quantidade: number
  precoUnitario: number
  precoTotal: number
  data: DateTime
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
  data: Date
}
