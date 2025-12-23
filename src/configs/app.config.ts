import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  ConfigKeys,
  EnvironmentEnums,
} from 'src/common/enums/config/config.enums';

const AppConfig = registerAs(ConfigKeys.APP, () => ({
  env: EnvironmentEnums[process.env.NODE_ENV as keyof EnvironmentEnums],
  port: Number(process.env.PORT),
}));

const DBConfig = registerAs(
  ConfigKeys.DB,
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }),
);

export const configurations = [AppConfig, DBConfig];
