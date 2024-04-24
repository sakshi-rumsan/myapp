import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from './email/mailer.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';


const crypto = require('crypto');

// Generate fallback secret if JWT_SECRET is not provided
const fallbackSecret = crypto.randomBytes(32).toString('hex');

@Module({
  imports: [
 
    JwtModule.register({
      secret: process.env.JWT_SECRET || fallbackSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailerService],
})
export class AuthModule {}
