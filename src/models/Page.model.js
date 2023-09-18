import { DataTypes } from 'sequelize';
import sequelize from '../database'
const Sequelize = sequelize()


const Page = Sequelize.define('Pages', {
    pageID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    urlEndpoint: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    questionID: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
    },
    conditional: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: []
    }
}, { timestamps: false });

export default Page
