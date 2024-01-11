import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('ws02vil7jbra08s0', 'yn894ctd97xcom7h', 'tl7aro4eglm2vdwq', {
  host: 'spryrr1myu6oalwl.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
  dialect: 'mysql',
});

export default sequelize;
