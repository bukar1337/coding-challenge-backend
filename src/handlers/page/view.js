// importing database
import '../../database'
import { Page } from '../../models/index'

// importing helpers
import translate from '../../helpers/translate'
import response from '../../helpers/response'
import Logger from '../../helpers/logger'
const logger = new Logger()


/**
 *
 * @param {*} event
 * @param {*} context
 */

exports.handler = async function (event, context) {
    // initialize the logger
    await logger.initiateLogger()
    try {
        // logs the inital request
        await logger.logRequest('viewPage', event)
        context.callbackWaitsForEmptyEventLoop = false

        const request = {}
        // obtain query params
        request.query = event.queryStringParameters
            ? event.queryStringParameters
            : {}
        request.params = event.pathParameters
        const id =
            request.params && request.params.id
        // Find only one page that matches with the particular pageID
        const page = await Page.findOne({
            where: { pageID: id }, attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });
        if (!page) {
            // executes if the page doesnt exist
            await logger.logNotFound('viewPage', event)
            return response(404, {
                message: translate('error', 'not_found')
            })

        }
        // logs if all went good
        await logger.logResponse('viewPage', event)
        // return the response
        return response(200, {
            message: translate('messages', 'success'),
            data: page,
        })

    } catch (error) {
        // execute in case of internal server error
        await logger.logFailure('viewPage', event, error)
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
