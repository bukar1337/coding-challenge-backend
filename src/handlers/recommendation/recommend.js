// importing database
import '../../database'
import { RecordedAnswer, Product, Result, Questionaire, Selector } from '../../models/index';

// importing helpers
import translate from '../../helpers/translate'
import response from '../../helpers/response'
import Logger from '../../helpers/logger'
const logger = new Logger()

// importing packages
import { v4 as uuid } from 'uuid'
/**
 *
 * @param {*} event
 * @param {*} context
 */

exports.handler = async function (event, context) {
    // intialize the logger
    await logger.initiateLogger()
    try {
        // logs the initial request
        await logger.logRequest('recomend', event);
        context.callbackWaitsForEmptyEventLoop = false

        let body = JSON.parse(event.body)
        const request = {}
        request.params = event.pathParameters

        if (body == undefined) {
            body = {}
        }
        const result = await Questionaire.findOne({
            where: { questionaireID: request.params.id },
            // include questions of that page too

            include: {
                model: Result,

            },


        })

        if (!result || result.status == "in-progress") {
            return response(404, {
                message: translate('errors', 'general'),
            })
        }
        if (result.Result) {
            return response(200, {
                message: translate('messages', 'success'),
                recommendations: result.Result.resultSummary
            })
        }

        // find all the recorded answers
        const recordedAnswers = await RecordedAnswer.findAll({
            where: {
                questionaireID: request.params.id,
            },
        });



        // get the values of recorded answers
        const answers = recordedAnswers.map((answer) => answer.answer);
        // find all the product
        const allProducts = await Product.findAll({})

        const recommendations = await allProducts
            // map through all the products
            .map((product) => {
                // apply filter for the criteria to get the product that matches with the score
                const matchingCriteria = answers.filter((criteria) => {
                    // get all the keys of productModel to run match
                    return Object.keys(product.dataValues).some((key) => {
                        // if the dataValues are matching with the recordedanswers attributes
                        return criteria.includes(product.dataValues[key]);

                    });
                })
                // calculate the score for each product
                const score = matchingCriteria.length / answers.length;
                // return product and scores 
                return { product, score };
            })
            // sort the product with the score accordingly
            .sort((a, b) => b.score - a.score)
            // get the top three products
            .slice(0, 3);
        const resultID = await uuid()

        await Result.create({
            SelectorID: result.selectorID,
            questionaireID: result.questionaireID,
            resultSummary: recommendations,
            resultID: resultID
        })


        // logs the resposne if all went good
        await logger.logResponse('recomend', event)
        // return the response
        return response(200, {
            message: translate('messages', 'success'),
            recommendations
        })
    } catch (error) {
        console.log(error)
        // execute in case of internal server error
        await logger.logFailure('recomend', event, error);
        return response(500, {
            message: translate('errors', 'general'),
        })
    }
}

