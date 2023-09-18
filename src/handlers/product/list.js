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
        // logs the initial request
        logger.logRequest(`ProductList`, event)
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



        // find products that matches provide limit and skip (offset) criteria"
        const product = await Product.findAll({
            limit: pageSize,
            offset,
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });
        if (!product.length) {
            // if the product(s) not found
            logger.logNotFound(`ProductList`, event)

            return response(404, {
                message: translate('errors', 'not_found')
            })

        }
        // pagination related work
        const count = await Product.count()


        const pagination = {
            total: count,
            current: parseInt(page) || 1,
            first: 1,
            last: count ? Math.ceil(count / pageSize) : 1,
            next: page < Math.ceil(count / pageSize) ? parseInt(page) + 1 : 0,
        }
        // logs the response if everything goes well
        logger.logResponse(`ProductList`, event)
        // return the response
        return response(200, {
            message: translate('messages', 'success'),
            data: product,
            pagination
        })

    } catch (error) {
        // execute incase of internal server error
        logger.logFailure(`ProductList`, event, error)
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}
