import Usuario from '#models/usuario'
import { CLIENTE, UPDATE_CLIENTE } from '#tests/mocks/cliente'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Clientes update', (group) => {
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
  test('Atualiza dados de cliente na categoria "cliente"', async ({ client }) => {
    const resp = await client.post(ENDPOINT).json(CLIENTE).loginAs(user)
    id = resp.body().data.id
    const response = await client
      .patch(`${ENDPOINT}/${id}`)
      .json({ cliente: UPDATE_CLIENTE.cliente })
      .loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: {
        ...UPDATE_CLIENTE.cliente,
      },
    })
  })

  test('Atualiza dados de cliente na categoria "dados"', async ({ client }) => {
    const response = await client
      .patch(`${ENDPOINT}/${id}`)
      .json({ dados: UPDATE_CLIENTE.dados })
      .loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: {
        ...UPDATE_CLIENTE.dados,
      },
    })
  })
  test('Atualiza dados de cliente na categoria "endereco"', async ({ client }) => {
    const response = await client
      .patch(`${ENDPOINT}/${id}`)
      .json({ endereco: UPDATE_CLIENTE.endereco })
      .loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: {
        ...UPDATE_CLIENTE.endereco,
      },
    })
  })
  test('Atualiza dados de cliente na categoria "cep"', async ({ client }) => {
    const response = await client
      .patch(`${ENDPOINT}/${id}`)
      .json({ cep: UPDATE_CLIENTE.cep })
      .loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: {
        ...UPDATE_CLIENTE.cep,
      },
    })
  })

  test('Retorna status "422" quando os dados de atualização são inválidos', async ({ client }) => {
    const response = await client
      .patch(`${ENDPOINT}/${id}`)
      .json({ cep: { ...UPDATE_CLIENTE.cep, cep: '00000000' } })
      .loginAs(user)
    response.assertStatus(422)
  })
  test('Retorna status "401" quando o usuário não está autenticado', async ({ client }) => {
    const response = await client.patch(`${ENDPOINT}/${id}`).json({ cep: UPDATE_CLIENTE.cep })
    response.assertStatus(401)
  })
  test('Retorna status "404" quando o cliente não foi encontrado', async ({ client }) => {
    const response = await client
      .patch(`${ENDPOINT}/2`)
      .json({ cep: UPDATE_CLIENTE.cep })
      .loginAs(user)
    response.assertStatus(404)
  })
})
