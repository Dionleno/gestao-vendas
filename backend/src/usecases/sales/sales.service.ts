import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSaleDto } from './dto/create-sale.dto'; 
import { Sales, SalesDocument } from './schemas/sales.schema';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sales.name) private salesModel: Model<SalesDocument>) {}

  async create(createCatDto: CreateSaleDto): Promise<Sales> {
    const createdCat = new this.salesModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Sales[]> {
    const now = new Date();

    const start = new Date(now.getFullYear(),now.getMonth(),now.getDate(),1,0,0);

    const end = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,59,59);
 
    return this.salesModel.find({"createAt": { '$gte': start, '$lte': end }}).sort([["createAt", -1]]).exec();
  }

  remove(id: string) {
    return this.salesModel.deleteOne({_id: id});  
  }
}
