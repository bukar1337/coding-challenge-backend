import { DataTypes } from 'sequelize';
import sequelize from '../database'
const Sequelize = sequelize()

const Model = Sequelize.define('Questionaires', {
    questionaireID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    pageUrlEndpoint: {
        type: DataTypes.DECIMAL,
        defaultValue: 1,
        allowNull: true,

    },
    selectorID: {
        type: DataTypes.UUID,
        foreignKey: true,
        allowNull: false,
    },
    status: { type: DataTypes.ENUM(['completed', 'in-progress']) },
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
