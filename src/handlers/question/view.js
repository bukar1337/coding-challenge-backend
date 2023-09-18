// importing database
import '../../database'
import { Question } from '../../models/index'

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
        // logs the initial request
        await logger.logRequest('viewQuestion', event)

        context.callbackWaitsForEmptyEventLoop = false
        const request = {}
        // obtain query params
        request.query = event.queryStringParameters
            ? event.queryStringParameters
            : {}
        request.params = event.pathParameters
        const id =
            request.params && request.params.id


        // find a single question with a specific questionID
        const question = await Question.findOne({ where: { questionID: id } });
        if (!question) {
            // executes if the queston doesnt available
            await logger.logNotFound(`viewQuestion`, event)
            return response(404, {
                message: translate('errors', 'notfound')
            })

        }
        // logs the response if all went well
        await logger.logResponse('viewQuestion', event)
        // return the respnsw
        return response(200, {
            message: translate('messages', 'success'),
            question,
        })

    } catch (error) {
        // execute in case of internal server error
        await logger.logFailure(`viewQuestion`, event, error)
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
