const  { task, taskGroup, runTask, run } = require('nss-run');

task('test', async () => {
  return run('mocha test/**/*-test.js');
});

task('test:cov', async () => {
  await runTask('test');
  return run('nyc report --reporter=html');
})
