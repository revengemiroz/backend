import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async signup() {
    return { message: 'service signup' };
  }

  async signin() {
    return { message: 'service signin' };
  }

  async signout() {
    return { message: 'service signout' };
  }
}
