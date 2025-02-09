import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const defaultPort = 1337;
  const port = process.env.PORT || defaultPort;

  await app.listen(port);
  console.log(`Look at the ${port}`);
  console.log('Don\'t forget to change the protocol if you can\'t connect');
}
bootstrap();
