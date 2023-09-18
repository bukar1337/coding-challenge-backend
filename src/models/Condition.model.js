import { DataTypes } from 'sequelize';
import sequelize from '../database'
const Sequelize = sequelize()
const Model = Sequelize.define('Conditions', {
    answerID: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    ConditionID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    urlEndPoint: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    questionID: {
        type: DataTypes.UUID,
        foreignKey: true,
        allowNull: false,
    }
}, { timestamps: false });

export default Model;
