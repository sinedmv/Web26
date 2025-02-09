import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import * as handlebars from 'handlebars';
import * as hbs from 'hbs';
import { readdirSync, readFileSync } from 'fs';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    this.registerPartials();
  }

  private registerPartials() {
    const partialsDir = path.join(__dirname, '..', 'views', 'partials');

    readdirSync(partialsDir).forEach(file => {
      const partialName = path.basename(file, '.hbs');
      const partialPath = path.join(partialsDir, file);
      const partialContent = readFileSync(partialPath, 'utf8');
      hbs.registerPartial(partialName, partialContent);
      handlebars.registerPartial(partialName, partialContent);
      console.log(`Registered partial: ${partialName}`);
    });
  }
}