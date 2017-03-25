const DB = require('./index').StarWarsDB;

async function main() {
  const db = new DB();

  const films = db.getFilms();
  films.reset()
  .then(async () => console.log('YES', await films.count()));

  /*const people = db.getPeople();
  people.reset()
  .then(async () => console.log('YES', await people.count()));*/
}

main();
