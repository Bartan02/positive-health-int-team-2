import { DataTypes } from 'sequelize';
import sequelize from '../connection/connection.js';

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, required: true, unique: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

export default User;