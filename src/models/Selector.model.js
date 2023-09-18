// models/Selector.js
import { DataTypes } from 'sequelize';
import sequelize from '../database'
const Sequelize = sequelize()

const Selector = Sequelize.define('Selectors', {
  selectorID: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM(['blocked', 'active']),
    defaultValue: 'active'

  },
}, { timestamps: false });

export default Selector;

