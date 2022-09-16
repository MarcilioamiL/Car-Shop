import { Router } from 'express';
import Car from '../models/carModel';
import CarService from '../services/CarService';
import CarController from '../controllers/CarController';

const route = Router();

const carModel = new Car();
const carService = new CarService(carModel);
const carController = new CarController(carService);

route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars', async (req, res) => carController.read(req, res));
route.get('/cars/:id', async (req, res) => carController.readOne(req, res));
route.put('/cars/:id', async (req, res) => carController.update(req, res));

export default route;