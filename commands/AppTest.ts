import { BaseCommand } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AppTest extends BaseCommand {
    /**
     * Command name is used to run the command
     */
    public static commandName = 'app:test'

    /**
     * Command description is displayed in the "help" output
     */
    public static description = 'Test custom methods'

    public static settings = {
        /**
         * Set the following value to true, if you want to load the application
         * before running the command. Don't forget to call `node ace generate:manifest`
         * afterwards.
         */
        loadApp: true,

        /**
         * Set the following value to true, if you want this command to keep running until
         * you manually decide to exit the process. Don't forget to call
         * `node ace generate:manifest` afterwards.
         */
        stayAlive: false,
    }

    public async run() {
        const user = await Database.from('users').first()

        const tokens = await Database.from('api_tokens').where('user_id', user.id)

        this.logger.log({ tokens })
    }
}
