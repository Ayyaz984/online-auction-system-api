import { plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNumberString,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';
import { EnvironmentsEnum } from 'src/common/enums/config/config.enums';

class EnvVariables {
  @IsDefined()
  @IsEnum(EnvironmentsEnum)
  NODE_ENV: EnvironmentsEnum;

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
  const finalConfig = plainToClass(EnvVariables, configurations, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  let index = 0;
  for (const err of errors) {
    Object.values(err?.constraints ?? {})?.map((str) => {
      ++index;
      console.log(index, str);
    });
    console.log('\n ***** \n');
  }
  if (errors.length)
    throw new Error('Please provide the valid ENVs mentioned above');

  return finalConfig;
}
