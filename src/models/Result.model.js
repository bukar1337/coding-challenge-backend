import { DataTypes } from 'sequelize';
import sequelize from '../database'
const Sequelize = sequelize()

const Model = Sequelize.define('Results', {
    resultID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    SelectorID: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    questionaireID: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    },
    resultSummary: {
        type: DataTypes.JSONB
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

}, { timestamps: true });

export default Model;
