const  { task, taskGroup, runTask, run } = require('nss-run');

task('test', () => {
  return run('mocha ./test/**Test.js');
});

task('test:cov', () => {
  return run('nyc npm t report --reporter=html --reporter=text');
})
