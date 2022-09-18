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

  public async read(_req: Request, res: Response<ICar[]>) {
    const getCars = await this._service.read();
    res.status(200).json(getCars);
  }

  async readOne(req: Request, res: Response<ICar>) {
    const oneCarResult = await this._service.readOne(req.params.id);
    return res.status(200).json(oneCarResult as ICar);
  }

  async update(req: Request, res: Response<ICar>) {
    const carUpdate = await this._service.update(req.params.id, req.body);
    res.status(200).json(carUpdate as ICar);
  }

  async delete(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    await this._service.delete(id);
    res.status(204).json();
  }
}