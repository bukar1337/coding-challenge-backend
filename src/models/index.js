import sequelize from '../database';
import Selector from './Selector.model';
import Page from './Page.model';
import Question from './Question.model';
import Answer from './Answer.model';
import Condition from './Condition.model';
import Product from './Product.model'
import RecordedAnswer from './RecordAnswer.model'
import Questionaire from './Questionaire.model';
import Result from './Result.model'

//  relationships
Page.hasMany(Question, { foreignKey: 'pageID' });
Question.belongsTo(Page, { foreignKey: 'pageID' });


Question.belongsToMany(Answer, { through: 'QuestionAnswers', foreignKey: 'questionID', timestamps: false });
Answer.belongsTo(Question, { foreignKey: 'answerID' });

Condition.belongsTo(Question, { foreignKey: 'questionID' });

Answer.hasOne(Condition, { foreignKey: 'answerID' });
Condition.belongsTo(Answer, { foreignKey: 'answerID' });

Questionaire.hasOne(Page, {
    foreignKey: 'urlEndpoint',
    sourceKey: 'pageUrlEndpoint'
});
Questionaire.hasOne(Result, { foreignKey: 'questionaireID' })
Result.hasOne(Selector, { foreignKey: 'selectorID', sourceKey: 'SelectorID' })

export {
    Selector,
    Page,
    RecordedAnswer,
    Question,
    Product,
    Answer,
    Questionaire,
    Condition,
    Result,
    sequelize,
};
