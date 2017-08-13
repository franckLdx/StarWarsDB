const  { task, taskGroup, runTask, run } = require('nss-run');

task('test', async () => {
  await run('mocha --recursive test/**/*-test.js', {canFail: true});
});

task('test:cov', async () => {
  await runTask('test');
  await run('nyc --reporter=text --reporter=html npm test');
})
