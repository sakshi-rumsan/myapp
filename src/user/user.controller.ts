// src/user/user.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators

@Controller('users')
@ApiTags('Users') // Optional: Add tags for Swagger documentation
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' }) // Operation summary for Swagger
  @ApiBody({ type: CreateUserDto }) // Include request body type for Swagger
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
