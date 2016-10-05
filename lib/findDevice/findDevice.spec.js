import test from 'blue-tape';
import findDevice from '../findDevice';

test('Function: findDevice([port])()', (t) => new Promise((resolve, reject) => {
  setTimeout(() => {
    findDevice()
      .then((devices) => {
        const should = 'Should resolve an array of compatible devices';
        const actual = devices;
        const expected = [{ ip: '192.168.0.9', port: 23, status: 'open' }];

        t.deepEqual(actual, expected, should);
        return resolve();
      })
      .catch(reject);
  }, 100);
}));
