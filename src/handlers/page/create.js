// importing database
import '../../database'
import { Page } from '../../models/index'


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
        await logger.logRequest('createPage', event);
        context.callbackWaitsForEmptyEventLoop = false
        let body = JSON.parse(event.body)
        if (body == undefined) {
            body = {}
        }
        const isPageExist = await Page.findOne({ where: { urlEndpoint: body.urlEndpoint } })
        if (isPageExist) {
            return response(409, {
                message: translate('validations', 'page.exist'),
            })
        }
        // generating a new uuid
        const pageID = await uuid()
        // creating a new page
        await Page.create({
            pageID: pageID,
            urlEndpoint: body.urlEndpoint
        })
        // logs the response if all went good
        await logger.logResponse('createPage', event);
        return response(200, {
            message: translate('messages', 'success'),
        })

    } catch (error) {
        // execute in case of internal server error
        await logger.logFailure('createPage', event, error);
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
