import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './app.config';
import { validateConfig } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [...configurations],
      validate: validateConfig,
    }),
  ],
})
export class ConfigsModule {}
