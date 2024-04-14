import Usuario from '#models/usuario'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Usuarios login', (group) => {
  const ENDPOINT = '/usuarios/login'
  group.setup(async () => {
    await Usuario.create(USUARIO)
  })
  group.teardown(async () => {
    const truncate = await testUtils.db().truncate()
    await truncate()
  })
  test('Retorna token de usuário logado', async ({ client }) => {
    const response = await client.post(ENDPOINT).json(USUARIO)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: {
        type: 'Bearer',
      },
    })
  })
  test('Retorna status "400" ao logar com email inválido', async ({ client }) => {
    const response = await client.post(ENDPOINT).json({ ...USUARIO, email: 'email@' })
    response.assertStatus(400)
  })
  test('Retorna status "400" ao logar com senha inválida', async ({ client }) => {
    const response = await client.post(ENDPOINT).json({ ...USUARIO, senha: 'senha' })
    response.assertStatus(400)
  })
})
