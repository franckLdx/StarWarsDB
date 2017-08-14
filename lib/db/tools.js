'use strict';

const URL_RE = new RegExp("http://swapi.co/api/.*/(.+)/");

const url2id = exports.url2id = (url) => {
  if (!url) {
    return;
  }
  if (typeof url === "string") {
    return url.replace(URL_RE, '$1');
  } else {
    return url.map(anUrl => anUrl.replace(URL_RE, '$1'));
  }
}

exports.fields2ids = (object, fields) => {
  fields.forEach(field => object[field] = url2id(object[field]));
}
