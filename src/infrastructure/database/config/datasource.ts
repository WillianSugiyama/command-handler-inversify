import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../../../domain/entities/**/*-entity.{js,ts}'],
  schema: process.env.DATABASE_SCHEMA,
  migrations: ['src/infrastructure/database/migrations/*.{js,ts}'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
});

export default dataSource;
