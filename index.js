require('es6-promise').polyfill();
require('isomorphic-fetch');
const { Socket } = require('net');
const xml = require('xml');
const { parseString } = require('xml2js');

const sock = new Socket();
sock.setTimeout(250);
sock.setEncoding('utf8');

sock.connect(23, '192.168.0.9');
sock.on('connect', () => {
  const body = xml({
    tx: [
      {
        cmd: [{ _attr: { id: 1 } }, 'GetPowerStatus'],
      },
    ],
  }, { declaration: true, indent: '  ' });

  fetch('http://192.168.0.9/goform/AppCommand.xml', {
    method: 'POST',
    headers: {
      Host: '192.168.0.9',
      'Content-Type': 'text/xml; charset="utf-8"',
      Connection: 'keep-alive',
      'Proxy-Connection': 'keep-alive',
      Accept: '*/*',
      'User-Agent': 'De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0',
      'Accept-Language': 'sv-se',
      'Accept-Encoding': 'gzip, deflate',
    },
    body,
  })
    .then((res) => res.text())
    .then((data) => new Promise((resolve, reject) => {
      parseString(data, (err, res) => {
        if (err) return reject(err);
        return resolve(res.rx.cmd[0].power[0]);
      });
    }))
    .then((mode) => {
      if (mode === 'STANDBY') {
        sock.write('PWON\r');
      } else {
        sock.write('PWSTANDBY\r');
      }
    })
    .catch(console.error);
});
