const { doRequest , checkOk } = require('./root-test');
const assert = require('assert');

describe('Vehicles query tests', () => {
  it('Vehicles list', async () => {
    const response = await doRequest('{vehicles{name, model, vehicle_class, manufacturer, length, cost_in_credits, crew, passengers, max_atmosphering_speed, cargo_capacity, consumables}}');
    checkOk(response);
    assert.deepStrictEqual(response.body.data.vehicles.length, 39);
  });

  describe('Vehicles by name', () => {
    it('get a vehicle', async () => {
      const response = await doRequest('{vehiclesByName(name:"snowspeeder"){name}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.vehiclesByName.length, 1);
      assert.deepStrictEqual(response.body.data.vehiclesByName[0].name, 'Snowspeeder');
    });

    it('get vehicles', async () => {
      const response = await doRequest('{vehiclesByName(name:"fighter"){name}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.vehiclesByName.length, 3);
    });

    it('search a wrong title', async () => {
      const response = await doRequest('{vehiclesByName(name:"zzzzz"){name}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.vehiclesByName.length, 0);
    });
  });

});