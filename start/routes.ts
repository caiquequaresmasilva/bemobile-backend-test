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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('usuarios', [UsersController, 'signup'])
router.post('usuarios/login', [UsersController, 'login'])

router.post('clientes', [ClientesController, 'store']).use(middleware.auth())
router.patch('clientes/:id', [ClientesController, 'update']).use(middleware.auth())
router.get('clientes', [ClientesController, 'index']).use(middleware.auth())
router.get('clientes/:id', [ClientesController, 'show']).use(middleware.auth())
router.delete('clientes/:id', [ClientesController, 'delete']).use(middleware.auth())
