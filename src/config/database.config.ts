import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const getDatabaseConfig = (configService: ConfigService): SequelizeModuleOptions => {
  return {
    dialect: 'postgres',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    uri: configService.get('DATABASE_URL'),
    autoLoadModels: true,
    synchronize: true,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  };
};