import * as net from 'net';
import { errorPromise } from '@core/error';

// Allows to check if a port is available
export async function isAvailablePort(port: number): Promise<boolean> {
  let is: boolean = false;
  await checkPort(port)
    .then((b) => (is = b))
    .catch(errorPromise.fatal);
  return is;
}

const checkPort = (port: number) =>
  new Promise<boolean>((resolve, reject) => {
    const tester: net.Server = net
      .createServer()
      // @ts-ignore
      .once('error', (err) => (err.code == 'EADDRINUSE' ? resolve(false) : reject(err)))
      .once('listening', () => tester.once('close', () => resolve(true)).close())
      .listen(port);
  });
