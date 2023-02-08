import { Module } from '@nestjs/common';
import { RecordLabelController } from './record-label/record-label.controller';
import { RecordLabelService } from './record-label/record-label.service';
import { RecordLabelModule } from './record-label/record-label.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [RecordLabelModule, HttpModule],
  controllers: [RecordLabelController],
  providers: [RecordLabelService],
})
export class AppModule { }
