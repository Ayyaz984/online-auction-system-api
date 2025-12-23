import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNumberString,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';
import { EnvironmentEnums } from 'src/common/enums/config/config.enums';

class EnvVariables {
  @IsDefined()
  @IsEnum(EnvironmentEnums)
  NODE_ENV: EnvironmentEnums;

  @IsDefined()
  @IsNumberString()
  @MinLength(2)
  PORT: string;

  //   database
  @IsDefined()
  @IsString()
  DB_HOST: string;

  @IsDefined()
  @IsNumberString()
  @MinLength(2)
  DB_PORT: string;

  @IsDefined()
  @IsString()
  @MinLength(2)
  DB_USERNAME: string;

  @IsDefined()
  @IsString()
  @MinLength(2)
  DB_PASSWORD: string;

  @IsDefined()
  @IsString()
  @MinLength(2)
  DB_NAME: string;
}

export function validateConfig(configurations: Record<string, unknown>) {
  const logger = new Logger('Configuration Validation');
  const finalConfig = plainToClass(EnvVariables, configurations, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  let index = 0;
  for (const err of errors) {
    Object.values(err?.constraints ?? {})?.map((str) => {
      ++index;
      logger.log(index, str);
    });
    logger.log('\n ***** \n');
  }
  if (errors.length)
    throw new Error('Please provide the valid ENVs mentioned above');

  return finalConfig;
}
