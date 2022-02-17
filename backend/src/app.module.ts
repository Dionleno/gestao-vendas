import { Module } from '@nestjs/common'; 
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SalesModule } from './usecases/sales/sales.module';

@Module({ 
  imports: [MongooseModule.forRoot('mongodb://localhost/gestao-vendas'), SalesModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'build'), 
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
