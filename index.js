import Evilscan from 'evilscan';
import Promise from 'bluebird';
import denon from './lib/denon';

const scan = () => new Promise((resolve, reject) => {
  const evilscanOpts = {
    target: '192.168.0.9',
    status: 'TROU',
    port: 23,
    reverse: true,
  };

  const scanner = new Evilscan(evilscanOpts);

  scanner.on('result', console.log);
  scanner.on('error', reject);
  scanner.on('done', () => resolve());
  scanner.run();
});

const system = denon('192.168.0.9');
system.connect()
  .then(() => {
    console.log('Connected, scanning');
    return scan();
  })
  .then(() => {
    console.log('Scanned, closing');
    return system.disconnect();
  })
  .then(() => {
    console.log('Closed, scanning');
    setTimeout(() => {
      scan().then(Promise.resolve);
    }, 100);
  })
  .then(() => console.log('All done!'))
  .catch(console.error);
