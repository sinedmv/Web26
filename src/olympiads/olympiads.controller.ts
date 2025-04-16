import { Controller, Get, Post, Patch, Delete, Param, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { OlympiadsService } from './olympiads.service';

@Controller('olympiads')
export class OlympiadsController {
  constructor(private readonly olympiadsService: OlympiadsService) {}

  @Get()
  @Render('olympiads/index')
  async findAll(@Req() request: Request) {
    const olympiads = await this.olympiadsService.findAll();
    return { olympiads, isAuthorized: request.query.auth === 'true' };
  }

  @Get('add')
  @Render('olympiads/add')
  getAddForm(@Req() request: Request) {
    return { isAuthorized: request.query.auth === 'true' };
  }

  @Post()
  async create(@Req() request: Request, @Res() res: Response) {
    await this.olympiadsService.create(request.body);
    return res.redirect('/olympiads');
  }

  @Get(':id')
  @Render('olympiads/show')
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const olympiad = await this.olympiadsService.findOne(+id);
    return { olympiad, isAuthorized: request.query.auth === 'true' };
  }

  @Get(':id/edit')
  @Render('olympiads/edit')
  async getEditForm(@Param('id') id: string, @Req() request: Request) {
    const olympiad = await this.olympiadsService.findOne(+id);
    return { olympiad, isAuthorized: request.query.auth === 'true' };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Req() request: Request, @Res() res: Response) {
    await this.olympiadsService.update(+id, request.body);
    return res.redirect(`/olympiads/${id}`);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.olympiadsService.remove(+id);
    return res.redirect('/olympiads');
  }
}
