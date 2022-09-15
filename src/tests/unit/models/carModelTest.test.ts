import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/carModel';
import { carMock, carMockWithId, invalid } from '../mocks/carMocks'
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../utils/Erros';

describe('Car model', () => {
  const carModel = new CarModel();

  beforeEach(async () => {
		sinon.stub(Model, 'create').resolves(carMockWithId);

  });

  afterEach(()=>{
    sinon.restore();
  })

  describe('creating a Car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});
});
