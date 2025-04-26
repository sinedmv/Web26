import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import {INestApplication, ValidationPipe} from "@nestjs/common";
import {AllExceptionsFilter} from "./exception.filter";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ElapsedTimeInterceptor} from "./interceptors/time.interceptor";
import { middleware } from "supertokens-node/framework/express";
import { errorHandler } from "supertokens-node/framework/express";
import supertokens from 'supertokens-node';


export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
      .setTitle('Users API')
      .setDescription('API documentation for Users endpoints')
      .setVersion('1.0')
      .addTag('users')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.use(middleware());
  app.use(errorHandler());

  app.enableCors({
    origin: true,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ElapsedTimeInterceptor());

  setupSwagger(app)

  const defaultPort = 1337;
  const port = process.env.PORT || defaultPort;

  await app.listen(port);
  console.log(`Look at the ${port}`);
  console.log('Don\'t forget to change the protocol if you can\'t connect');
}
bootstrap();
