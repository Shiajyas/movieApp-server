import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthService } from '../usecases/AuthService';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

class RegisterDTO {
  email!: string;
  password!: string;
}
class LoginDTO {
  email!: string;
  password!: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    const dto = plainToClass(RegisterDTO, req.body);
    const errs = await validate(dto);
    if (errs.length) return res.status(400).json({ errors: errs });
    const svc = container.resolve(AuthService);
    const created = await svc.register(dto.email, dto.password);
    res.json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const dto = plainToClass(LoginDTO, req.body);
    const errs = await validate(dto);
    if (errs.length) return res.status(400).json({ errors: errs });
    const svc = container.resolve(AuthService);
    const tokens = await svc.login(dto.email, dto.password);
    res.json(tokens);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const svc = container.resolve(AuthService);
    const tokens = await svc.refresh(refreshToken);
    res.json(tokens);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const svc = container.resolve(AuthService);
    await svc.logout(refreshToken);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to logout' });
  }
};
