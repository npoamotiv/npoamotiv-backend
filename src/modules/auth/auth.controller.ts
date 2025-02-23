import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { login: string; tabel: string; password: string }) {
    const user = await this.authService.validateUser(
      body.login,
      body.tabel,
      body.password,
    );
    return this.authService.login(user);
  }
}