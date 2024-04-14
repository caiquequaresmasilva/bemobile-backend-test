import Usuario from '#models/usuario'
import { CLIENTE } from '#tests/mocks/cliente'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Clientes show', (group) => {
  let id: number
  const ENDPOINT = '/clientes'
  let user: Usuario
  group.setup(async () => {
    user = await Usuario.create(USUARIO)
  })
  group.teardown(async () => {
    const truncate = await testUtils.db().truncate()
    await truncate()
  })
  test('Retorna detalhes de um cliente', async ({ client }) => {
    const resp = await client.post(ENDPOINT).json(CLIENTE).loginAs(user)
    id = resp.body().data.id
    const response = await client.get(`${ENDPOINT}/${id}`).loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: CLIENTE,
    })
  })
  test('Retorna status "404" caso o cliente não seja encontrado', async ({ client }) => {
    const response = await client.get(`${ENDPOINT}/${2}`).loginAs(user)
    response.assertStatus(404)
  })
  test('Retorna status "401" caso usuário não esteja autenticado', async ({ client }) => {
    const response = await client.get(`${ENDPOINT}/${2}`)
    response.assertStatus(401)
  })
})
