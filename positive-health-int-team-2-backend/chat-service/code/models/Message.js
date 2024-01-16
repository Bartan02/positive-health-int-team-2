import { DataTypes } from 'sequelize';
import sequelize from '../connection/connection.js';

const Message = sequelize.define('Chat', {
  message_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, required: true, allowNull: false, unique: true },
  user_id_sender: { type: DataTypes.INTEGER, required: true, unique: false, allowNull: false},
  user_id_receiver: { type: DataTypes.INTEGER, required: true, unique: false, allowNull: false},
  sent_datetime: { type: DataTypes.TIME, required: true, allowNull: false, unique: false },
  friendship_id: { type: DataTypes.INTEGER, required: true, allowNull: false, unique: false },
  content: {type: DataTypes.TEXT, required: true, allowNull: false, unique: false}
});

export default Message;