import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/User/CreateValidator'
import UpdateUserValidator from 'App/Validators/User/UpdateValidator'

export default class UsersController {
    public async index({ request, response }: HttpContextContract) {
        const currentPage = request.input('page', 1)
        const perPage = request.input('per_page', 5)

        const users = await User.query().paginate(currentPage, perPage)

        response.send(users)
    }

    public async store({ request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(CreateUserValidator)

            const user = await User.create(payload)

            if (!user.$isPersisted) {
                throw new Error('Failed to create user!')
            }

            response.created(user)
        } catch (error) {
            response.badRequest(error.messages)
        }
    }

    public async show({ params: { id }, response }: HttpContextContract) {
        const user = await User.findOrFail(id)

        response.send(user)
    }

    public async update({ params: { id }, request, response }: HttpContextContract) {
        try {
            const user = await User.findOrFail(id)

            const payload = await request.validate(UpdateUserValidator)

            user.merge(payload)

            await user.save()

            response.send(user)
        } catch (error) {
            response.badRequest(error.messages)
        }
    }

    public async destroy({ params: { id }, response }: HttpContextContract) {
        const user = await User.findOrFail(id)

        await user.delete()

        response.noContent()
    }
}
