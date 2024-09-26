import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 4000;
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Webservice Isonut')
    .setDescription('Api de consumo de servicios Isonut')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      tagSorter: 'alpha',
      filter: true,
      showRequestDuration: true,
      persistAuthorization: true,
      docExpansion: 'none',
    },
  });

  await app.listen(port);
}
bootstrap();
