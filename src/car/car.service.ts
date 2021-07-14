import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CarDto } from './car.dto';
import { Car, CarDocument } from './schemas/car.schema';

const carProjection = {
  __v: false,
  _id: false,
};

@Injectable()
export class CarService {
  constructor(
    @InjectModel('Car') private readonly carModel: Model<CarDocument>,
  ) {}

  public async getCars(): Promise<Car[]> {
    const cars = await this.carModel.find({}, carProjection).exec();
    if (!cars || !cars[0]) {
      throw new HttpException('Not Found', 404);
    }
    return cars;
  }

  public async postCar(nawCar: CarDto): Promise<Car> {
    const car = new this.carModel(nawCar);
    return car.save();
  }

  public async getCarById(id: number): Promise<CarDto> {
    const car = await this.carModel.findOne({ id }, carProjection).exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }

  public async deleteCarById(id: number): Promise<void> {
    const car = await this.carModel.deleteOne({ id }).exec();
    console.log(car);
    if (car.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
  }

  public async putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<CarDto> {
    const car = await this.carModel
      .findOneAndUpdate({ id }, { [propertyName]: propertyValue })
      .exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }
}
