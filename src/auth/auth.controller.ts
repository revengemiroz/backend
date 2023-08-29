import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp() {
    return this.authService.signup();
  }

  @Post('signin')
  async signIn() {
    return this.authService.signin();
  }

  @Get('signout')
  async signOut() {
    return this.authService.signout();
  }
}
