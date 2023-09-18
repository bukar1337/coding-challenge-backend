// importing database
import '../../database'
import { Selector } from '../../models/index'

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
        await logger.logRequest('createSelector', event);
        context.callbackWaitsForEmptyEventLoop = false
        let body = JSON.parse(event.body)

        if (body == undefined) {
            body = {}
        }

        // first try to find the selectors
        let selector = await Selector.findOne({ where: { email: body.email } })
        if (selector && selector.status == 'blocked') {
            return response(409, {
                message: translate('errors', 'user.blocked'),
            })
        }
        if (!selector) {
            // if the selector is not available in the database then create a new selector
            //generate a new uuid
            const selectorID = await uuid()
            // create selector
            selector = await Selector.create({
                selectorID: selectorID,
                email: body.email
            })
        }
        // logs the response if everything went well
        await logger.logResponse('createSelector', event);
        // return the response
        return response(200, {
            message: translate('messages', 'success'),
            selectorID: selector.selectorID
        })

    } catch (error) {
        // execute in case of internal server error
        await logger.logFailure('createSelector', event, error);
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
