import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type SalesDocument = Sales & Document;

@Schema()
export class Sales {
  @Prop()
  amount: Number;

  @Prop()
  type: number;

  @Prop({ type : Date, default: Date.now })
  createAt: Date;

  @Prop()
  description: string;
}

export const SalesSchema = SchemaFactory.createForClass(Sales);