import { createServer } from 'net';

export default function mockServer(port = 3000, address = 'localhost', command) {
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
    server,
    stop() { this.server.close(); },
  };

  return Object.create(proto);
}
