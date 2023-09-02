import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public email: string

    @column({
        // hide it from the response
        serializeAs: null,
    })
    public password: string

    @column()
    public role?: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }

    public async removeAllTokens() {
        await Database.from('api_tokens').where('user_id', this.id).delete()
    }
}
