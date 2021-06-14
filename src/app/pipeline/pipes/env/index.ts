import * as fs from 'fs';
import * as path from 'path';
import log from '../../../../core/log';

export default function Env(): void {
  log.info('[dot-env] looking for .env from ' + path.join(process.cwd(), '.env'));

  const data = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf8');
  if (data) {
    log.info('[dot-env] import environment variables');

    data.split('\n').forEach((value) => {
      const split = value.trim().split('=');
      process.env[split[0]] = split[1];
    });
  }
}
