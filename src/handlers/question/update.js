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
    // initialize logger
    await logger.initiateLogger()
    try {
        // logs inital request
        await logger.logRequest(`updateQuestion`, event)
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


        // Update the question of a specific questionID
        const updatedQuestion = await Question.update(body, {
            where: {
                questionID: id
            }
        });

        if (updatedQuestion.length && updatedQuestion[0] > 0) {
            // logs the final response if all went good
            await logger.logResponse(`updateQuestion`, event)

            return response(200, {
                message: translate('messages', 'success'),
                updatedQuestion,
            })
        } else {
            // logs question not found
            await logger.logNotFound(`updateQuestion`, event)

            return response(404, {
                message: translate('errors', 'notfound'),
                updatedQuestion,
            })
        }

    } catch (error) {

        // execute in case of internal server error
        await logger.logFailure(`updateQuestion`, event, error)
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
