import { Router, Request, Response } from 'express';
import Car from '../models/carModel';
import CarService from '../services/CarService';
import CarController from '../controllers/CarController';

const route = Router();

const carModel = new Car();
const carService = new CarService(carModel);
const carController = new CarController(carService);

route.post('/cars', (req: Request, res: Response) => 
  carController.create(req, res));

export default route;