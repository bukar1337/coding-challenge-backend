// importing database
import '../../database'
import { Page, Question, Answer } from '../../models/index'

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
        await logger.logRequest('viewQuestionsInPage', event)
        context.callbackWaitsForEmptyEventLoop = false

        const request = {}
        // obtain query params
        request.query = event.queryStringParameters
            ? event.queryStringParameters
            : {}
        request.params = event.pathParameters
        const id =
            request.params && request.params.id


        // find a page that comes in the url
        const pageWithQuestions = await Page.findOne({
            where: { urlEndpoint: id },
            // include questions of that page too
            include:
            {
                model: Question,

            },

        });
        if (!pageWithQuestions) {
            // execute incase if no page found
            await logger.logNotFound('viewQuestionsInPage', event)
            return response(404, {
                message: translate('errors', 'notfound'),
                data: pageWithQuestions,
            })

        }
        // find all the answers that is present on the page 
        const answers = await Answer.findAll({ where: { questionID: pageWithQuestions.questionID } })
        // logs the response if all went good
        await logger.logResponse('viewQuestionsInPage', event)
        // return the response
        return response(200, {
            message: translate('messages', 'success'),
            data: { pageWithQuestions, answers },
        })

    } catch (error) {
        // execute in case of internal server error
        await logger.logFailure('viewQuestionsInPage', event, error)
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
