import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {News} from "./entities/news.entity";
import {Olympiad} from "../olympiads/entities/olympiad.entity";
import {NewsApiController} from "./news.api.controller";
import {NewsResolver} from "./news.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([News, Olympiad])],
  controllers: [NewsController, NewsApiController],
  providers: [NewsService, NewsResolver],
  exports: [NewsService],
})

export class NewsModule {}