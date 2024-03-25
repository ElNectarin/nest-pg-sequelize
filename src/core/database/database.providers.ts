import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { DatabaseConfig } from './database.config';
import { User } from 'src/modules/users/user.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = DatabaseConfig.development;
          break;
        case TEST:
          config = DatabaseConfig.test;
          break;
        case PRODUCTION:
          config = DatabaseConfig.production;
          break;
        default:
          config = DatabaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
