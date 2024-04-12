import { DateTime } from 'luxon'

export type PropsLivro = {
  id?: number
  titulo: string
  subtitulo?: string | null
  autor: string
  preco: number
}
export type LivroWithDetails = {
  editora: string
  idioma: string
  dimensoes: string
  publicacao: Date
} & PropsLivro

export type UpdateLivro = {
  titulo?: string
  subtitulo?: string
  preco?: number
}

export type DBLivro = {
  id: number
  titulo: string
  subtitulo: string | null | undefined
  preco: number
  autor: {
    id: number
    nome: string
  }
}

export type DBFullLivro = {
  dados: {
    id: number
    dimensoes: string
    publicacao: DateTime
    editora: {
      id: number
      nome: string
    }
    idioma: {
      id: number
      nome: string
    }
  }
} & DBLivro

export type LivroExistsParams = {
  id?: number
  titulo?: string
  subtitulo?: string | null
}
