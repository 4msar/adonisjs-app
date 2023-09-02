import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string(),
        email: schema.string([
            rules.email(),
            rules.unique({
                table: 'users',
                column: 'email',
            }),
        ]),
        password: schema.string([rules.confirmed(), rules.minLength(6)]),
    })

    public messages: CustomMessages = {
        'required': 'The {{ field }} is required',
        'email.unique': 'User email already exists',
        'password.minLength': 'User password must be at least 6 characters',
        'password_confirmation.confirmed': 'Confirm password does not match',
    }
}
