import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './utils/exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('auth-service');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Identity API')
    .setDescription('The API description')
    .setVersion('1.0')
    .setBasePath('auth-service')
    .addBearerAuth(
      {
        description: ``,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      operationsSorter: 'method',
    },
  });
  //const rabbitConfigService = app.get(RabbitConfigService);
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(8000);
}
bootstrap();
