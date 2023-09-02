import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class AuthController {
    public async login({ request, auth, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            // Lookup the user
            const user = await User.query().where('email', email).firstOrFail()

            // Verify password
            if (!(await Hash.verify(user.password, password))) {
                return response.unauthorized('Invalid credentials')
            }

            // user.token

            // Generate token
            const token = await auth.use('api').generate(user, {
                expiresIn: '30 days',
            })

            return response.json(token.toJSON())
        } catch (error) {
            return response.unauthorized('Invalid credentials')
        }
    }

    public async profile({ auth, response }: HttpContextContract) {
        try {
            const user = auth.user

            if (!user) {
                return response.badRequest({ error: 'User not found' })
            }

            return response.json(user)
        } catch (error) {
            return response.badRequest({ error })
        }
    }

    public async tokens({ auth, response }: HttpContextContract) {
        try {
            if (auth.user?.id) {
                const tokens = await Database.from('api_tokens').where('user_id', auth.user?.id)

                return response.json(tokens)
            }

            return response.badRequest({ error: 'User not found' })
        } catch (error) {
            return response.badRequest({ error })
        }
    }

    public async logout({ auth, request }: HttpContextContract) {
        if (request.input('revoke_all')) {
            auth.user?.removeAllTokens()
        }

        auth.use('api').logout()
        auth.use('api').revoke()

        return {
            logout: true,
        }
    }
}
