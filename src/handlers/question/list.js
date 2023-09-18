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
    // initalize the logger
    await logger.initiateLogger()

    try {
        // logs the initial request
        await logger.logRequest('listQuestionaire', event)
        context.callbackWaitsForEmptyEventLoop = false

        const request = {}
        // obtain query params
        request.query = event.queryStringParameters
            ? event.queryStringParameters
            : {}
        let offset = 0
        let pageSize = request.query.pageSize || 10
        let page = request.query.page
        if (page && page > 1) {
            offset = (page - 1) * pageSize
        }




        // find all the questions within the specific limit and offset (skip)
        const question = await Question.findAll({
            limit: pageSize,
            offset,
        });

        if (!question.length) {
            // execute in case if no question found
            await logger.logNotFound('listQuestionaire', event)
            // reurn the response
            return response(404, {
                message: translate('errors', 'notfound')
            })

        }

        // pagination works
        const count = await Question.count()


        const pagination = {
            total: count,
            current: parseInt(page) || 1,
            first: 1,
            last: count ? Math.ceil(count / pageSize) : 1,
            next: page < Math.ceil(count / pageSize) ? parseInt(page) + 1 : 0,
        }


        // logs the response if all went well 
        await logger.logResponse('listQuestionaire', event)
        // return the response
        return response(200, {
            message: translate('messages', 'success'),
            question,
            pagination
        })

    } catch (error) {
        // execute in case of internal server error
        await logger.logFailure('listQuestionaire', event, error)
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
