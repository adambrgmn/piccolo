import stampit from 'stampit';
import Promise from 'bluebird';

import createSocket from '../createSocket';
import { CommandError, ConnectionError } from '../errors';

const Denon = stampit()
  .props({
    address: undefined,
    port: undefined,
    connected: false,
    socket: undefined,
  })
  .init(function init({ address, port }) {
    if (!address) throw new Error('Denon: address must be provided');

    this.address = address;
    this.port = port || 23;
    this.socket = createSocket();
  })
  .methods({
    connect() {
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
    },

    disconnect() {
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
    },

    command(cmd) {
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
    },
  })
  });

export default Denon;
