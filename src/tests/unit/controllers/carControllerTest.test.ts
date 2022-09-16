import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import { ZodError } from 'zod';
const { expect } = chai;
import CarModel from '../../../models/carModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { carMock, carMockWithId, invalid } from '../mocks/carMocks';
import { ErrorTypes } from '../../../utils/Erros';

describe('Car Controller test', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    sinon.stub(carService, 'create').resolves(carMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore()
  })

  describe('Create car success', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });
});

  // describe('fail scenario with no body', () => { 
  //   it('return a 500 httpstatus', async() => {
  //     req.body = carMock;
  //     await carController.create(req, res);
  //     expect((res.status as sinon.SinonStub)
  //       .calledWith(500)).to.be.equal(false);
  //   });

  //   it('return a error', async() => {
  //     req.body = carMock;
  //     await carController.create(req, res);
  //     expect((res.json as sinon.SinonStub)
  //       .calledWith({ error: 'Bad request' })).to.be.equal(false);
  //   });
  // });