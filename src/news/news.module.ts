import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {News} from "./entities/news.entity";
import {Olympiad} from "../olympiads/entities/olympiad.entity";
import {NewsApiController} from "./news.api.controller";

@Module({
  imports: [TypeOrmModule.forFeature([News, Olympiad])],
  controllers: [NewsController, NewsApiController], // добавь сюда
  providers: [NewsService],
  exports: [NewsService],
})

export class NewsModule {}