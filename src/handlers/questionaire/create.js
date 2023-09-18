// importing database
import '../../database'
import { Questionaire } from '../../models/index'

// importing packages
import { v4 as uuid } from 'uuid'

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
        await logger.logRequest('createQuestionaire', event);
        context.callbackWaitsForEmptyEventLoop = false
        let body = JSON.parse(event.body)
        if (body == undefined) {
            body = {}
        }
        // generate a new questionID
        const questionaireID = await uuid()
        // create a new Questionnaire
        await Questionaire.create({
            questionaireID: questionaireID,
            selectorID: body.selectorID,
            status: 'in-progress'
        })
        // logs the response if all went well
        await logger.logResponse('createQuestionaire', event);
        // return the response
        return response(200, {
            questionaireID,
            message: translate('messages', 'success'),
        })

    } catch (error) {
        // execute in case of internal server error
        await logger.logFailure('createQuestionaire', event, error);
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
