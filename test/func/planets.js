const { doRequest , checkOk } = require('./root-test');
const assert = require('assert');

describe.only('Planets query tests', () => {
  it('planets list', async () => {
    const response = await doRequest('{planets {name,diameter,rotation_period,orbital_period,gravity,population,surface_water}}');
    checkOk(response);
    assert.deepStrictEqual(response.body.data.planets.length, 87);
  });

 describe('Planets by title', () => {
    it('get a planet', async () => {
      const response = await doRequest('{planetsByName(name: "tatooine"){name}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.planetsByName.length, 1);
      assert.deepStrictEqual(response.body.data.planetsByName[0].name, "Tatooine");
    });

    it('get a list of planets', async () => {
      const response = await doRequest('{planetsByName(name: "too"){name}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.planetsByName.length, 2);
    });

    it('search a wrong name', async () => {
      const response = await doRequest('{planetsByName(name: "ZZZZ"){name}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.planetsByName.length, 0);
    });
  });

});