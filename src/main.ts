import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const defaultPort = 1337;
  const port = process.env.PORT || defaultPort;

  await app.listen(port);
  console.log(`Look at the ${port}`);
  console.log('Don\'t forget to change the protocol if you can\'t connect');
}

bootstrap();
