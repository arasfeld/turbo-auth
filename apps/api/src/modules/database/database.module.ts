import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { buildDatabaseConfig } from './mikro-orm.config';

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    const mikroOrm = MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...buildDatabaseConfig(
            configService.get<string>('POSTGRES_HOST'),
            configService.get<number>('POSTGRES_PORT'),
            configService.get<string>('POSTGRES_DB'),
            configService.get<string>('POSTGRES_USER'),
            configService.get<string>('POSTGRES_PASSWORD'),
          ),
        };
      },
    });

    return {
      module: DatabaseModule,
      imports: [mikroOrm],
      providers: [],
      exports: [mikroOrm],
    };
  }
}
