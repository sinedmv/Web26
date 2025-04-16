import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Olympiad} from "../olympiads/entities/olympiad.entity";
import {News} from "../news/entities/news.entity";
import {User} from "../users/entities/user.entity";
import {Message} from "./entities/message.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Olympiad, News, User])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
