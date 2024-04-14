import Usuario from '#models/usuario'
import { CLIENTE } from '#tests/mocks/cliente'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Clientes store', (group) => {
  const ENDPOINT = '/clientes'
  let user: Usuario
  group.setup(async () => {
    user = await Usuario.create(USUARIO)
  })
  group.teardown(() => testUtils.db().truncate())
  test('Registra um novo cliente e retorna seus dados resumidos', async ({ client }) => {
    const response = await client.post(ENDPOINT).json(CLIENTE).loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: {
        nome: 'Caíque Quaresma Silva',
        email: 'caique.quaresma@gmail.com',
      },
    })
  })
  test('Retorna status "422" se os dados de registro forem inválidos', async ({ client }) => {
    const response = await client
      .post(ENDPOINT)
      .json({ ...CLIENTE, cpf: '' })
      .loginAs(user)
    response.assertStatus(422)
  })
  test('Retorna status "400" se o CPF já estiver registrado no sistema', async ({ client }) => {
    const response = await client
      .post(ENDPOINT)
      .json({ ...CLIENTE })
      .loginAs(user)
    response.assertStatus(400)
  })
  test('Retorna status "401" se o token de autenticação não estiver presente', async ({
    client,
  }) => {
    const response = await client.post(ENDPOINT).json({ ...CLIENTE })
    response.assertStatus(401)
  })
})
