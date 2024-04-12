import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

import Bairro from '#models/bairro'
import Cidade from '#models/cidade'
import Uf from '#models/uf'
import Cliente from '#models/cliente'
import { ClienteWithDetails, DBClienteFull, PropsCliente, UpdateCliente } from '#types/cliente'
import Cep from '#models/cep'
import Endereco from '#models/endereco'
import DadosCliente from '#models/dados_cliente'

export default class ClientesRepository {
  private MODELS = {
    Bairro,
    Cidade,
    Uf,
  }
  private async _findOrCreate(
    payload: { nome: string },
    model: 'Bairro' | 'Cidade' | 'Uf',
    trx: TransactionClientContract
  ) {
    const entity = await this.MODELS[model].firstOrCreate(payload, payload, { client: trx })
    return entity
  }

  private async _serializeCliente({
    dados,
    email,
    id,
    nome,
  }: DBClienteFull): Promise<ClienteWithDetails> {
    const { endereco } = dados
    const { cep } = endereco
    const { bairro, cidade, uf } = cep
    return {
      id,
      nome,
      email,
      cpf: dados.cpf,
      telefone: dados.telefone,
      logradouro: cep.logradouro,
      bairro: bairro.nome,
      numero: endereco.numero,
      complemento: endereco.complemento,
      cidade: cidade.nome,
      uf: uf.nome,
      cep: cep.cep,
    }
  }
  async exists({ cpf, id }: { cpf?: string; id?: number }) {
    const filter = cpf ? { cpf } : { id }
    const dados = await DadosCliente.findBy(filter)
    return Boolean(dados)
  }
  async create(props: ClienteWithDetails): Promise<PropsCliente> {
    return await db.transaction(async (trx) => {
      // Primeiro, cria ou busca as entidades independentes.
      const bairro = (await this._findOrCreate({ nome: props.bairro }, 'Bairro', trx)) as Bairro
      const cidade = (await this._findOrCreate({ nome: props.cidade }, 'Cidade', trx)) as Cidade
      const uf = (await this._findOrCreate({ nome: props.uf }, 'Uf', trx)) as Uf
      // Cria ou busca o CEP.
      const cep = await Cep.firstOrCreate(
        {
          cep: props.cep,
        },
        {
          bairroId: bairro.id,
          cidadeId: cidade.id,
          ufId: uf.id,
          logradouro: props.logradouro,
        },
        { client: trx }
      )
      // Cria ou busca o Endereço.
      // Clientes podem ter o mesmo endereço.
      const endereco = await Endereco.firstOrCreate(
        {
          cepId: cep.id,
          numero: props.numero,
          complemento: props.complemento || '',
        },
        {},
        { client: trx }
      )

      // Cria Cliente
      const cliente = await Cliente.create(
        {
          email: props.email,
          nome: props.nome,
        },
        { client: trx }
      )
      // Cria DadosCliente
      await DadosCliente.create(
        {
          clienteId: cliente.id,
          cpf: props.cpf,
          enderecoId: endereco.id,
          telefone: props.telefone,
        },
        { client: trx }
      )
      return {
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
      }
    })
  }

  async getClientes(): Promise<PropsCliente[]> {
    const clientes = await Cliente.all()
    return clientes.sort((a, b) => a.id - b.id)
  }

  async getClienteById(id: number): Promise<ClienteWithDetails | null> {
    const cliente = await Cliente.query()
      .where('id', id)
      .preload('dados', (dadosQuery) => {
        dadosQuery.preload('endereco', (enderecoQuery) => {
          enderecoQuery.preload('cep', (cepQuery) => {
            cepQuery.preload('bairro').preload('cidade').preload('uf')
          })
        })
      })
    return cliente.length === 0 ? null : this._serializeCliente(cliente[0])
  }

  async updateCliente(id: number, { cep, cliente, dados, endereco }: UpdateCliente) {
    await db.transaction(async (trx) => {
      const dbCliente = await Cliente.findOrFail(id)
      await dbCliente.load('dados', (dadosQuery) => {
        dadosQuery.preload('endereco', (enderecoQuery) => {
          enderecoQuery.preload('cep')
        })
      })
      dbCliente.useTransaction(trx)
      if (cliente) {
        await dbCliente.merge({ ...cliente }).save()
      }
      if (dados) {
        await dbCliente.dados.merge({ ...dados }).save()
      }
      if (endereco) {
        await dbCliente.dados.load('endereco')
        await dbCliente.dados.endereco.merge({ ...endereco }).save()
      }
      if (cep) {
        const bairro = (await this._findOrCreate({ nome: cep.bairro }, 'Bairro', trx)) as Bairro
        const cidade = (await this._findOrCreate({ nome: cep.cidade }, 'Cidade', trx)) as Cidade
        const uf = (await this._findOrCreate({ nome: cep.uf }, 'Uf', trx)) as Uf
        const newCep = await Cep.firstOrCreate(
          {
            cep: cep.cep,
          },
          {
            bairroId: bairro.id,
            cidadeId: cidade.id,
            ufId: uf.id,
            logradouro: cep.logradouro,
          },
          { client: trx }
        )
        await Endereco.query({ client: trx }).where('id', dbCliente.dados.endereco.id).update({
          cepId: newCep.id,
        })
      }
    })
    return this.getClienteById(id)
  }

  async deleteCliente(id: number) {
    const cliente = await Cliente.findOrFail(id)
    await cliente.delete()
  }
}
