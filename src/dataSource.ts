import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'test',
  entities: [User],
  synchronize: true,
  logging: true,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

export default AppDataSource;
