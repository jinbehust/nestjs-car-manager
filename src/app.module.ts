import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './car/car.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    CarModule,
  ],
})
export class AppModule {}
