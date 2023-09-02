import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

export default class HomeController {
    public async index() {
        return { name: 'AdonisJS App', version: '1.0.0' }
    }

    public async healthCheck({ response }: HttpContextContract) {
        const report = await HealthCheck.getReport()

        return report.healthy ? response.ok(report) : response.badRequest(report)
    }
}
