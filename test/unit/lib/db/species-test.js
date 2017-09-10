'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('Species tests', () => {
  let sandbox;
  let species;

  before(async () => {
    const db = await require('../../db').loadDB();
    species = db.species;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('reset tests', async function() {
    this.timeout(60000);
    await species.reset();
    const count = await species.count();
    assert.deepStrictEqual(count, 37);
  });

  it('findByName with unknown name', async function() {
    const found = await species.findByName("azerty");
    assert.deepStrictEqual(found, []);
  });

  it('findByName with valid name', async function() {
    const found = await species.findByName("Sullustan");
    assert.deepStrictEqual(found, [{name:"Sullustan",classification:"mammal",designation:"sentient",average_height:"180",skin_colors:"pale",hair_colors:"none",eye_colors:"black",average_lifespan:"unknown",homeworld:"33",language:"Sullutese",people:["31"],films:["3"],created:"2014-12-18T11:26:20.103000Z",edited:"2014-12-20T21:36:42.157000Z",_id:"10"}]);
  });

  it('findByClassification with unknown classification', async function() {
    const found = await species.findByClassification("azerty");
    assert.deepStrictEqual(found, []);
  });

  it('findByClassification with valid classification', async function() {
    const found = await species.findByClassification("reptile");
    assert.deepStrictEqual(found,  [
      {name:"Aleena",classification:"reptile",designation:"sentient",average_height:"80",skin_colors:"blue, gray",hair_colors:"none",eye_colors:"unknown",average_lifespan:"79",homeworld:"38",language:"Aleena",people:["47"],films:["4"],created:"2014-12-20T09:53:16.481000Z",edited:"2014-12-20T21:36:42.171000Z",_id:"16"},
      {name:"Kaleesh",classification:"reptile",designation:"sentient",average_height:"170",skin_colors:"brown, orange, tan",hair_colors:"none",eye_colors:"yellow",average_lifespan:"80",homeworld:"59",language:"Kaleesh",people:["79"],films:["6"],created:"2014-12-20T19:45:42.537000Z",edited:"2014-12-20T21:36:42.210000Z",_id:"36"},
      {name:"Trandoshan",classification:"reptile",designation:"sentient",average_height:"200",skin_colors:"brown, green",hair_colors:"none",eye_colors:"yellow, orange",average_lifespan:"unknown",homeworld:"29",language:"Dosh",people:["24"],"films":["2"],created:"2014-12-15T13:07:47.704000Z",edited:"2014-12-20T21:36:42.151000Z",_id:"7"}
    ]);
  });

  it('findByDesignation with unknown designation', async function() {
    const found = await species.findByDesignation("azerty");
    assert.deepStrictEqual(found, []);
  });

  it('findByDesignation with valid designation', async function() {
    const found = await species.findByDesignation("reptilian");
    assert.deepStrictEqual(found,  [
      {name:"Rodian",classification:"sentient",designation:"reptilian",average_height:"170",skin_colors:"green, blue",hair_colors:"n/a",eye_colors:"black",average_lifespan:"unknown",homeworld:"23",language:"Galactic Basic",people:["15"],films:["1"],created:"2014-12-10T17:05:26.471000Z",edited:"2016-07-19T13:27:03.156498Z",_id:"4"}
    ]);
  });

});