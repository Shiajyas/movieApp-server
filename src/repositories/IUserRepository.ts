import { IUserDoc } from '../models/User';
export interface IUserRepository {
  create(email: string, passwordHash: string): Promise<IUserDoc>;
  findByEmail(email: string): Promise<IUserDoc | null>;
  addRefreshToken(userId: string, token: string): Promise<void>;
  removeRefreshToken(userId: string, token: string): Promise<void>;
  findByRefreshToken(token: string): Promise<IUserDoc | null>;
}
