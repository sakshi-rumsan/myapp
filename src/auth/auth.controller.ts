// src/auth/auth.controller.ts

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthService } from './auth.service';
import { RbacGuard } from './guards/rbac.guard';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators

@Controller('auth')
@ApiTags('Authentication') // Optional: Add tags for Swagger documentation
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.register(authCredentialsDto);
  }

  @Post('login')
  async login(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.login(authCredentialsDto);
  }

  @Post('reset-password')
  @UseGuards(RbacGuard) // Example of using RBAC guard
  @ApiOperation({ summary: 'Reset Password' }) // Operation summary for Swagger
  @ApiBody({ type: ResetPasswordDto }) // Include request body type for Swagger
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
