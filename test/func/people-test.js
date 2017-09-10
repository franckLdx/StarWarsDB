const { doRequest , checkOk } = require('./root-test');
const assert = require('assert');

describe.only('People query tests', () => {
  it('people list', async () => {
    const response = await doRequest('{people {name,birth_year,eye_color,gender,hair_color,height,mass,skin_color}}');
    checkOk(response);
    assert.deepStrictEqual(response.body.data.people.length, 87);
  });

 describe('People by title', () => {
    it('get a guy', async () => {
      const response = await doRequest('{peopleByName(name: "Luke Skywalker"){name}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.peopleByName.length, 1);
      assert.deepStrictEqual(response.body.data.peopleByName[0].name, "Luke Skywalker");
    });

    it('get a list ob people', async () => {
      const response = await doRequest('{peopleByName(name: "b"){name}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.peopleByName.length, 19);
    });

    it('search a wrong name', async () => {
      const response = await doRequest('{peopleByName(name: "ZZZZ"){name}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.peopleByName.length, 0);
    });
  });

});