import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import * as handlebars from 'handlebars';
import * as hbs from 'hbs';
import { readdirSync, readFileSync } from 'fs';
import { MessagesModule } from './messages/messages.module';
import { NewsModule } from './news/news.module';
import { OlympiadsModule } from './olympiads/olympiads.module';
import { GalleryModule } from './gallery/gallery.module';
import { UsersModule } from './users/users.module';
import * as handlebarsLayouts from 'handlebars-layouts';
import {NewsService} from "./news/news.service";
import {OlympiadsService} from "./olympiads/olympiads.service";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT!),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_NAME,
      synchronize: true,
      logging: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      csrfPrevention: false,
      playground: true
    }),
    MessagesModule,
    NewsModule,
    OlympiadsModule,
    GalleryModule,
    UsersModule,
    S3Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    this.registerPartials();
  }

  private registerPartials() {
    handlebars.registerHelper('eq', (a, b) => a === b);
    handlebars.registerHelper('formatDate', (date) => new Date(date).toLocaleDateString());

    hbs.registerHelper('eq', (a, b) => a === b);
    hbs.registerHelper('formatDate', (date) => new Date(date).toLocaleDateString());

    const partialsDir = path.join(__dirname, '..', 'views', 'partials');

    readdirSync(partialsDir).forEach(file => {
      const partialName = path.basename(file, '.hbs');
      const partialPath = path.join(partialsDir, file);
      const partialContent = readFileSync(partialPath, 'utf8');
      hbs.registerPartial(partialName, partialContent);
      handlebars.registerPartial(partialName, partialContent);
      console.log(`Registered partial: ${partialName}`);
    });

    const layoutDir = path.join(__dirname, '..', 'views', 'layouts');

    readdirSync(layoutDir).forEach(file => {
      const partialName = path.basename(file, '.hbs');
      const partialPath = path.join(layoutDir, file);
      const partialContent = readFileSync(partialPath, 'utf8');
      hbs.registerPartial(partialName, partialContent);
      handlebars.registerPartial(partialName, partialContent);
      console.log(`Registered layout: ${partialName}`);
    });

    handlebarsLayouts.register(handlebars);
  }
}