import test from 'blue-tape';
import denon from '../denon';

const address = '192.168.0.9';

test('Factory: denon', (t) => {
  const system = denon(address);

  const should = 'Should create a new object linked to denon';
  const actual = typeof system.connect;
  const expected = 'function';

  t.equal(actual, expected, should);
  t.end();
});

test('Method: denon.connect()', (t) => {
  const system = denon(address);
  const connect = system.connect();

  const should = 'Should return a promise';
  const actual = connect instanceof Promise;
  const expected = true;

  t.equal(actual, expected, should);

  return connect
    .then(() => t.pass('Should resolve if connected to socket'))
    .then(system.disconnect);
});

test('Method: denon.disconnect()', (t) => {
  const system = denon(address);

  return system.connect()
    .then(system.disconnect)
    .then(() => t.pass('Should disconnect from current socket'));
});
