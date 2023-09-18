import { DataTypes } from 'sequelize';
import sequelize from '../database'
const Sequelize = sequelize()


const Model = Sequelize.define('RecordAnswer', {
    RAnswerID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    questionaireID: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    questionID: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: [],
    },
    answer: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: []
    }
}, { timestamps: false });

export default Model
