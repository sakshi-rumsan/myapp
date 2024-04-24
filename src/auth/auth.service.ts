import { Injectable } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from './email/mailer.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RbacGuard } from './guards/rbac.guard'; // Assuming RbacGuard handles roles
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService
import { User } from '@prisma/client'; // Import User from Prisma Client
import { getRandomValues } from 'crypto';
 

@Injectable()
export class AuthService {
  [x: string]: any;
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly prismaService: PrismaService, // Inject PrismaService
  ) {}

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    let verificationToken: number | undefined;
  
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: authCredentialsDto.email },
      select: { verificationToken: true },
    });
  
    if (!existingUser) {
      const min = 1000; // Minimum value for the random integer
      const max = 9999; // Maximum value for the random integer
      verificationToken = Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      verificationToken = existingUser.verificationToken;
    }
  
    // Logic to create user and send verification email
    const user = await this.prismaService.user.create({
      data: {
        email: authCredentialsDto.email,
        password: authCredentialsDto.password,
        roles: ['user'], // Assuming user is created with default role
        verificationToken,
      },
    });
  
    // Generate verification link
    const verificationLink = `https://your-app-domain.com/verify-email?token=${verificationToken}`;
    await this.mailerService.sendVerificationEmail(user.email, verificationLink);
  }
  

  async login(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    // Logic to authenticate user and generate access token
    const user = await this.prismaService.user.findUnique({
      where: { email: authCredentialsDto.email },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const payload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  @UseGuards(RbacGuard) // Use RBAC guard for role-based access control
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { email, newPassword } = resetPasswordDto;

  // Find the user by email
  const user = await this.prismaService.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Generate a reset token
  const resetToken = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random token

  // Update the user in the database with the reset token
  await this.prismaService.user.update({
    where: { email },
    data: {
      resetToken,
      resetTokenExpiry: new Date(Date.now() + 3600000), // Token expires in 1 hour
    },
  });

  // Generate the reset password link with the reset token
  const resetLink = `https://your-app-domain.com/reset-password?token=${resetToken}`;

  // Send the reset password email with the link
  await this.mailerService.sendResetPasswordEmail(email, resetLink);
    
    // Logic to reset user's password
  }
}
function generateRandomToken(arg0: number) {
  throw new Error('Function not implemented.');
}

