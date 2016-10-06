import test from 'blue-tape';
import findDevice from '../findDevice';

test('Function: findDevice([port = 23])', (t) => findDevice()
  .then((devices) => {
    const should = 'Should resolve an array of compatible devices';
    const actual = devices;
    const expected = [{ ip: '192.168.0.9', port: 23, status: 'open' }];

    return t.deepEqual(actual, expected, should);
  })
  .catch(() => {
    const should = 'Should reject if no compatible devices were found';
    return t.pass(should);
  }));
