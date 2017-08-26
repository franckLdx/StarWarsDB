'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('Vehicles tests', () => {
  let sandbox;
  let vehicles;

  before(async () => {
    const db = await require('../../db').loadDB();
    vehicles = db.vehicles;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('reset tests', async function() {
    this.timeout(60000);
    await vehicles.reset();
    const count = await vehicles.count();
    assert.ok(count === 39);
  });

  it('findByName with unknown name', async function() {
    const found = await vehicles.findByName("azerty");
    assert.deepStrictEqual(found, []);
  });

  it('findByName with valid name', async function() {
    const found = await vehicles.findByName("snowspeeder");
    assert.deepStrictEqual(found, [{name:"Snowspeeder",model:"t-47 airspeeder",manufacturer:"Incom corporation",cost_in_credits:"unknown",length:"4.5",max_atmosphering_speed:"650",crew:"2",passengers:"0",cargo_capacity:"10",consumables:"none",vehicle_class:"airspeeder",pilots:["1","18"],"films":["2"],created:"2014-12-15T12:22:12Z",edited:"2014-12-22T18:21:15.623033Z",_id:"14"}]);
  });

});