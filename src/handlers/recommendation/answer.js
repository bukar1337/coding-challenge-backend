// importing database
import '../../database'
import { Page, Questionaire, RecordedAnswer, Condition } from '../../models/index'

// importing helpers
import translate from '../../helpers/translate'
import response from '../../helpers/response'

// importing helpers
import { v4 as uuid } from 'uuid'
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
        // logs initial request
        await logger.logRequest('postAnswer', event);
        context.callbackWaitsForEmptyEventLoop = false
        let body = JSON.parse(event.body)
        const request = {}
        request.params = event.pathParameters

        if (body == undefined) {
            body = {}
        }
        // find a questionaire if the questionnaire
        const questionaire = await Questionaire.findOne({ where: { questionaireID: request.params.id } })

        if (!questionaire || questionaire.status == 'completed') {
            // if the questionnaire is not available or if it is completed then execute this block
            return response(404, {
                message: translate('errors', 'questionaire_general'),
            })
        }
        let conditional = null

        const questionIDs = Object.keys(body);

        for (let i = 0; i < questionIDs.length; i++) {
            // itterate through the answers by various way to get the data from request body
            const answer = body[questionIDs[i]]
            const answerIds = Object.values(answer)

            const answers = await answerIds.map((el) => {

                if (el.skipped) {
                    return "skipped"
                }
                if (el.conditional) {
                    conditional = true
                    return el.value

                }
                return el.value

            })
            console.log(answers, 'answer')
            if (answers.indexOf('skipped') == -1) {
                // if the answer is skipped then dont save it
                await RecordedAnswer.create({
                    RAnswerID: await uuid(),
                    questionID: questionIDs[i],
                    questionaireID: request.params.id,
                    answer: answers
                })
            }

        }
        // find out the next page 
        let newPage = parseInt(questionaire.pageUrlEndpoint) + 1

        const updatedData = {}
        const nextPage = await Page.findOne({ where: { urlEndpoint: newPage } })
        if (conditional) {
            conditional = await Condition.findOne({ answerID: el.answerID })
            updatedData.pageUrlEndpoint = conditional.urlEndPoint
            // if the next page is available then update the questionnaire
            await questionaire.update(updatedData)
            // logs the response if all went good
            await logger.logResponse('postAnswer', event);
            // return the response
            return response(200, {
                message: translate('messages', 'success'),
                nextPage: updatedData.pageUrlEndpoint
            })
        }

        else if (nextPage) {

            updatedData.pageUrlEndpoint = newPage,
                // if the next page is available then update the questionnaire
                await questionaire.update(updatedData)
            // logs the response if all went good
            await logger.logResponse('postAnswer', event);
            // return the response
            return response(200, {
                message: translate('messages', 'success'),
                nextPage: newPage
            })

        } else {
            // if the nextpage is not available then mark the questionnaire completed
            updatedData.status = "completed"
            await questionaire.update(updatedData)
            // logs the response if everything went good
            await logger.logResponse('postAnswer', event);
            // return the response
            return response(200, {
                message: translate('messages', 'completed_questionarire'),
                questionaireId: request.params.id
            })
        }

    } catch (error) {
        // execute in case of internal server error
        await logger.logFailure('postAnswer', event, error);
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
