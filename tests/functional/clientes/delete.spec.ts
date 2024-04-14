import Usuario from '#models/usuario'
import { CLIENTE } from '#tests/mocks/cliente'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Clientes delete', (group) => {
  let id: number
  const ENDPOINT = '/clientes'
  let user: Usuario
  group.setup(async () => {
    user = await Usuario.create(USUARIO)
  })
  group.teardown(() => testUtils.db().truncate())
  test('Exclui cliente do banco de dados', async ({ client }) => {
    const resp = await client.post(ENDPOINT).json(CLIENTE).loginAs(user)
    id = resp.body().data.id
    const response = await client.delete(`${ENDPOINT}/${id}`).loginAs(user)
    response.assertStatus(204)
  })
  test('Retorna status "404" caso cliente não seja encontrado', async ({ client }) => {
    const response = await client.delete(`${ENDPOINT}/${id}`).loginAs(user)
    response.assertStatus(404)
  })
  test('Retorna status "401" caso usuário não esteja autenticado', async ({ client }) => {
    const response = await client.delete(`${ENDPOINT}/${id}`)
    response.assertStatus(401)
  })
})
