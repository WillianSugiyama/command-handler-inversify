import { Repository } from 'typeorm';

export interface IConnectionService {
  getRepo<T>(target: string | (new () => {})): Promise<Repository<T>>;
  closeConnection(): Promise<void>;
}
