import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('authentication_db', 'example', 'example', {
  host: 'authentication-db',
  dialect: 'mysql',
});

export default sequelize;
