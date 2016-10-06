import { Socket } from 'net';

export default function createSocket() {
  const socket = new Socket({ allowHalfOpen: true });
  socket.setTimeout(250);
  socket.setEncoding('utf8');

  return socket;
}
