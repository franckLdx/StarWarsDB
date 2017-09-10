const { doRequest , checkOk } = require('./root-test');
const assert = require('assert');

describe.only('Films query tests', () => {
  it('Films list', async () => {
    const response = await doRequest('{films{title, episode_id, opening_crawl, director, release_date}}');
    checkOk(response);
    assert.deepStrictEqual(response.body.data.films.length, 7);
  });

  describe('Films by title', () => {
    it('get a film', async () => {
      const response = await doRequest('{filmsByTitle(title:"jedi"){episode_id}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.filmsByTitle.length, 1);
      assert.deepStrictEqual(response.body.data.filmsByTitle[0].episode_id, 6);
    });

    it('get films', async () => {
      const response = await doRequest('{filmsByTitle(title:"e"){episode_id}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.filmsByTitle.length, 7);
    });

    it('search a wrong title', async () => {
      const response = await doRequest('{filmsByTitle(title:"the empire is the winner"){episode_id}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.filmsByTitle.length, 0);
    });
  });

  describe('filmByEpisodeId', () => {
    it('get a film', async () => {
      const response = await doRequest('{filmByEpisodeId(id:4) {title}}');
      checkOk(response);
      assert.deepStrictEqual(response.body.data.filmByEpisodeId.title, "A New Hope");
    });

    it('search a wrong episode id', async () => {
      const response = await doRequest('{filmByEpisodeId(id:99) {title}}');
      assert.deepStrictEqual(response.body.data.filmByEpisodeId, null);
    });
  });

});