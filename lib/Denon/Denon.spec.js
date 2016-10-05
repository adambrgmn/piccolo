import test from 'blue-tape';
import denon from '../denon';
import mockServer from '../../test/mock/server';
import { ConnectionError, CommandError } from '../errors';

const address = '192.168.0.9';
const system = denon(address);
const server = mockServer(port, address, testCommand);
const system = denon(address, port);


test('Factory: denon(address)', (t) => {
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
  .then(system.connect.bind(system))
  .then((connected) => {
    const should = 'Should resolve false if already connected';
    const actual = connected;
    const expected = false;

    return t.equal(actual, expected, should);
  })
  .then(() => {
    const newSystem = denon('192.168.0.1');
    const should = 'Should reject if not possible to connect to address';

    return t.shouldReject(newSystem.connect(), ConnectionError, should);
  }));


test('Method: system.command()', (t) => system.command('MV?')
  .then((data) => t.pass(`Should resolve the response (${data})`))
  .then(() => {
    const should = 'Should reject if not possible to execute command';
    return t.shouldReject(system.command('RANDOMCOMMAND'), CommandError, should);
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
