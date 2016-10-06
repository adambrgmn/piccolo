import spawn from 'cross-spawn';
import Promise from 'bluebird';
import Evilscan from 'evilscan';
import { composeP } from 'ramda';

export const getConnectedDevices = () => new Promise((resolve, reject) => {
  const proc = spawn('arp', ['-na']);

  proc.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    return resolve(lines);
  });
  proc.stderr.on('data', reject);
});

export const filterConnectedDevices = (data) => {
  const devices = data.reduce((prev, curr) => {
    const regexp = /\(((\d+\.?){4})\) at (([\d+|\w+]+:?){6})/g;
    const result = regexp.exec(curr);

    if (!result) return prev;

    const ip = result[1];
    const mac = result[3];

    return prev.concat({ ip, mac });
  }, []);

  if (devices.length > 0) return Promise.resolve(devices);
  return Promise.reject(new Error('Couldn\'t find any connected devices'));
};

export const findDeviceWithOpenPort = (port = 23) => (connectedDevices) => (
  new Promise((resolve, reject) => {
    const connectedDevicesLength = connectedDevices.length;
    const startIp = connectedDevices[0].ip;
    const endIp = connectedDevices[connectedDevicesLength - 1].ip;

    const evilscanOpts = {
      target: `${startIp}-${endIp}`,
      status: 'O',
      port,
    };

    const scanner = new Evilscan(evilscanOpts);

    let result = [];

    scanner.on('result', (res) => {
      if (res.status === 'open') result = result.concat(res);
    });
    scanner.on('error', reject);
    scanner.on('done', () => {
      if (result.length > 0) return resolve(result);
      return reject(new Error('Couldn\'t find any compatible devices'));
    });
    scanner.run();
  }
));

export default (port) => composeP(
  findDeviceWithOpenPort(port),
  filterConnectedDevices,
  getConnectedDevices
)();
