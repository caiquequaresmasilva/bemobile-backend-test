import Usuario from '#models/usuario'
import { LIVRO } from '#tests/mocks/livro'
import { USUARIO } from '#tests/mocks/usuario'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Livros index', (group) => {
  const ENDPOINT = '/livros'
  let user: Usuario
  group.setup(async () => {
    user = await Usuario.create(USUARIO)
  })
  group.teardown(async () => {
    const truncate = await testUtils.db().truncate()
    await truncate()
  })
  test('Retorna lista de livros cadastrados', async ({ client }) => {
    await client.post(ENDPOINT).json(LIVRO).loginAs(user)
    const response = await client.get(ENDPOINT).loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      data: [
        {
          titulo: LIVRO.titulo,
          subtitulo: LIVRO.subtitulo,
          autor: LIVRO.autor,
          preco: LIVRO.preco,
        },
      ],
    })
  })

  test('Retorna status "401" caso usuário não esteja autenticado', async ({ client }) => {
    const response = await client.get(ENDPOINT)
    response.assertStatus(401)
  })
})
