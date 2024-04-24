import { Logger } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const port = process.env.PORT || 3000; // Default to port 3000 if process.env.PORT is not set
  const logger = new Logger('swagger setup');
  const options = new DocumentBuilder()
    .setTitle('API PROVIDER')
    .setDescription('API')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);
  logger.log(`Swagger Documentation running on the url http://localhost:${port}/api/docs`);
}
