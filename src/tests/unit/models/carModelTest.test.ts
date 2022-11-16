import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/carModel';
import { carMock, carMockWithId, invalid, carMockWithIdAndArry } from '../mocks/carMocks'
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../utils/Erros';

describe('Car model', () => {
  const carModel = new CarModel();

  beforeEach(async () => {
	sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(carMockWithIdAndArry);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findOneAndUpdate').resolves(carMockWithId);
    sinon.stub(Model, 'findOneAndDelete').resolves(carMockWithId);

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

  describe('Find a Car', () => {
    it('successfully found', async () => {
      const carFound = await carModel.read();
      return expect(carFound).to.be.an('array');
    });
	});

  describe('Car readOne', () => {
    it('successfully' , async () => {
      const carFind = await carModel.readOne(carMockWithId._id);
      expect(carFind).to.be.deep.equal(carMockWithId);
    });

		it('_id not found', async () => {
			try {
				await carModel.readOne(invalid);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('Car Update carModel', () => {
		it('successfully', async () => {
			const carUpdate = await carModel.update(carMockWithId._id, carMock);
			expect(carUpdate).to.be.an('object');
		});
	
		it('_id not found', async () => {
			try {
				await carModel.update(invalid, carMockWithId);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

  describe('car delete', () => {
		it('successfully', async () => {
			const carDelet = await carModel.delete(carMockWithId._id);
			expect(carDelet).to.be.deep.equal(carMockWithId);
		});
    it('return objet', async () => {
			const carObj = await carModel.delete(carMockWithId._id);
			expect(carObj).to.be.an('object');
		});
    it('successfully key', async () => {
			const car = await carModel.delete(carMockWithId._id);
			expect(car).to.have.keys(carMockWithId);
		});
		it('_id not found', async () => {
			try {
				await carModel.delete(carMockWithId._id);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
});
