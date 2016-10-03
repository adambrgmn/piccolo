import test from 'tape';
import Denon from '../Denon';

const address = '192.168.0.9';

test('Constructor: Denon()', (t) => {
  const system = new Denon();
  const should = 'Should create a new object linked Denon';
  const actual = system instanceof Denon;
  const expected = true;

  t.equal(actual, expected, should);
  t.end();
});

test('Method: Denon().connect', (t) => {
  const system = new Denon(address);
  const connect = system.connect();

  const should = 'Should return a promise';
  const actual = connect instanceof Promise;
  const expected = true;

  t.equal(actual, expected, should);

  connect.then(() => {
    t.pass('Should resolve if connected');
    system.disconnect().then(t.end).catch(t.end);
  });
});

test('Method: Denon().disconnect', (t) => {
  const system = new Denon(address);

  return system.connect()
    .then(system.disconnect.bind(system))
    .then(() => t.pass('Should disconnect from current socket'))
    .then(t.end)
    .catch(t.end);
});
