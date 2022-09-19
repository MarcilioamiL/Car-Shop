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
		sinon.stub(carModel, 'readOne').resolves(carMockWithId);
		sinon.stub(carModel, 'update').resolves(carMockWithId);
		sinon.stub(carModel, 'delete').resolves(carMockWithId);
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

	describe('test ReadOne', () => {
		it('Success', async () => {
			const carById = await carService.readOne(carMockWithId._id);

			expect(carById).to.be.an('object');
		});

		it('return undefined', async () => {
			try {
				await carService.readOne(invalid);
			} catch (error: any) {
				expect(error.message).to.be.equal(undefined);
			}
		});
	});

	describe('test Update', () => {
		it('return car object', async () => {
			const carUpdated = await carService.update(carMockWithId._id, carMock);
			expect(carUpdated).to.be.an('object');
		});

    	it('return error', async () => {
			try {
				await carService.update(carMockWithId._id, carMock);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(['error']);
			}
		});
	});

	describe('test delete', () => {
		it('return car object', async () => {
			const carUpdated = await carService.delete(carMockWithId._id);
			expect(carUpdated).to.be.an('object');
		});

		it('successfully key', async () => {
			const car = await carModel.delete(carMockWithId._id);
			expect(car).to.have.keys(carMockWithId);
		});

    	it('return undefined', async () => {
			try {
				await carService.delete(invalid);
			} catch (error: any) {
				expect(error.message).to.be.equal(undefined);
			}
		});
	});
});