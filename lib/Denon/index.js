import { Socket } from 'net';

const denon = (address) => {
  const system = {
    address,
    connected: false,
    socket: new Socket(),
  };

  system.socket.setTimeout(250);
  system.socket.setEncoding('utf8');

  system.connect = () => new Promise((resolve, reject) => {
    const connectionUnsuccessful = (e) => reject(e);
    const connectionSuccsessful = () => {
      system.connected = true;
      return resolve();
    };

    if (!system.connected) {
      system.socket.connect(23, system.address, connectionSuccsessful);
      system.socket.once('error', connectionUnsuccessful);
    } else {
      resolve();
    }
  });

  system.disconnect = () => new Promise((resolve, reject) => {
    const closeUnsuccessful = (e) => reject(e);
    const closeSuccessful = () => {
      system.connected = false;
      return resolve();
    };

    if (system.connected) {
      system.socket.end();
      system.socket.once('close', closeSuccessful);
      system.socket.once('error', closeUnsuccessful);
    } else {
      resolve();
    }
  });

  return Object.create(system);
};

export default denon;
