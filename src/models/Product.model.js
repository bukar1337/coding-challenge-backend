import { DataTypes } from 'sequelize';
import sequelize from '../database'
const Sequelize = sequelize()

const Model = Sequelize.define('Products', {
    productID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pictureUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shortDescription: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    benefits: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filterColor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filterSize: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productType: {
        type: DataTypes.ENUM(['Gift', 'Household'])
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, { timestamps: false });

export default Model;
