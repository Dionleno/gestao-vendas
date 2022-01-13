import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sales, SalesSchema } from './schemas/sales.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Sales.name, schema: SalesSchema }])],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}
