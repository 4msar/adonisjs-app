/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('home.index')

Route.post('/login', 'AuthController.login').as('auth.login')
Route.post('/logout', 'AuthController.logout').as('auth.logout')

Route.group(() => {
    Route.resource('users', 'UsersController').apiOnly()

    Route.get('/me', 'AuthController.profile').as('profile')
    Route.get('/me/tokens', 'AuthController.tokens').as('profile.tokens')
}).middleware(['auth:api'])

Route.get('/health', 'HomeController.healthCheck').as('home.healthCheck')
Route.get('/test', async () => {
    return { hello: 'world' }
})
