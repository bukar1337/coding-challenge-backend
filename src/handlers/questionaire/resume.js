// importing database
import '../../database'
import { Questionaire, Question, Page, Answer } from '../../models/index'

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
    //
    await logger.initiateLogger()
    try {
        // logs the initial request
        await logger.logRequest('resumeQuestionaire', event)
        context.callbackWaitsForEmptyEventLoop = false

        const request = {}
        // obtain query params
        request.query = event.queryStringParameters
            ? event.queryStringParameters
            : {}
        request.params = event.pathParameters
        const id =
            request.params && request.params.id


        // find one questionaire with the specific questionnaireID
        const questionaire = await Questionaire.findOne({
            where: { questionaireID: id },
            include:
            {
                // do a left join with page
                model: Page,
                // then  do a left join with questionnaire
                include: [Question]

            },
        });
        if (!questionaire || questionaire.status == "completed") {
            // in case if the questionaire is completed or not found this block would execute and return a 404
            await logger.logNotFound('resumeQuestionnaire', event)
            return response(404, {
                message: translate('errors', 'questionaire_general')
            })
        }
        // in case the questionnaire is found then it will fetch all the answers
        const answers = await Answer.findAll({ where: { questionID: questionaire.Page.questionID } })

        // logs  the resposne if all went good
        await logger.logResponse('resumeQuestionnaire', event)
        return response(200, {
            message: translate('messages', 'success'),
            data: { questionaire, answers },
        })

    } catch (error) {
        // execute in case of internal server error
        await logger.logFailure('resumeQuestionnaire', event, error)
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
