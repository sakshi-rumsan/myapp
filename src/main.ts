import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger.service';
import { setupSwagger } from './swagger.config'; // Import the setupSwagger function


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new MyLogger() });
  
  setupSwagger(app); // Call the setupSwagger function here

  
  await app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

bootstrap();

