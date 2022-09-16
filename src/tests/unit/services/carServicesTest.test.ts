import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
const { expect } = chai;
import CarModel from '../../../models/carModel';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId, invalid, carMockWithIdAndArry } from '../mocks/carMocks'
import { ErrorTypes } from '../../../utils/Erros';

describe('Car service test', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	beforeEach(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'read').resolves(carMockWithIdAndArry);
	});

	afterEach(() => {
		sinon.restore()
	});

	describe('Create Car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);
			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.create('object' as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('test read', () => {
		it('return array car', async() => {
			const arrayCar = await carService.read();
			expect(arrayCar).to.be.an('array');
		  });
	})
});