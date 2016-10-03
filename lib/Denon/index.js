import { Socket } from 'net';

class Denon {
  constructor(address) {
    this.address = address;
    this.connected = false;
    this.socket = new Socket();

    this.socket.setTimeout(250);
    this.socket.setEncoding('utf8');
  }

  connect() {
    return new Promise((resolve, reject) => {
      const connection = () => {
        this.connected = true;
        return resolve();
      };

      const noConnection = () => reject();

      if (this.connected) {
        this.socket.connect(23, this.address, connection);
        this.socket.once('error', noConnection);
      } else {
        resolve();
      }
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      const closed = () => {
        this.connected = false;
        return resolve();
      };

      const notClosed = () => reject();
      if (this.connected) {
        this.socket.end();
        this.socket.once('close', closed);
        this.socket.once('error', notClosed);
      } else {
        resolve(); // Resolve even if no disconnection was made
      }
    });
  }
}

export default Denon;
