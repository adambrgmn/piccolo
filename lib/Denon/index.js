import stampit from 'stampit';
import Promise from 'bluebird';
import poller from 'promise-poller';

import createSocket from '../createSocket';
import findDevice from '../findDevice';
import { CommandError, ConnectionError } from '../errors';

const Denon = stampit()
  .props({
    address: undefined,
    port: undefined,
    connected: false,
    socket: undefined,
  })
  .init(function init({ address, port = 23 }) {
    this.address = address;
    this.port = port;
    this.socket = createSocket();
  })
  .methods({
    connect() {
      const connectToSocket = () => new Promise((resolve, reject) => {
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

      if (this.address) return poller({ taskFn: connectToSocket });

      return findDevice()
        .then((found) => {
          this.address = found[0].ip;

          return poller({
            taskFn: connectToSocket,
          });
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
          const command = cmd.toUpperCase();
          this.socket.write(`${command}\r`);

          const timeoutError = setTimeout(() => {
            const error = new CommandError(`Could not execute command: ${command}`);
            return reject(error);
          }, 200);

          this.socket.once('data', (data) => {
            clearTimeout(timeoutError);

            const recieved = data.trim();
            return resolve(recieved);
          });
          this.socket.once('error', reject);
        } else {
          resolve(false);
        }
      });
    },
  })
  .statics({
    findDevice,
  });

export default Denon;
