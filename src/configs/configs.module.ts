import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './app.config';
import { validateConfig } from './config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [...configurations],
      validate: validateConfig,
    }),
  ],
})
export class ConfigsModule {}
