// importing database
import '../../database'
import { Answer, Condition } from '../../models/index'


// importing helpers
import translate from '../../helpers/translate'
import response from '../../helpers/response'
import { v4 as uuid } from 'uuid'
import Logger from '../../helpers/logger'
const logger = new Logger()
/**
 *
 * @param {*} event
 * @param {*} context
 */

exports.handler = async function (event, context) {
    // initializing logger
    await logger.initiateLogger()
    try {
        // logging the request
        await logger.logRequest('createCondition', event);
        context.callbackWaitsForEmptyEventLoop = false
        let body = JSON.parse(event.body)
        if (body == undefined) {
            body = {}
        }
        const isConditionExist = await Condition.findOne({ where: { answerID: body.answerID } })
        if (isConditionExist) {
            return response(409, {
                message: translate('validations', 'condtion.exist'),
            })
        }
        // generating a new uuid
        const conditionID = await uuid()
        // creating a new page
        await Condition.create({
            ConditionID: conditionID,
            questionID: body.questionID,
            urlEndPoint: body.urlEndPoint,
            answerID: body.answerID
        })
        // update that answer as well
        await Answer.update({ conditional: true }, { where: { answerID: body.answerID, questionID: body.questionID } })
        // logs the response if all went good
        await logger.logResponse('createCondition', event);
        return response(200, {
            message: translate('messages', 'success'),
            conditionID
        })

    } catch (error) {
        // execute in case of internal server error
        await logger.logFailure('createCondition', event, error);
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
