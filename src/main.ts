import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import {INestApplication, ValidationPipe} from "@nestjs/common";
import {AllExceptionsFilter} from "./exception.filter";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ElapsedTimeInterceptor} from "./interceptors/time.interceptor";
import { middleware } from 'supertokens-node/framework/express';
import supertokens from 'supertokens-node'
import SuperTokens from "supertokens-node";
import {SuperTokensConfig} from "./auth/supertokens.config";
import * as express from 'express';
import {NextFunction, RequestHandler} from "express";


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

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('\n=== Incoming Request ===');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);

    next();
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const cors = require("cors")
  const { middleware } = require("supertokens-node/framework/express");

  SuperTokens.init(SuperTokensConfig);

// make sure that the supertokens.init({...}) call comes before the code below

  app.use(cors({
    origin: process.env.API_DOMAIN,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  }));
// IMPORTANT: CORS config should be before the below middleware() call.

  app.use(middleware());
  const { errorHandler } = require("supertokens-node/framework/express");
  app.use(errorHandler())

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
