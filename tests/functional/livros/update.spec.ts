import Usuario from '#models/usuario'
import { LIVRO, UPDATE_LIVRO } from '#tests/mocks/livro'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Livros update', (group) => {
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
  test('Atualiza livro com novas informações', async ({ client }) => {
    const resp = await client.post(ENDPOINT).json(LIVRO).loginAs(user)
    id = resp.body().data.id
    const response = await client.patch(`${ENDPOINT}/${id}`).json(UPDATE_LIVRO).loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: UPDATE_LIVRO,
    })
  })

  test('Retorna status "422" caso os dados sejam inválidos', async ({ client }) => {
    const response = await client.patch(`${ENDPOINT}/${id}`).json({ preco: 'a' }).loginAs(user)
    response.assertStatus(422)
  })
  test('Retorna status "404" caso o livro não seja encontrado', async ({ client }) => {
    const response = await client.patch(`${ENDPOINT}/99`).json(UPDATE_LIVRO).loginAs(user)
    response.assertStatus(404)
  })
  test('Retorna status "401" caso o usuário não esteja autenticado', async ({ client }) => {
    const response = await client.patch(`${ENDPOINT}/${id}`).json(UPDATE_LIVRO)
    response.assertStatus(401)
  })
})
