
module.exports.getSortQuery = (sort) => {
  let sortQuery;
  if (sort) {
    sortQuery = {};
    sortQuery[sort] = 1;
  }
  return sortQuery;
}