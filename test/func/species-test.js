const { doRequest , checkOk } = require('./root-test');
const assert = require('assert');

describe('Species query tests', () => {
  it('Species list', async () => {
    const response = await doRequest('{species{name,classification,designation,average_height,average_lifespan,language}}');
    checkOk(response);
    assert.deepStrictEqual(response.body.data.species.length, 37);
  });

  describe('Species by name', () => {
    it('get a specie', async () => {
      const response = await doRequest('{speciesByName(name:"human"){name}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.speciesByName.length, 1);
      assert.deepStrictEqual(response.body.data.speciesByName[0].name, "Human");
    });

    it('get Species', async () => {
      const response = await doRequest('{speciesByName(name:"hu"){name}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.speciesByName.length, 2);
    });

    it('search a wrong name', async () => {
      const response = await doRequest('{speciesByName(name:"dragon"){name}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.speciesByName.length, 0);
    });
  });

  describe('Species by classification', () => {
    const designations = new Map();
    designations.set('AMPHIBIAN', 6);
		designations.set('ARTIFICIAL', 1);
		designations.set('GASTROPOD', 1);
		designations.set('INSECTOID', 1);
		designations.set('MAMMAL', 17);
		designations.set('REPTILE', 3);
		designations.set('REPTILIAN', 1);
		designations.set('SENTIENT', 1);
    designations.set('UNKNOWN', 6);

    designations.forEach((count, classification) => {
      it(`get ${classification} species`, async () => {
        const response = await doRequest(`{speciesByClassification(classification:${classification}){name}}`);
        checkOk(response);
        assert.deepStrictEqual(response.body.data.speciesByClassification.length, count);
      });
    });
  });
});