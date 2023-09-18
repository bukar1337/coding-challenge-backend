// importing database
import '../../database'
import { Product } from '../../models/index'

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
        logger.logRequest(`ProductList`, event)

        context.callbackWaitsForEmptyEventLoop = false

        const request = {}
        // obtain query params
        request.query = event.queryStringParameters
            ? event.queryStringParameters
            : {}
        request.params = event.pathParameters
        const id =
            request.params && request.params.id



        // find one product that with the specific productID
        const product = await Product.findOne({
            where: { productID: id }
        });
        if (!product) {
            // execute if the product doesn`t found
            logger.logNotFound(`ProductList`, event)
            return response(404, {
                message: translate('error', 'not_found')
            })

        }

        // execute if all went good
        await logger.logResponse('ProductList', event)
        // return the response
        return response(200, {
            message: translate('messages', 'success'),
            data: product,
        })

    } catch (error) {
        // execute in case of internal server error
        logger.logFailure(`ProductList`, event, error)
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
