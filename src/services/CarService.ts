import { ErrorTypes } from '../utils/Erros';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  private _carModel: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._carModel = model;
  }

  public async create(data: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(data);

    if (!parsed.success) throw parsed.error;

    return this._carModel.create(data);
  }

  async read(): Promise<ICar[]> {
    return this._carModel.read();
  }

  async readOne(_id: string): Promise<ICar | null> {
    const oneCar = await this._carModel.readOne(_id);
    if (!oneCar) throw Error(ErrorTypes.EntityNotFound);
    return oneCar;
  }
}
