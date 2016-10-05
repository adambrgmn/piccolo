import { Socket } from 'net';
import Promise from 'bluebird';

import { CommandError, ConnectionError } from '../errors';

const createSocket = () => {
  const socket = new Socket({ allowHalfOpen: true });
  socket.setTimeout(250);
  socket.setEncoding('utf8');

  return socket;
};

const denon = (address, port = 23) => {
  function connect() {
    return new Promise((resolve, reject) => {
      const connectionSuccsessful = () => {
        this.connected = true;
        return resolve(true);
      };

      if (!this.connected) {
        this.socket.connect(this.port, this.address);

        const timeoutError = setTimeout(() => {
          const message = `Could not establish contact with address ${this.address}`;
          const error = new ConnectionError(message);

          this.socket.destroy();

          return reject(error);
        }, 200);

        this.socket.once('connect', () => {
          clearTimeout(timeoutError);
          return connectionSuccsessful();
        });

        this.socket.once('error', (error) => reject(new ConnectionError(error)));
      } else {
        resolve(false);
      }
    });
  }

  function disconnect() {
    return new Promise((resolve, reject) => {
      const closeSuccessful = () => {
        this.connected = false;
        return resolve(true);
      };

      if (this.connected) {
        this.socket.end();
        this.socket.once('close', closeSuccessful);
        this.socket.once('error', reject);
      } else {
        resolve(false);
      }
    });
  }

  function command(cmd) {
    return new Promise((resolve, reject) => {
      if (this.connected) {
        this.socket.write(`${cmd.toUpperCase()}\r`);

        const timeoutError = setTimeout(() => {
          const error = new CommandError(`Could not execute command: ${cmd}`);
          return reject(error);
        }, 200);

        this.socket.once('data', (data) => {
          clearTimeout(timeoutError);
          return resolve(data.trim());
        });
        this.socket.once('error', reject);
      } else {
        resolve(false);
      }
    });
  }

  const system = {
    address,
    port,
    connected: false,
    socket: createSocket(),
    connect,
    disconnect,
    command,
  };

  return Object.create(system);
};

export default denon;
