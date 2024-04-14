import Usuario from '#models/usuario'
import { CLIENTE } from '#tests/mocks/cliente'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Clientes index', (group) => {
  const ENDPOINT = '/clientes'
  let user: Usuario
  group.setup(async () => {
    user = await Usuario.create(USUARIO)
  })
  group.teardown(async () => {
    const truncate = await testUtils.db().truncate()
    await truncate()
  })
  test('Retorna lista de clientes registrados', async ({ client }) => {
    await client.post(ENDPOINT).json(CLIENTE).loginAs(user)
    const response = await client.get(ENDPOINT).loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: [
        {
          nome: CLIENTE.nome,
          email: CLIENTE.email,
        },
      ],
    })
  })
  test('Retorna status "401" caso usuário não esteja autenticado', async ({ client }) => {
    const response = await client.get(ENDPOINT)
    response.assertStatus(401)
  })
})
