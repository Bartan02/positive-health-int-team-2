import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('chat_db', 'example123', 'example123', {
  host: 'chat-db',
  dialect: 'mysql',
});

export default sequelize;