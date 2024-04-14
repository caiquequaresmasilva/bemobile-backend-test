import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Usuarios signup', (group) => {
  const ENDPOINT = '/usuarios'
  group.teardown(async () => {
    const truncate = await testUtils.db().truncate()
    await truncate()
  })
  test('Registra um novo usuário e retorna seus dados', async ({ client }) => {
    const response = await client.post(ENDPOINT).json(USUARIO)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: {
        email: USUARIO.email,
      },
    })
  })
  test('Retorna status "422" caso o email informado esteja no formato incorreto', async ({
    client,
  }) => {
    const response = await client.post(ENDPOINT).json({ ...USUARIO, email: '@.com' })
    response.assertStatus(422)
  })
  test('Retorna status "422" caso a senha informada esteja no formato incorreto', async ({
    client,
  }) => {
    const response = await client.post(ENDPOINT).json({ ...USUARIO, senha: 'senha' })
    response.assertStatus(422)
  })

  test('Retorna status "400" caso o email já esteja registrado no sistema', async ({ client }) => {
    const response = await client.post(ENDPOINT).json(USUARIO)
    response.assertStatus(400)
  })
})
