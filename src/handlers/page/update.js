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
    // iniiate the logger
    await logger.initiateLogger()
    try {
        // logs the inital request
        await logger.logRequest('updatePage', event)
        context.callbackWaitsForEmptyEventLoop = false
        const request = {}
        // obtain query params
        request.query = event.queryStringParameters
            ? event.queryStringParameters
            : {}

        request.params = event.pathParameters
        const id =
            request.params && request.params.id

        let body = JSON.parse(event.body)
        if (body == undefined) {
            body = {}
        }
        delete body.urlEndpoint
        // update the page which matches with the page id accordingly
        const updatedPage = await Page.update(body, {
            where: {
                pageID: id
            }
        });
        // logs the response if all went good
        await logger.logResponse('updatePage', event)
        // return the response
        return response(200, {
            message: translate('messages', 'success'),
            updatedPage,
        })

    } catch (error) {
        // execute in case of internal server error
        await logger.logFailure('updatePage', event, error)
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
