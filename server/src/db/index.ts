import { Sequelize } from 'sequelize-typescript';

import { User, Room, History, UserRoom } from './models';
import config from '../config';

export default async () => {
  const sequelize = new Sequelize({
    database: config.db_name,
    host: config.db_host,
    dialect: 'mysql',
    username: config.db_user,
    password: config.db_pass,
    models: [History, Room, User, UserRoom] // or [Player, Team],
  });

  sequelize.addModels([User, Room, History, UserRoom]);

  return sequelize;
};
