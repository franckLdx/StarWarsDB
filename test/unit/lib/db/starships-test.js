'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('Starships tests', () => {
  let sandbox;
  let starships;

  before(async () => {
    const db = await require('../../db').loadDB();
    starships = db.starships;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('reset tests', async function() {
    this.timeout(60000);
    await starships.reset();
    const count = await starships.count();
    assert.ok(count === 37);
  });

  it('findByName with unknown name', async function() {
    const found = await starships.findByName("azerty");
    assert.deepStrictEqual(found, []);
  });

  it('findByName with valid name', async function() {
    const found = await starships.findByName("falcon");
    assert.deepStrictEqual(found, [{name:"Millennium Falcon",model:"YT-1300 light freighter",manufacturer:"Corellian Engineering Corporation",cost_in_credits:"100000",length:"34.37",max_atmosphering_speed:"1050",crew:"4",passengers:"6",cargo_capacity:"100000",consumables:"2 months",hyperdrive_rating:"0.5",MGLT:"75",starship_class:"Light freighter",pilots:["13","14","25","31"],films:["2","7","3","1"],created:"2014-12-10T16:59:45.094000Z",edited:"2014-12-22T17:35:44.464156Z",_id:"10"}]);
  });

});