import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('friends_db', 'example123', 'example123', {
  host: 'friends-db',
  dialect: 'mysql',
});

export default sequelize;
