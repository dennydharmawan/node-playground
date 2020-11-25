const { default: PQueue } = require('p-queue');
const delay = require('delay');

const delayedConsole = async (time) => {
  await delay(time);

  console.log('done');
};

// concurrency: how many task can run together at a time

// throttling mechanism
// interval: how long to delay the next available job
// intervalCap: how many

(async () => {
  const queue = new PQueue({ concurrency: 2 });

  let count = 0;

  queue.on('active', () => {
    console.log(
      `Working on item #${++count}.  Size: ${queue.size}  Pending: ${
        queue.pending
      }`
    );
  });

  queue.on('idle', (input) => {
    console.log('idle');
  });

  queue.on('empty', () => {
    console.log('empty');
  });

  const delays = [1000, 2000];

  await queue.addAll(
    delays.map((delay) => {
      return () => delayedConsole(delay);
    })
  );

  console.log('finished');

  await queue.addAll(
    delays.map((delay) => {
      return () => delayedConsole(delay);
    })
  );
})();
