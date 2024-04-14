import Usuario from '#models/usuario'
import { CLIENTE } from '#tests/mocks/cliente'
import { LIVRO } from '#tests/mocks/livro'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Vendas store', (group) => {
  const ENDPOINT = '/vendas'
  let clienteId: number
  let livroId: number
  let user: Usuario
  group.setup(async () => {
    user = await Usuario.create(USUARIO)
  })
  group.teardown(async () => {
    const truncate = await testUtils.db().truncate()
    await truncate()
  })
  test('Cria uma venda associada a um cliente e um livro', async ({ client }) => {
    const livro = await client.post('/livros').json(LIVRO).loginAs(user)
    const cliente = await client.post('/clientes').json(CLIENTE).loginAs(user)

    clienteId = cliente.body().data.id
    livroId = livro.body().data.id

    const response = await client
      .post('/vendas')
      .json({
        clienteId,
        livroId,
        quantidade: 1,
      })
      .loginAs(user)
    response.assertAgainstApiSpec()
  })

  test('Retorna status "422" na presença de dados inválidos', async ({ client }) => {
    const response = await client
      .post('/vendas')
      .json({
        clienteId,
        livroId,
        quantidade: 'aa',
      })
      .loginAs(user)
    response.assertStatus(422)
  })

  test('Retorna status "404" quando o cliente não foi encontrado', async ({ client }) => {
    const response = await client
      .post('/vendas')
      .json({
        clienteId: 99,
        livroId,
        quantidade: 1,
      })
      .loginAs(user)
    response.assertStatus(404)
  })
  test('Retorna status "404" quando o livro não foi encontrado', async ({ client }) => {
    const response = await client
      .post('/vendas')
      .json({
        clienteId,
        livroId: 99,
        quantidade: 1,
      })
      .loginAs(user)
    response.assertStatus(404)
  })

  test('Retorna status "401" caso o usuário não esteja autenticado', async ({ client }) => {
    const response = await client.post('/vendas').json({
      clienteId,
      livroId,
      quantidade: 1,
    })
    response.assertStatus(401)
  })
})
