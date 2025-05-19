import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { IDatabaseConfig, SslOptions } from './interfaces';
import { APP, DB_CONFIG } from '../environment/env.config';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  private isValidDatabaseConfig(config: unknown): config is IDatabaseConfig {
    if (!config || typeof config !== 'object') return false;
    const requiredProps = ['host', 'port', 'username', 'password', 'database'];
    return requiredProps.every((prop) => prop in config);
  }

  public getConfig(): TypeOrmModuleOptions {
    const scope = this.configService.get<string>(`${APP}.env`);
    const isLocalDB = scope === 'local';

    const rawConfig = this.configService.get(DB_CONFIG);
    if (!rawConfig) throw new Error('Postgres config not found');
    const config = rawConfig as IDatabaseConfig;

    if (!this.isValidDatabaseConfig(config)) {
      throw new Error('Invalid database configuration');
    }

    let response: TypeOrmModuleOptions = {
      ...config,
      autoLoadEntities: true,
    };

    if (!isLocalDB) {
      response = {
        ...response,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      };
    }

    return response;
  }

  static getDataSource(envs: Record<string, any>): DataSource {
    const {
      db,
      app: { env },
    } = envs;

    const isLocalDB = env === 'local';

    if (!this.prototype.isValidDatabaseConfig(db)) {
      throw new Error('Invalid database configuration');
    }

    const validatedConfig = db;

    let sslOptions: SslOptions = {};
    if (!isLocalDB) {
      sslOptions = {
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      };
    }

    const dataSourceOptions = {
      type: 'postgres' as const,
      host: validatedConfig.host,
      port: validatedConfig.port,
      username: validatedConfig.username,
      password: validatedConfig.password,
      database: validatedConfig.database,
      entities: ['src/**/*.entity.ts'],
      migrations: [__dirname + '/migrations/*.{js,ts}'],
      ...sslOptions,
    } satisfies DataSourceOptions;

    return new DataSource(dataSourceOptions);
  }
}
