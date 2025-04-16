import { Controller, Get, Post, Patch, Delete, Param, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MessagesService } from './messages.service';
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @Render('messages/index')
  async findAll(@Req() request: Request) {
    const messages = await this.messagesService.findAll();
    return {
      messages,
      isAuthorized: request.query.auth === 'true'
    };
  }

  @Get('add')
  @Render('messages/add')
  getAddForm(@Req() request: Request) {
    return { isAuthorized: request.query.auth === 'true' };
  }

  @Post()
  async create(@Req() request: Request, @Res() res: Response) {
    await this.messagesService.create(request.body);
    return res.redirect('/messages');
  }

  @Get(':id')
  @Render('messages/show')
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const message = await this.messagesService.findOne(+id);
    return {
      message,
      isAuthorized: request.query.auth === 'true'
    };
  }

  @Get(':id/edit')
  @Render('messages/edit')
  async getEditForm(@Param('id') id: string, @Req() request: Request) {
    const message = await this.messagesService.findOne(+id);
    return {
      message,
      isAuthorized: request.query.auth === 'true'
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Req() request: Request, @Res() res: Response) {
    await this.messagesService.update(+id, request.body);
    return res.redirect(`/messages/${id}`);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.messagesService.remove(+id);
    return res.redirect('/messages');
  }
}
