import { DataTypes } from 'sequelize';
import sequelize from '../connection/connection.js';

const Friendship = sequelize.define('Friendship', {
  friendship_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, required: true, allowNull: false, unique: true },
  friend_one: { type: DataTypes.INTEGER, required: true, unique: false },
  friend_two: { type: DataTypes.INTEGER, required: true, allowNull: false, unique: false },
  status: { type: DataTypes.INTEGER, required: true, allowNull: false, unique: false },
});

export default Friendship;