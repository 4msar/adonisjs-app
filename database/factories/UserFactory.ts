import UserFactory from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(UserFactory, ({ faker }) => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'user',
    }
}).build()
