// src/my-service/my-service.service.ts
import { Injectable } from '@nestjs/common';
import { MyLogger } from '../logger/logger.service';

@Injectable()
export class MyService {
  constructor(private readonly logger: MyLogger) {}

  doSomething() {
    this.logger.log('Doing something...');
    this.logger.error('Something went wrong!');
    this.logger.warn('Warning: Proceed with caution!');
  }
}
