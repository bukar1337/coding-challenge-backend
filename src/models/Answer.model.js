import { DataTypes } from 'sequelize';
import sequelize from '../database'
const Sequelize = sequelize()

const Model = Sequelize.define('Answers', {
    answerID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    questionID: {
        type: DataTypes.STRING,
        foreignKey: true,
        allowNull: false,
    },
    conditional: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    creationTimestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modifiedTimestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { timestamps: false });

export default Model;
