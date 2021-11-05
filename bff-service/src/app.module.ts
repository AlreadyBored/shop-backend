import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BffModule } from './bff/bff.module';
import { BffController } from './bff/bff.controller';

@Module({
  imports: [ConfigModule.forRoot(), BffModule],
  controllers: [AppController, BffController],
  providers: [AppService],
})
export class AppModule { }
