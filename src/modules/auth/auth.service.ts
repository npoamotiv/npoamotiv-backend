import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    login: string,
    tabel: string,
    password: string,
  ): Promise<any> {
    console.log('Attempting to validate user:', { login, tabel });
    const user = await this.usersService.findByLogin(login);

    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException('User not found');
    }

    console.log('Found user:', user.toJSON());

    if (!user.tabel || user.tabel !== tabel) {
      console.log('Tabel numbers do not match:', {
        expected: user.tabel,
        received: tabel,
        userObject: user.toJSON(),
      });
      throw new UnauthorizedException('Invalid tabel number');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      throw new UnauthorizedException('Invalid password');
    }

    const { password: _, ...result } = user.toJSON();
    return result;
  }

  async login(user: any) {
    const payload = { login: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
