import { inject, injectable } from 'inversify';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource, Repository } from 'typeorm';
import { createLogger } from '../../logger';
import { Settings } from '../../../infrastructure/configurations/settings';
import { join } from 'path';
import { IConnectionService } from './interfaces/connection-service-interface';

@injectable()
export class ConnectionService implements IConnectionService {
  private dataSource: DataSource;
  private isConnected: boolean;
  private logger = createLogger('TypeORM');

  constructor(
    @inject(Settings)
    private readonly settings: Settings
  ) {
    this.dataSource = new DataSource({
      type: 'postgres',
      host: this.settings.getDBHost(),
      port: this.settings.getDBPort(),
      username: this.settings.getDBUsername(),
      password: this.settings.getDBPassword(),
      database: this.settings.getDBName(),
      entities: [join(__dirname, '/../../../../**/**-entity{.ts,.js}')],
      schema: this.settings.getDBSchema(),
      migrations: [join(__dirname, '/../migrations/*{.ts,.js}')],
      migrationsTableName: 'migrations',
      synchronize: false,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    });

    this.isConnected = this.dataSource.isInitialized;
  }

  public async getRepo<T>(target: string | (new () => {})): Promise<Repository<T>> {
    try {
      await this.connect();
      return this.dataSource.getRepository<T>(target);
    } catch (error: any) {
      this.logger.error('Error when get repository');
      throw Error(error);
    }
  }

  public async closeConnection(): Promise<void> {
    if (this.isConnected) {
      return await this.dataSource.destroy();
    }
  }

  private async connect(): Promise<boolean> {
    if (!this.isConnected) {
      try {
        await this.dataSource.initialize();
        this.isConnected = true;
      } catch (error) {
        this.logger.error('Error when connect to database', error);
        this.isConnected = false;
      }
    }

    return this.isConnected;
  }
}
