import { DataTypes } from 'sequelize';
import sequelize from '../database'
const Sequelize = sequelize()
const Question = Sequelize.define('Questions', {
    questionID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM({ values: ['card', 'sliders', 'buttons'] }),
        allowNull: false
    },
    conditional: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    answerID: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },

    pageID: {
        type: DataTypes.UUID,
        foreignKey: true,
        allowNull: false,
    },
    text: { type: DataTypes.STRING, allowNull: false }
}, {
    timestamps: false
});

export default Question;
