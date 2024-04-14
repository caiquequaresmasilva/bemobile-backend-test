import Usuario from '#models/usuario'
import { LIVRO } from '#tests/mocks/livro'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Livros show', (group) => {
  const ENDPOINT = '/livros'
  let id: number
  let user: Usuario
  group.setup(async () => {
    user = await Usuario.create(USUARIO)
  })
  group.teardown(async () => {
    const truncate = await testUtils.db().truncate()
    await truncate()
  })
  test('Retorna dados detalhados de um livro', async ({ client }) => {
    const resp = await client.post(ENDPOINT).json(LIVRO).loginAs(user)
    id = resp.body().data.id
    const response = await client.get(`${ENDPOINT}/${id}`).loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: LIVRO,
    })
  })

  test('Retorna status "404" quando o livro não é encontrado', async ({ client }) => {
    const response = await client.get(`${ENDPOINT}/99`).loginAs(user)
    response.assertStatus(404)
  })

  test('Retorna status "401" caso o usuário não esteja autenticado', async ({ client }) => {
    const response = await client.get(`${ENDPOINT}/${id}`)
    response.assertStatus(401)
  })
})
