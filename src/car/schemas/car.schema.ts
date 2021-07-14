import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop()
  id: number;

  @Prop()
  brand: string;

  @Prop()
  color: string;

  @Prop()
  model: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
