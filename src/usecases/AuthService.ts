
import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcryptjs';
import jwt,{ SignOptions } from 'jsonwebtoken';
import { IUserRepository } from '../repositories/IUserRepository';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS_EXPIRES, REFRESH_EXPIRES } from '../config/env';

@injectable()
export class AuthService {
  constructor(@inject('IUserRepository') private userRepo: IUserRepository) {}

  async register(email: string, password: string) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('Email already used');
    const hash = await bcrypt.hash(password, 10);
    const user = await this.userRepo.create(email, hash);
    return { id: user._id, email: user.email };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error('Invalid credentials');

    const access = jwt.sign({ sub: user._id, email: user.email }, JWT_ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES }as SignOptions);
    const refresh = jwt.sign({ sub: user._id }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES }as SignOptions);

    await this.userRepo.addRefreshToken(user._id!.toString(), refresh);
    return { accessToken: access, refreshToken: refresh };
  }

  async refresh(refreshToken: string) {
    try {
      const payload: any = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      const user = await this.userRepo.findByRefreshToken(refreshToken);
      if (!user) throw new Error('Invalid refresh token');
      const access = jwt.sign({ sub: user._id, email: user.email }, JWT_ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES } as SignOptions);
      return { accessToken: access };
    } catch (err) {
      throw new Error('Invalid refresh token');
    }
  }

  async logout(refreshToken: string) {
    const user = await this.userRepo.findByRefreshToken(refreshToken);
    if (!user) return;
    await this.userRepo.removeRefreshToken(user._id!.toString(), refreshToken);
  }
}
