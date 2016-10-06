import test from 'blue-tape';
import findDevice from '../findDevice';

test('Function: findDevice([port = 23])()', (t) => new Promise((resolve, reject) => {
  findDevice(23)()
    .then((devices) => {
      const should = 'Should resolve an array of compatible devices';
      const actual = devices;
      const expected = [{ ip: '192.168.0.9', port: 23, status: 'open' }];

      t.deepEqual(actual, expected, should);
      return resolve();
    })
    .catch(reject);
}));
