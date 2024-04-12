/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const ClientesController = () => import('#controllers/clientes_controller')
const LivrosController = () => import('#controllers/livros_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Rota de usuarios
router
  .group(() => {
    router.post('', [UsersController, 'signup'])
    router.post('login', [UsersController, 'login'])
  })
  .prefix('usuarios')

// Rota de clientes
router
  .group(() => {
    router.post('', [ClientesController, 'store'])
    router.patch(':id', [ClientesController, 'update'])
    router.get('', [ClientesController, 'index'])
    router.get(':id', [ClientesController, 'show'])
    router.delete(':id', [ClientesController, 'delete'])
  })
  .prefix('clientes')
  .use(middleware.auth())

// Rota de livros
router
  .group(() => {
    router.post('', [LivrosController, 'store'])
    router.patch(':id', [LivrosController, 'update'])
    router.get('', [LivrosController, 'index'])
    router.get(':id', [LivrosController, 'show'])
    router.delete(':id', [LivrosController, 'delete'])
  })
  .prefix('livros')
  .use(middleware.auth())
