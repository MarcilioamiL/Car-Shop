import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import { ZodError } from 'zod';
const { expect } = chai;
import CarModel from '../../../models/carModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { carMock, carMockWithId, invalid, carMockWithIdAndArry } from '../mocks/carMocks';
import { ErrorTypes } from '../../../utils/Erros';

describe('Car Controller test', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    sinon.stub(carService, 'create').resolves(carMock);
    sinon.stub(carService, 'read').resolves(carMockWithIdAndArry);
    sinon.stub(carService, 'readOne').resolves(carMockWithId);
    
		sinon.stub(carService, 'update').resolves(carMockWithId);
		sinon.stub(carService, 'delete').resolves();

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

  describe('Read car success', () => {
    it('Success', async () => {
      req.body = carMockWithIdAndArry;
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carMockWithIdAndArry)).to.be.equal(true);
    });
  });

  describe('test ReadOne', () => {
		it('Success', async () => {
      req.params = { id: carMockWithId._id };
			await carController.readOne(req, res);

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
		});

		it('return status 400', async () => {
      req.params = { id: '1' };
			await carController.readOne(req, res);

			expect((res.status as sinon.SinonStub).calledWith(400)).to.have.ownPropertyDescriptor;
		});
	});

  describe('test Update', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      req.body = carMockWithId;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('test Delete', () => {
    it('Return status 500', async () => {
      req.params = { id: carMockWithId._id };
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(500)).to.have.ownPropertyDescriptor;
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