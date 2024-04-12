export type PropsCliente = {
  id?: number
  nome: string
  email: string
}

export type ClienteWithDetails = {
  cpf: string
  logradouro: string
  bairro: string
  numero: string
  complemento?: string
  cidade: string
  uf: string
  cep: string
  telefone: string
} & PropsCliente

export type UpdateCliente = {
  cliente?: {
    nome?: string
    email?: string
  }
  dados?: {
    cpf?: string
    telefone?: string
  }
  endereco?: {
    numero?: string
    complemento?: string
  }
  cep?: {
    logradouro: string
    cep: string
    bairro: string
    cidade: string
    uf: string
  }
}
export type DBClienteFull = {
  id: number
  nome: string
  email: string
  dados: {
    id: number
    cpf: string
    telefone: string
    endereco: {
      id: number
      numero: string
      complemento?: string
      cep: {
        id: number
        logradouro: string
        cep: string
        bairro: {
          id: number
          nome: string
        }
        cidade: {
          id: number
          nome: string
        }
        uf: {
          id: number
          nome: string
        }
      }
    }
  }
}
