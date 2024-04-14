import Usuario from '#models/usuario'
import { LIVRO } from '#tests/mocks/livro'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Livros delete', (group) => {
  const ENDPOINT = '/livros'
  let user: Usuario
  group.setup(async () => {
    user = await Usuario.create(USUARIO)
  })
  group.teardown(async () => {
    const truncate = await testUtils.db().truncate()
    await truncate()
  })
  test('Realiza a exclusão lógica de um livro', async ({ client }) => {
    const resp = await client.post(ENDPOINT).json(LIVRO).loginAs(user)
    const id = resp.body().data.id
    console.log('id', id)
    const response = await client.delete(`${ENDPOINT}/${id}`).loginAs(user)
    response.assertStatus(204)
  })

  test('Retorna status "404" caso livro não seja encontrado', async ({ client }) => {
    const response = await client.delete(`${ENDPOINT}/99`).loginAs(user)
    response.assertStatus(404)
  })

  test('Retorna status "401" caso usuário não esteja autenticado', async ({ client }) => {
    const response = await client.delete(`${ENDPOINT}/99`)
    response.assertStatus(401)
  })
})
