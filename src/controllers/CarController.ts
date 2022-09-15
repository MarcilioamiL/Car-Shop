import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

require('express-async-errors');

export default class CarController {
  private _service: IService<ICar>;

  constructor(service: IService<ICar>) {
    this._service = service;
  }

  public async create(req: Request, res: Response<ICar>) {
    const newCar = await this._service.create(req.body);
    console.log('toaqui', newCar);
    res.status(201).json(newCar);
  }
}