import Usuario from '#models/usuario'
import { CLIENTE } from '#tests/mocks/cliente'
import { LIVRO } from '#tests/mocks/livro'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Clientes filter', (group) => {
  let id: number
  const mes = new Date().getMonth() + 1
  const ano = new Date().getFullYear()
  const ENDPOINT = '/clientes'
  let user: Usuario
  group.setup(async () => {
    user = await Usuario.create(USUARIO)
  })
  group.teardown(async () => {
    const truncate = await testUtils.db().truncate()
    await truncate()
  })
  test('Retorna todas as vendas de um cliente especifico quando não há filtros de ano e mês', async ({
    client,
  }) => {
    const livro = await client.post('/livros').json(LIVRO).loginAs(user)
    const resp = await client.post(ENDPOINT).json(CLIENTE).loginAs(user)
    id = resp.body().data.id
    await client
      .post('/vendas')
      .json({
        clienteId: id,
        livroId: livro.body().data.id,
        quantidade: 1,
      })
      .loginAs(user)
    const response = await client.get(`${ENDPOINT}/${id}/vendas`).loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: [
        {
          livro: {
            titulo: 'As Crônicas de Gelo e Fogo',
            subtitulo: 'A Guerra dos Tronos',
          },
        },
      ],
    })
  })
  test('Retorna todas as vendas de um cliente com o filtro mes', async ({ client }) => {
    const response = await client.get(`${ENDPOINT}/${id}/vendas?mes=${mes}`).loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: [
        {
          livro: {
            titulo: 'As Crônicas de Gelo e Fogo',
            subtitulo: 'A Guerra dos Tronos',
          },
        },
      ],
    })
  })

  test('Retorna todas as vendas de um cliente com o filtro ano', async ({ client }) => {
    const response = await client.get(`${ENDPOINT}/${id}/vendas?ano=${ano}`).loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: [
        {
          livro: {
            titulo: 'As Crônicas de Gelo e Fogo',
            subtitulo: 'A Guerra dos Tronos',
          },
        },
      ],
    })
  })
  test('Retorna todas as vendas de um cliente com o todos os filtros', async ({ client }) => {
    const response = await client
      .get(`${ENDPOINT}/${id}/vendas?ano=${ano}&mes=${mes}`)
      .loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: [
        {
          livro: {
            titulo: 'As Crônicas de Gelo e Fogo',
            subtitulo: 'A Guerra dos Tronos',
          },
        },
      ],
    })
  })

  test('Retorna uma lista vazia se não houver vendas com os filtros determinados', async ({
    client,
  }) => {
    const response = await client.get(`${ENDPOINT}/${id}/vendas?ano=2020&mes=12`).loginAs(user)
    response.assertBody({
      data: [],
    })
  })

  test('Retorna status "404" caso cliente não seja encontrado', async ({ client }) => {
    const response = await client.get(`${ENDPOINT}/42/vendas`).loginAs(user)
    response.assertStatus(404)
  })
  test('Retorna status "401" caso usuário não esteja autenticado', async ({ client }) => {
    const response = await client.get(`${ENDPOINT}/${id}/vendas`)
    response.assertStatus(401)
  })
})
