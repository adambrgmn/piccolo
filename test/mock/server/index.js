import { createServer } from 'net';

export default function mockServer(port = 3000, address = '127.0.0.1', command) {
  const server = createServer((socket) => {
    socket.on('data', (data) => {
      const recieved = data.toString().trim();

      if (recieved.toUpperCase() === command.toUpperCase()) {
        socket.write(command);
      }
    });
  });

  server.listen(port, address);

  const proto = {
    stop: () => server.close(),
  };

  return Object.create(proto);
}
