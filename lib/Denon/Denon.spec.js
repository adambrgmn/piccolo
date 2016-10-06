import test from 'blue-tape';
import Denon from '../Denon';
import mockServer from '../../test/mock/server';

const address = '127.0.0.1';
const port = 3000;
const testCommand = 'MV?';

const server = mockServer(port, address, testCommand);
const system = Denon({ address, port });


test('Factory: denon({ address[, port = 23] })', (t) => {
  const should = 'Should create an empty object linked to denon';
  let actual = {}.hasOwnProperty.call(system, 'connect');
  let expected = false;

  t.equal(actual, expected, should);

  const systemPrototype = Object.getPrototypeOf(system);
  actual = {}.hasOwnProperty.call(systemPrototype, 'connect');
  expected = true;

  t.equal(actual, expected, should);
  t.end();
});


test('Method: system.connect()', (t) => system.connect()
  .then(() => {
    const should = 'Should connect to socket';
    const actual = system.connected;
    const expected = true;

    return t.equal(actual, expected, should);
  })
  .then(() => system.connect())
  .then((connected) => {
    const should = 'Should resolve false if already connected';
    const actual = connected;
    const expected = false;

    return t.equal(actual, expected, should);
  })
  .then(() => {
    const should = 'Should reject if not possible to connect to address';
    const newSystem = Denon({ address: '192.168.0.2' });

    return t.shouldReject(newSystem.connect(), should);
  })
  .then(() => {
    const newSystem = Denon();

    return newSystem.connect()
      .tap(() => {
        const should = 'Should try to find compatible device if no address is provided';
        return t.pass(should);
      })
      .then((connected) => {
        const should = 'Should connect to compatible device if no address is provided';
        const actual = connected;
        const expected = true;

        t.equal(actual, expected, should);
        return newSystem.disconnect();
      })
      .catch(() => {
        const should = 'Should reject if no compatible device was found';
        return t.pass(should);
      });
  }));


test('Method: system.command(cmd)', (t) => system.command(testCommand)
  .then((data) => t.pass(`Should resolve the response (${data})`))
  .then(() => {
    const should = 'Should reject if not possible to execute command';
    return t.shouldReject(system.command('RANDOMCOMMAND'), should);
  }));


test('Method: system.disconnect()', (t) => system.disconnect()
  .then(() => {
    const should = 'Should disconnect from socket';
    const actual = system.connected;
    const expected = false;

    return t.equal(actual, expected, should);
  })
  .then(system.disconnect.bind(system))
  .then((disconnected) => {
    const should = 'Should resolve false if already disconnected';
    const actual = disconnected;
    const expected = false;

    return t.equal(actual, expected, should);
  })
  .then(() => server.stop()));
