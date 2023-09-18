// importing database
import '../../database'
import { Condition } from '../../models/index'

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
        await logger.logRequest('viewCondition', event)
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
        const condition = await Condition.findOne({
            where: { ConditionID: id }, attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });
        if (!condition) {
            // executes if the page doesnt exist
            await logger.logNotFound('viewCondition', event)
            return response(404, {
                message: translate('error', 'notfound')
            })

        }
        // logs if all went good
        await logger.logResponse('viewCondition', event)
        // return the response
        return response(200, {
            message: translate('messages', 'success'),
            data: condition,
        })

    } catch (error) {
        // execute in case of internal server error
        await logger.logFailure('viewCondition', event, error)
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
