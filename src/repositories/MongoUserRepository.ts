
import { injectable } from 'tsyringe';
import { IUserRepository } from './IUserRepository';
import { UserModel, IUserDoc } from '../models/User';

@injectable()
export class MongoUserRepository implements IUserRepository {
  async create(email: string, passwordHash: string): Promise<IUserDoc> {
    const user = await UserModel.create({ email, passwordHash });
    return user;
  }
  async findByEmail(email: string) {
    return UserModel.findOne({ email }).exec();
  }
  async addRefreshToken(userId: string, token: string) {
    await UserModel.findByIdAndUpdate(userId, { $push: { refreshTokens: token } }).exec();
  }
  async removeRefreshToken(userId: string, token: string) {
    await UserModel.findByIdAndUpdate(userId, { $pull: { refreshTokens: token } }).exec();
  }
  async findByRefreshToken(token: string) {
    return UserModel.findOne({ refreshTokens: token }).exec();
  }
}
