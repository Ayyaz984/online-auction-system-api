import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKeysEnum } from 'src/common/enums/config/config.enums';

const AppConfig = registerAs(ConfigKeysEnum.App, () => ({
  env: process.env.NODE_ENV,
  port: process.env.PORT,
}));

const DbConfig = registerAs(
  ConfigKeysEnum.Db,
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }),
);

export const configurations = [AppConfig, DbConfig];
