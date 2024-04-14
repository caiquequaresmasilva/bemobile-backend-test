import Usuario from '#models/usuario'
import { LIVRO } from '#tests/mocks/livro'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Livros store', (group) => {
  const ENDPOINT = '/livros'
  let user: Usuario
  group.setup(async () => {
    user = await Usuario.create(USUARIO)
  })
  group.teardown(async () => {
    const truncate = await testUtils.db().truncate()
    await truncate()
  })
  test('Registra um novo livro e retorna seu dados resumidos', async ({ client }) => {
    const response = await client.post(ENDPOINT).json(LIVRO).loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBody({
      data: {
        id: 1,
        titulo: 'As Crônicas de Gelo e Fogo',
        subtitulo: 'A Guerra dos Tronos',
        autor: 'George R. R. Martin',
        preco: 76.16,
      },
    })
  })

  test('Retorna status "422" caso os dados de registro sejam inválidos', async ({ client }) => {
    const response = await client
      .post(ENDPOINT)
      .json({ ...LIVRO, dimensoes: '' })
      .loginAs(user)
    response.assertStatus(422)
  })

  test('Retorna status "401" caso o usuário não esteja autenticado', async ({ client }) => {
    const response = await client.post(ENDPOINT).json(LIVRO)
    response.assertStatus(401)
  })
})
