import test from 'blue-tape';
import { Socket } from 'net';
import createSocket from '../createSocket';

test('Function: createSocket()', (t) => {
  const should = 'Should return a Socket-instance';
  const actual = createSocket() instanceof Socket;
  const expected = true;

  t.equal(actual, expected, should);
  t.end();
});
