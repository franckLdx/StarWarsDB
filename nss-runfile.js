const  { task, taskGroup, runTask, run } = require('nss-run');

async function doTest(dir='.') {
  await run(`mocha --recursive test/${dir}/**/*-test.js`, {canFail: true});
}

task('test', async () => {
  await doTest();
});

task('test:unit', async () => {
  await doTest('unit');
});

task('test:func', async () => {
  await doTest('func');
});

task('test:cov', async () => {
  await runTask('test');
  await run('nyc --reporter=text --reporter=html --timeout=30000 npm test');
})
