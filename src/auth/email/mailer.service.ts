import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
     secure: false, // Set to true if using SSL/TLS
     auth: {
      user: '',
       pass: '',
  },
      /* Configure your SMTP settings here */
    });
  }

  async sendResetPasswordEmail(email: string, resetLink: string): Promise<void> {
    const templatePath = './src/auth/email/templates/reset-password.hbs';
    const template = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate({ resetLink });

    await this.transporter.sendMail({
      from: 'your-email@example.com',
      to: email,
      subject: 'Reset Your Password',
      html,
    });
  }

  async sendVerificationEmail(email: string, verificationLink: string): Promise<void> {
    const templatePath = './src/auth/email/templates/verify-email.hbs';
    const template = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate({ verificationLink });

    await this.transporter.sendMail({
      from: 'nepalsakshi05@gmail.com',
      to: email,
      subject: 'Verify Your Email Address',
      html,
    });
  }
}
